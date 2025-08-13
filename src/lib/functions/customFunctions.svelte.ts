import { customCommands, type TypeCustomCommands } from '$lib/constants';

import {
	goHistory,
	pushToHistory,
	updateLastInHistory,
	type ThistorySettings,
	type TcmdLog
} from '$lib/functions/historyFunctions.svelte';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { keymapChoice, myBindings } from '$lib/settings/keymaps.svelte';

// Logging
type TlogTypes =
	| 'init'
	| 'insert'
	| 'delete-backward'
	| 'delete-forward'
	| 'delete-selection'
	| 'combo';
export function logToHistory(
	type: TlogTypes,
	state: EditorState,
	cmdLog: TcmdLog,
	cmd: string, //TypeCustomCommands,
	nDel: number = 0,
) {
	const lastEntry = cmdLog.list[cmdLog.list.length - 1];
	let cmdType;
	let makeUpdate;
	let combo;
	let description;
	switch (type) {
		case 'init':
			cmdType = 'init';
			makeUpdate = false;
			combo = '';
			description = {
				combo: '>>',
				short: '>>',
				long: '>>'
			};
			break;
		case 'insert':
			cmdType = 'insert';
			makeUpdate = lastEntry?.type === 'insert';
			combo = cmd;
			if (cmd === ' ') cmd = '&nbsp;';
			description = {
				combo: makeUpdate ? lastEntry.description.combo.slice(0, -1) + cmd + '"' : `"${cmd}"`,
				short: makeUpdate ? lastEntry.description.short.slice(0, -1) + cmd + '"' : `insert "${cmd}"`,
				long: makeUpdate ? lastEntry.description.long.slice(0, -1) + cmd + '"' : `insert "${cmd}"`
			};
			break;
		case 'delete-backward':
			cmdType = 'delete-backward';
			makeUpdate = lastEntry?.type === 'delete-backward';
			combo = cmd;
			description = {
				combo: cmd,
				short: `del back (${nDel})`,
				long: `delete backward ${nDel} chars`
			};
			break;
		case 'delete-forward':
			cmdType = 'delete-forward';
			makeUpdate = lastEntry?.type === 'delete-forward';
			combo = cmd;
			description = {
				combo: cmd,
				short: `del forward (${nDel})`,
				long: `delete forward ${nDel} chars`
			};
			break;
		case 'delete-selection':
			cmdType = 'delete-selection';
			makeUpdate = lastEntry?.type === 'delete-selection';
			combo = cmd;
			description = {
				combo: cmd,
				short: `del-sel ${nDel} chars`,
				long: `delete selection of ${nDel} chars`
			};
			break;
		case 'combo':
			cmdType = myBindings[cmd].type;
			makeUpdate = lastEntry?.cmd === cmd;
			combo = keymapChoice[cmd].combo;
			description = {
				combo: keymapChoice[cmd].desc_combo,
				short: myBindings[cmd].desc.short,
				long: myBindings[cmd].desc.long
			};
			break;
	}

	// update history log or push new entry
	if (makeUpdate) {
		updateLastInHistory(cmdLog, {
			id: cmdLog.list.length - 1,
			state: state.toJSON(),
			type: cmdType,
			ntimes: lastEntry?.ntimes + 1,
			cmd: cmd,
			combo: combo,
			description: description,
			doc: state.doc,
			sel: state.selection
		});
	} else {
		pushToHistory(cmdLog, {
			id: cmdLog.list.length,
			state: state.toJSON(),
			type: cmdType,
			ntimes: 1,
			cmd: cmd,
			combo: combo,
			description: description,
			doc: state.doc,
			sel: state.selection
		});
	}
}

// Extension to log keyboard-only insert/delete events
export function logKeyboardChanges(cmdLog: TcmdLog) {
	return EditorView.updateListener.of((update) => {
		if (update.docChanged) {
			const tr = update.transactions[0];

			// Check if this transaction was caused by direct user input via keyboard
			const isKeyboardInput =
				tr.isUserEvent('input.type') ||
				tr.isUserEvent('delete.backward') ||
				tr.isUserEvent('delete.forward') ||
				tr.isUserEvent('delete.selection');

			if (isKeyboardInput) {
				update.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
					const insertedText = inserted.sliceString(0);
					const deletedLength = toA - fromA;
					if (insertedText.length > 0) {
						logToHistory('insert', update.state, cmdLog, insertedText);
					} else if (deletedLength > 0) {
						const deleteType = tr.isUserEvent('delete.backward')
							? ['delete-backward', 'backspace']
							: tr.isUserEvent('delete.forward')
								? ['delete-forward', 'del']
								: ['delete-selection', 'delete-selection'];
						logToHistory(deleteType[0], update.state, cmdLog, deleteType[1], deletedLength);
					}
				});
			}
		}
	});
}

export function createCustomKeymap(editorView: EditorView, cmdLog: TcmdLog) {
	const keymap = [
		// regular commands
		...customCommands.map((command) => {
			return {
				key: keymapChoice[command].combo,
				run: (ev) => {
					// run action
					myBindings[command].fun(ev);
					// log combo to history
					if (myBindings[command].logToHistory) {
						logToHistory('combo', editorView?.state, cmdLog, command);
					}
					return true; // prevent other actions with same keybinding to run
				},
				preventDefault: true
			};
		}),
		// history commands
		{
			key: keymapChoice.histBack.combo,
			run: (ev) => {
				// logToHistory('combo', editorView?.state, cmdLog, 'histBack');
				goHistory(editorView, cmdLog, -1);
				return true;
			},
			preventDefault: true
		},
		{
			key: keymapChoice.histForward.combo,
			run: (ev) => {
				// logToHistory('combo', editorView?.state, cmdLog, 'histForward');
				goHistory(editorView, cmdLog, 1);
				return true;
			},
			preventDefault: true
		}
	];
	return keymap;
}

// ----------------------------------------------------
// ----------------------------------------------------

// ChatGPT
// export const addCursorAbove: Command = (editorView: EditorView) => {
// 	const { state } = editorView;
// 	const ranges = state.selection.ranges
// 		.map((r) => {
// 			const pos = r.head;
// 			const line = state.doc.lineAt(pos);
// 			if (line.number === 1) return null; // already top
// 			const above = state.doc.line(line.number - 1);
// 			const offset = Math.min(r.head - line.from, above.length);
// 			return EditorSelection.cursor(above.from + offset);
// 		})
// 		.filter((r) => r !== null);

// 	if (!ranges.length) return false;

// 	editorView.dispatch({
// 		selection: EditorSelection.create(
// 			[...state.selection.ranges, ...(ranges as any)],
// 			state.selection.mainIndex
// 		),
// 		scrollIntoView: true
// 	});
// 	//   return true;
// };

// // ChatGPT
// export const addCursorBelow: Command = (view: EditorView) => {
// 	const { state } = view;
// 	const ranges = state.selection.ranges
// 		.map((r) => {
// 			const pos = r.head;
// 			const line = state.doc.lineAt(pos);
// 			if (line.number === state.doc.lines) return null; // already bottom
// 			const below = state.doc.line(line.number + 1);
// 			const offset = Math.min(r.head - line.from, below.length);
// 			return EditorSelection.cursor(below.from + offset);
// 		})
// 		.filter((r) => r !== null);

// 	if (!ranges.length) return false;

// 	view.dispatch({
// 		selection: EditorSelection.create(
// 			[...state.selection.ranges, ...(ranges as any)],
// 			state.selection.mainIndex
// 		),
// 		scrollIntoView: true
// 	});
// 	//   return true;
// };
