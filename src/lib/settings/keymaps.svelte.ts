import { selectNextOccurrence } from '@codemirror/search';
import { goHistory } from '$lib/functions/historyFunctions.svelte';
import {
	copyLineDown,
	copyLineUp,
	cursorCharLeft,
	cursorCharRight,
	selectCharLeft,
	selectCharRight,
	cursorDocEnd,
	cursorDocStart,
	cursorGroupLeft,
	cursorGroupRight,
	cursorLineBoundaryBackward,
	cursorLineBoundaryForward,
	cursorLineDown,
	cursorLineEnd,
	cursorLineStart,
	cursorLineUp,
	cursorMatchingBracket,
	cursorPageDown,
	cursorPageUp,
	cursorSyntaxLeft,
	cursorSyntaxRight,
	deleteCharBackward,
	deleteCharForward,
	deleteGroupBackward,
	deleteGroupForward,
	deleteLine,
	deleteLineBoundaryBackward,
	deleteLineBoundaryForward,
	indentLess,
	indentMore,
	indentSelection,
	insertBlankLine,
	insertNewlineAndIndent,
	moveLineDown,
	moveLineUp,
	selectAll,
	selectDocEnd,
	selectDocStart,
	selectGroupLeft,
	selectGroupRight,
	selectLine,
	selectLineBoundaryBackward,
	selectLineBoundaryForward,
	selectLineDown,
	selectLineEnd,
	selectLineStart,
	selectLineUp,
	selectPageDown,
	selectPageUp,
	selectParentSyntax,
	selectSyntaxLeft,
	selectSyntaxRight,
	simplifySelection,
	toggleBlockComment,
	toggleComment,
	toggleTabFocusMode
} from '@codemirror/commands';
import { customCommands } from '$lib/constants';
import type { TMyBindings } from '$lib/constants';


export const myBindings: TMyBindings = {
	histBack: {
		keymapChoices: [{ combo: 'Mod-z', desc_combo: 'Mod-z' }],
		desc: {short:'histBack', long: 'histBack'},
		type: 'select',
		logToHistory: true,
		fun: goHistory
		// fun: () => {
		// 	goHistory(editorView, cmdLog, -1);
		// }
	},
	histForward: {
		keymapChoices: [{ combo: 'Mod-y', desc_combo: 'Mod-y' }],
		desc: {short:'histForward', long: 'histForward'},
		type: 'select',
		logToHistory: true,
		fun: goHistory
		// fun: () => {
		// 	goHistory(editorView, cmdLog, 1);
		// }
	},
	selectNextOccurrence: {
		keymapChoices: [
			{ combo: 'Mod-d', desc_combo: 'Ctrl+d' },
			{ combo: 'Mod-k', desc_combo: 'Ctrl+k' }
		],
		desc: {short:'selectNextOccurrence', long: 'selectNextOccurrence'},
		type: 'select',
		logToHistory: true,
		fun: selectNextOccurrence
	},
	cursorGroupLeft: {
		keymapChoices: [{ combo: 'Ctrl-ArrowLeft', desc_combo: 'Ctrl-ArrowLeft' }],
		desc: {short:'cursorGroupLeft', long: 'cursorGroupLeft'},
		type: 'select',
		logToHistory: true,
		fun: cursorGroupLeft
	},
	selectGroupLeft: {
		keymapChoices: [{ combo: 'Shift-Ctrl-ArrowLeft', desc_combo: 'Shift-Ctrl-ArrowLeft' }],
		desc: {short:'selectGroupLeft', long: 'selectGroupLeft'},
		type: 'select',
		logToHistory: true,
		fun: selectGroupLeft
	},
	cursorGroupRight: {
		keymapChoices: [{ combo: 'Ctrl-ArrowRight', desc_combo: 'Ctrl-ArrowRight' }],
		desc: {short:'cursorGroupRight', long: 'cursorGroupRight'},
		type: 'select',
		logToHistory: true,
		fun: cursorGroupRight
	},
	selectGroupRight: {
		keymapChoices: [{ combo: 'Shift-Ctrl-ArrowRight', desc_combo: 'Shift-Ctrl-ArrowRight' }],
		desc: {short:'selectGroupRight', long: 'selectGroupRight'},
		type: 'select',
		logToHistory: true,
		fun: selectGroupRight
	},
	cursorLineStart: {
		keymapChoices: [{ combo: 'Cmd-ArrowLeft', desc_combo: 'Cmd-ArrowLeft' }],
		desc: {short:'cursorLineStart', long: 'cursorLineStart'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineStart
	},
	selectLineStart: {
		keymapChoices: [{ combo: 'Shift-Cmd-ArrowLeft', desc_combo: 'Shift-Cmd-ArrowLeft' }],
		desc: {short:'selectLineStart', long: 'selectLineStart'},
		type: 'select',
		logToHistory: true,
		fun: selectLineStart
	},
	cursorLineEnd: {
		keymapChoices: [{ combo: 'Cmd-ArrowRight', desc_combo: 'Cmd-ArrowRight' }],
		desc: {short:'cursorLineEnd', long: 'cursorLineEnd'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineEnd
	},
	selectLineEnd: {
		keymapChoices: [{ combo: 'Shift-Cmd-ArrowRight', desc_combo: 'Shift-Cmd-ArrowRight' }],
		desc: {short:'selectLineEnd', long: 'selectLineEnd'},
		type: 'select',
		logToHistory: true,
		fun: selectLineEnd
	},
	cursorLineUp: {
		keymapChoices: [{ combo: 'ArrowUp', desc_combo: 'ArrowUp' }],
		desc: {short:'cursorLineUp', long: 'cursorLineUp'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineUp
	},
	selectLineUp: {
		keymapChoices: [{ combo: 'Shift-ArrowUp', desc_combo: 'Shift-ArrowUp' }],
		desc: {short:'selectLineUp', long: 'selectLineUp'},
		type: 'select',
		logToHistory: true,
		fun: selectLineUp
	},
	cursorLineDown: {
		keymapChoices: [{ combo: 'ArrowDown', desc_combo: 'ArrowDown' }],
		desc: {short:'cursorLineDown', long: 'cursorLineDown'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineDown
	},
	selectLineDown: {
		keymapChoices: [{ combo: 'Shift-ArrowDown', desc_combo: 'Shift-ArrowDown' }],
		desc: {short:'selectLineDown', long: 'selectLineDown'},
		type: 'select',
		logToHistory: true,
		fun: selectLineDown
	},
	cursorCharLeft: {
		keymapChoices: [{ combo: 'ArrowLeft', desc_combo: 'ArrowLeft' }],
		desc: {short:'cursorCharLeft', long: 'cursorCharLeft'},
		type: 'select',
		logToHistory: true,
		fun: cursorCharLeft
	},
	selectCharLeft: {
		keymapChoices: [{ combo: 'Shift-ArrowLeft', desc_combo: 'Shift-ArrowLeft' }],
		desc: {short:'selectCharLeft', long: 'selectCharLeft'},
		type: 'select',
		logToHistory: true,
		fun: selectCharLeft
	},
	cursorCharRight: {
		keymapChoices: [{ combo: 'ArrowRight', desc_combo: 'ArrowRight' }],
		desc: {short:'cursorCharRight', long: 'cursorCharRight'},
		type: 'select',
		logToHistory: true,
		fun: cursorCharRight
	},
	selectCharRight: {
		keymapChoices: [{ combo: 'Shift-ArrowRight', desc_combo: 'Shift-ArrowRight' }],
		desc: {short:'selectCharRight', long: 'selectCharRight'},
		type: 'select',
		logToHistory: true,
		fun: selectCharRight
	},
	cursorDocEnd: {
		keymapChoices: [{ combo: 'Ctrl-End', desc_combo: 'Ctrl-End' }],
		keymapChoicesMac: [{ combo: 'Cmd-ArrowDown', desc_combo: 'Cmd-ArrowDown' }],
		desc: {short:'keymapChoices', long: 'keymapChoices'},
		type: 'select',
		logToHistory: true,
		fun: cursorDocEnd
	},
	selectDocEnd: {
		keymapChoices: [{ combo: 'Shift-Ctrl-End', desc_combo: 'Shift-Ctrl-End' }],
		keymapChoicesMac: [{ combo: 'Shift-Cmd-ArrowDown', desc_combo: 'Shift-Cmd-ArrowDown' }],
		desc: {short:'keymapChoices', long: 'keymapChoices'},
		type: 'select',
		logToHistory: true,
		fun: selectDocEnd
	},
	cursorDocStart: {
		keymapChoices: [{ combo: 'Ctrl-Home', desc_combo: 'Ctrl-Home' }],
		keymapChoicesMac: [{ combo: 'Cmd-ArrowUp', desc_combo: 'Cmd-ArrowUp' }],
		desc: {short:'keymapChoices', long: 'keymapChoices'},
		type: 'select',
		logToHistory: true,
		fun: cursorDocStart
	},
	selectDocStart: {
		keymapChoices: [{ combo: 'Shift-Ctrl-Home', desc_combo: 'Shift-Ctrl-Home' }],
		keymapChoicesMac: [{ combo: 'Shift-Cmd-ArrowUp', desc_combo: 'Shift-Cmd-ArrowUp' }],
		desc: {short:'keymapChoices', long: 'keymapChoices'},
		type: 'select',
		logToHistory: true,
		fun: selectDocStart
	},
	cursorPageUp: {
		keymapChoices: [
			{ combo: 'Ctrl-ArrowUp', desc_combo: 'Ctrl-ArrowUp' },
			{ combo: 'PageUp', desc_combo: 'PageUp' }
		],
		desc: {short:'cursorPageUp', long: 'cursorPageUp'},
		type: 'select',
		logToHistory: true,
		fun: cursorPageUp
	},
	selectPageUp: {
		keymapChoices: [
			{ combo: 'Shift-Ctrl-ArrowUp', desc_combo: 'Shift-Ctrl-ArrowUp' },
			{ combo: 'Shift-PageUp', desc_combo: 'Shift-PageUp' }
		],
		desc: {short:'selectPageUp', long: 'selectPageUp'},
		type: 'select',
		logToHistory: true,
		fun: selectPageUp
	},
	cursorPageDown: {
		keymapChoices: [
			{ combo: 'Ctrl-ArrowDown', desc_combo: 'Ctrl-ArrowDown' },
			{ combo: 'PageDown', desc_combo: 'PageDown' }
		],
		desc: {short:'selectPageDown', long: 'selectPageDown'},
		type: 'select',
		logToHistory: true,
		fun: cursorPageDown
	},
	selectPageDown: {
		keymapChoices: [
			{ combo: 'Shift-Ctrl-ArrowDown', desc_combo: 'Shift-Ctrl-ArrowDown' },
			{ combo: 'Shift-PageDown', desc_combo: 'Shift-PageDown' }
		],
		desc: {short:'selectPageDown', long: 'selectPageDown'},
		type: 'select',
		logToHistory: true,
		fun: selectPageDown
	},
	cursorLineBoundaryBackward: {
		keymapChoices: [{ combo: 'Home', desc_combo: 'Home' }],
		desc: {short:'cursorLineBoundaryBackward', long: 'cursorLineBoundaryBackward'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineBoundaryBackward
	},
	selectLineBoundaryBackward: {
		keymapChoices: [{ combo: 'Shift-Home', desc_combo: 'Shift-Home' }],
		desc: {short:'selectLineBoundaryBackward', long: 'selectLineBoundaryBackward'},
		type: 'select',
		logToHistory: true,
		fun: selectLineBoundaryBackward
	},
	cursorLineBoundaryForward: {
		keymapChoices: [{ combo: 'End', desc_combo: 'End' }],
		desc: {short:'cursorLineBoundaryForward', long: 'cursorLineBoundaryForward'},
		type: 'select',
		logToHistory: true,
		fun: cursorLineBoundaryForward
	},
	selectLineBoundaryForward: {
		keymapChoices: [{ combo: 'Shift-End', desc_combo: 'Shift-End' }],
		desc: {short:'selectLineBoundaryForward', long: 'selectLineBoundaryForward'},
		type: 'select',
		logToHistory: true,
		fun: selectLineBoundaryForward
	},
	insertNewlineAndIndent: {
		keymapChoices: [
			{ combo: 'Enter', desc_combo: 'Enter' },
			{ combo: 'Shift-Enter', desc_combo: 'Shift-Enter' }
		],
		desc: {short:'insertNewlineAndIndent', long: 'insertNewlineAndIndent'},
		type: 'select',
		logToHistory: true,
		fun: insertNewlineAndIndent
	},
	selectAll: {
		keymapChoices: [{ combo: 'Ctrl-a', desc_combo: 'Ctrl-a' }],
		desc: {short:'selectAll', long: 'select all'},
		type: 'select',
		logToHistory: true,
		fun: selectAll
	},
	deleteCharBackward: {
		keymapChoices: [{ combo: 'Backspace', desc_combo: 'Backspace' }],
		desc: {short:'deleteCharBackward', long: 'deleteCharBackward'},
		type: 'select',
		logToHistory: false,
		// fun: ()=>{}
		fun: deleteCharBackward
	},
	deleteCharForward: {
		keymapChoices: [{ combo: 'Delete', desc_combo: 'Delete' }],
		desc: {short:'deleteCharForward', long: 'deleteCharForward'},
		type: 'select',
		logToHistory: false,
		fun: deleteCharForward
	},
	deleteGroupBackward: {
		keymapChoices: [{ combo: 'Ctrl-Backspace', desc_combo: 'Ctrl-Backspace' }],
		desc: {short:'deleteGroupBackward', long: 'deleteGroupBackward'},
		type: 'select',
		logToHistory: true,
		fun: deleteGroupBackward
	},
	deleteGroupForward: {
		keymapChoices: [{ combo: 'Ctrl-Delete', desc_combo: 'Ctrl-Delete' }],
		desc: {short:'deleteGroupForward', long: 'deleteGroupForward'},
		type: 'select',
		logToHistory: true,
		fun: deleteGroupForward
	},
	deleteLineBoundaryBackward: {
		keymapChoices: [{ combo: 'Cmd-Backspace', desc_combo: 'Cmd-Backspace' }],
		desc: {short:'deleteLineBoundaryBackward', long: 'deleteLineBoundaryBackward'},
		type: 'select',
		logToHistory: true,
		fun: deleteLineBoundaryBackward
	},
	deleteLineBoundaryForward: {
		keymapChoices: [{ combo: 'Cmd-Delete', desc_combo: 'Cmd-Delete' }],
		desc: {short:'deleteLineBoundaryForward', long: 'deleteLineBoundaryForward'},
		type: 'select',
		logToHistory: true,
		fun: deleteLineBoundaryForward
	},
	cursorSyntaxLeft: {
		keymapChoices: [{ combo: 'Alt-ArrowLeft', desc_combo: 'Alt-ArrowLeft' }],
		desc: {short:'cursorSyntaxLeft', long: 'cursorSyntaxLeft'},
		type: 'select',
		logToHistory: true,
		fun: cursorSyntaxLeft
	},
	selectSyntaxLeft: {
		keymapChoices: [{ combo: 'Shift-Alt-ArrowLeft', desc_combo: 'Shift-Alt-ArrowLeft' }],
		desc: {short:'selectSyntaxLeft', long: 'selectSyntaxLeft'},
		type: 'select',
		logToHistory: true,
		fun: selectSyntaxLeft
	},
	cursorSyntaxRight: {
		keymapChoices: [{ combo: 'Alt-ArrowRight', desc_combo: 'Alt-ArrowRight' }],
		desc: {short:'cursorSyntaxRight', long: 'cursorSyntaxRight'},
		type: 'select',
		logToHistory: true,
		fun: cursorSyntaxRight
	},
	selectSyntaxRight: {
		keymapChoices: [{ combo: 'Shift-Alt-ArrowRight', desc_combo: 'Shift-Alt-ArrowRight' }],
		desc: {short:'selectSyntaxRight', long: 'selectSyntaxRight'},
		type: 'select',
		logToHistory: true,
		fun: selectSyntaxRight
	},
	moveLineUp: {
		keymapChoices: [{ combo: 'Alt-ArrowUp', desc_combo: 'Alt-ArrowUp' }],
		desc: {short:'moveLineUp', long: 'moveLineUp'},
		type: 'select',
		logToHistory: true,
		fun: moveLineUp
	},
	moveLineDown: {
		keymapChoices: [{ combo: 'Alt-ArrowDown', desc_combo: 'Alt-ArrowDown' }],
		desc: {short:'moveLineDown', long: 'moveLineDown'},
		type: 'select',
		logToHistory: true,
		fun: moveLineDown
	},
	copyLineUp: {
		keymapChoices: [{ combo: 'Shift-Alt-ArrowUp', desc_combo: 'Shift-Alt-ArrowUp' }],
		desc: {short:'copyLineUp', long: 'copyLineUp'},
		type: 'select',
		logToHistory: true,
		fun: copyLineUp
	},
	copyLineDown: {
		keymapChoices: [{ combo: 'Shift-Alt-ArrowDown', desc_combo: 'Shift-Alt-ArrowDown' }],
		desc: {short:'copyLineDown', long: 'copyLineDown'},
		type: 'select',
		logToHistory: true,
		fun: copyLineDown
	},
	simplifySelection: {
		keymapChoices: [{ combo: 'Escape', desc_combo: 'Escape' }],
		desc: {short:'simplifySelection', long: 'simplifySelection'},
		type: 'select',
		logToHistory: true,
		fun: simplifySelection
	},
	insertBlankLine: {
		keymapChoices: [{ combo: 'Ctrl-Enter', desc_combo: 'Ctrl-Enter' }],
		desc: {short:'insertBlankLine', long: 'insertBlankLine'},
		type: 'select',
		logToHistory: true,
		fun: insertBlankLine
	},
	selectLine: {
		keymapChoices: [{ combo: 'Alt-l', desc_combo: 'Alt-l' }],
		desc: {short:'selectLine', long: 'selectLine'},
		type: 'select',
		logToHistory: true,
		fun: selectLine
	},
	selectParentSyntax: {
		keymapChoices: [{ combo: 'Ctrl-i', desc_combo: 'Ctrl-i' }],
		desc: {short:'selectParentSyntax', long: 'selectParentSyntax'},
		type: 'select',
		logToHistory: true,
		fun: selectParentSyntax
	},
	indentLess: {
		keymapChoices: [{ combo: 'Ctrl-[', desc_combo: 'Ctrl-[' }],
		desc: {short:'indentLess', long: 'indentLess'},
		type: 'select',
		logToHistory: true,
		fun: indentLess
	},
	indentMore: {
		keymapChoices: [{ combo: 'Ctrl-]', desc_combo: 'Ctrl-]' }],
		desc: {short:'indentMore', long: 'indentMore'},
		type: 'select',
		logToHistory: true,
		fun: indentMore
	},
	indentSelection: {
		keymapChoices: [{ combo: 'Ctrl-Alt-\\', desc_combo: 'Ctrl-Alt-\\' }],
		desc: {short:'indentSelection', long: 'indentSelection'},
		type: 'select',
		logToHistory: true,
		fun: indentSelection
	},
	deleteLine: {
		keymapChoices: [{ combo: 'Shift-Ctrl-k', desc_combo: 'Shift-Ctrl-k' }],
		desc: {short:'deleteLine', long: 'deleteLine'},
		type: 'select',
		logToHistory: true,
		fun: deleteLine
	},
	cursorMatchingBracket: {
		keymapChoices: [{ combo: 'Shift-Ctrl-\\', desc_combo: 'Shift-Ctrl-\\' }],
		desc: {short:'cursorMatchingBracket', long: 'cursorMatchingBracket'},
		type: 'select',
		logToHistory: true,
		fun: cursorMatchingBracket
	},
	toggleComment: {
		keymapChoices: [{ combo: 'Ctrl-/', desc_combo: 'Ctrl-/' }],
		desc: {short:'toggleComment', long: 'toggleComment'},
		type: 'select',
		logToHistory: true,
		fun: toggleComment
	},
	toggleBlockComment: {
		keymapChoices: [{ combo: 'Shift-Alt-a', desc_combo: 'Shift-Alt-a' }],
		desc: {short:'toggleBlockComment', long: 'toggleBlockComment'},
		type: 'select',
		logToHistory: true,
		fun: toggleBlockComment
	},
	toggleTabFocusMode: {
		keymapChoices: [{ combo: 'Mod-m', desc_combo: 'Mod-m' }],
		desc: {short:'toggleTabFocusMode', long: 'toggleTabFocusMode'},
		type: 'select',
		logToHistory: true,
		fun: toggleTabFocusMode
	}
};

export let keymapChoice = $state(
	Object.fromEntries(customCommands.map((command) => [command, myBindings[command].keymapChoices[0]]))
);
