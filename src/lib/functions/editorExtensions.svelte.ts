import { EditorView, keymap, drawSelection } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { search } from '@codemirror/search';
import { keyLogger } from './keylogger';
// import { handleEditorChange } from '$lib/functions/historyFunctions.svelte';
import { javascript } from '@codemirror/lang-javascript';
import { ViewPlugin, ViewUpdate } from '@codemirror/view';
import type { TcmdLog } from '$lib/functions/historyFunctions.svelte';

const logSelectionPlugin = ViewPlugin.fromClass(
    class {
        update(update: ViewUpdate) {
            if (update.selectionSet) {
                // console.log('New doc:', update.state.doc);
                // console.log('New sel:', update.state.selection);
            }
        }
    }
);


export function createEditorExtensions(editorView: EditorView, cmdLog: TcmdLog) {
	return [
		basicSetup,
		// EditorView.updateListener.of((vu: ViewUpdate) => {
		// 	if (vu.docChanged || vu.selectionSet) {
		// 		handleEditorChange(editorView, cmdLog, vu);
		// 	}
		// }),
		javascript(),
		keyLogger,
		drawSelection(),
		search({
			// caseSensitive: isCaseSensitive,
			// wholeWord: isWholeWord
			caseSensitive: false,
			wholeWord: false
		}),
		EditorState.allowMultipleSelections.of(true),
		logSelectionPlugin
	];
}
