import type { StateCommand } from '@codemirror/state';
import { EditorState, EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { SearchCursor } from '@codemirror/search';
import { RegExpCursor } from '@codemirror/search';

// Select the words around the cursors.
const selectWord: StateCommand = ({ state, dispatch }) => {
	let { selection } = state;
	let newSel = EditorSelection.create(
		selection.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)),
		selection.mainIndex
	);
	if (newSel.eq(selection)) return false;
	dispatch(state.update({ selection: newSel }));
	return true;
};

// Find next occurrence of query relative to last cursor. Wrap around
// the document if there are no more matches.
function myFindNextOccurrence(
	state: EditorState,
	query: string,
	{ caseSensitive = false, wholeWord = false }
) {
	// Escape regex special characters
	let pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	// set case-sensitivity flag
	let flags = caseSensitive ? 'g' : 'gi';

	// Add word boundaries if wholeWord is true
	if (wholeWord) pattern = `\\b${pattern}\\b`;

	// const regex = new RegExp(pattern, flags);
	// const doc = state.doc.toString();
	// regex.lastIndex = state.selection.main.to;
	// const match = regex.exec(doc);
	// if (match) {
	// 	const newSel = {
	// 		anchor: match.index,
	// 		head: match.index + match[0].length
	// 	};
	// }

	let { main, ranges } = state.selection;
	let word = state.wordAt(main.head),
		fullWord = word && word.from == main.from && word.to == main.to;
	for (
		// let cycled = false, cursor = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to);
		// ;
		let cycled = false, cursor = new RegExpCursor(state.doc, query, {ignoreCase: !caseSensitive}, ranges[ranges.length - 1].to);
		;

	) {
		cursor.next();
		if (cursor.done) {
			if (cycled) return null;
			// cursor = new SearchCursor(
			// 	state.doc,
			// 	query,
			// 	0,
			// 	Math.max(0, ranges[ranges.length - 1].from - 1)
			// );
			cursor = new RegExpCursor(
				state.doc,
				query,
                {ignoreCase: true},
				0,
				Math.max(0, ranges[ranges.length - 1].from - 1)
			);
			cycled = true;
		} else {
			if (cycled && ranges.some((r) => r.from == cursor.value.from)) continue;
			if (fullWord) {
				let word = state.wordAt(cursor.value.from);
				if (!word || word.from != cursor.value.from || word.to != cursor.value.to) continue;
			}
			return cursor.value;
		}
	}
}

/// Select next occurrence of the current selection. Expand selection
/// to the surrounding word when the selection is empty.
export function mySelectNextOccurrence({
	caseSensitive = false,
	wholeWord = false
} = {}): StateCommand {
	return ({ state, dispatch }) => {
		let { ranges } = state.selection;
		if (ranges.some((sel) => sel.from === sel.to)) return selectWord({ state, dispatch });

		let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
		if (state.selection.ranges.some((r) => state.sliceDoc(r.from, r.to) != searchedText))
			return false;

		let range = myFindNextOccurrence(state, searchedText, {
			caseSensitive: caseSensitive,
			wholeWord: wholeWord
		});
		if (!range) return false;

		dispatch(
			state.update({
				selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
				effects: EditorView.scrollIntoView(range.to)
			})
		);
		return true;
	};
}
