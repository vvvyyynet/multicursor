export type TypeCustomCommands =	
| 'init'
	| 'histBack'
	| 'histForward'
	| 'selectNextOccurrence'
	| 'copyLineDown'
	| 'copyLineUp'
	| 'cursorCharLeft'
	| 'cursorCharRight'
	| 'selectCharLeft'
	| 'selectCharRight'
	| 'cursorDocEnd'
	| 'cursorDocStart'
	| 'cursorGroupLeft'
	| 'cursorGroupRight'
	| 'cursorLineBoundaryBackward'
	| 'cursorLineBoundaryForward'
	| 'cursorLineDown'
	| 'cursorLineEnd'
	| 'cursorLineStart'
	| 'cursorLineUp'
	| 'cursorMatchingBracket'
	| 'cursorPageDown'
	| 'cursorPageUp'
	| 'cursorSyntaxLeft'
	| 'cursorSyntaxRight'
	| 'deleteCharBackward'
	| 'deleteCharForward'
	| 'deleteGroupBackward'
	| 'deleteGroupForward'
	| 'deleteLine'
	| 'deleteLineBoundaryBackward'
	| 'deleteLineBoundaryForward'
	| 'indentLess'
	| 'indentMore'
	| 'indentSelection'
	| 'insertBlankLine'
	| 'insertNewlineAndIndent'
	| 'moveLineDown'
	| 'moveLineUp'
	| 'selectAll'
	| 'selectDocEnd'
	| 'selectDocStart'
	| 'selectGroupLeft'
	| 'selectGroupRight'
	| 'selectLine'
	| 'selectLineBoundaryBackward'
	| 'selectLineBoundaryForward'
	| 'selectLineDown'
	| 'selectLineEnd'
	| 'selectLineStart'
	| 'selectLineUp'
	| 'selectPageDown'
	| 'selectPageUp'
	| 'selectParentSyntax'
	| 'selectSyntaxLeft'
	| 'selectSyntaxRight'
	| 'simplifySelection'
	| 'toggleBlockComment'
	| 'toggleComment'
	| 'toggleTabFocusMode'


export const customCommands: TypeCustomCommands[] = [
	'histBack',
	'histForward',
	'selectNextOccurrence',
	'copyLineDown',
	'copyLineUp',
	'cursorCharLeft',
	'cursorCharRight',
	'selectCharLeft',
	'selectCharRight',
	'cursorDocEnd',
	'cursorDocStart',
	'cursorGroupLeft',
	'cursorGroupRight',
	'cursorLineBoundaryBackward',
	'cursorLineBoundaryForward',
	'cursorLineDown',
	'cursorLineEnd',
	'cursorLineStart',
	'cursorLineUp',
	'cursorMatchingBracket',
	'cursorPageDown',
	'cursorPageUp',
	'cursorSyntaxLeft',
	'cursorSyntaxRight',
	'deleteCharBackward',
	'deleteCharForward',
	'deleteGroupBackward',
	'deleteGroupForward',
	'deleteLine',
	'deleteLineBoundaryBackward',
	'deleteLineBoundaryForward',
	'indentLess',
	'indentMore',
	'indentSelection',
	'insertBlankLine',
	'insertNewlineAndIndent',
	'moveLineDown',
	'moveLineUp',
	'selectAll',
	'selectDocEnd',
	'selectDocStart',
	'selectGroupLeft',
	'selectGroupRight',
	'selectLine',
	'selectLineBoundaryBackward',
	'selectLineBoundaryForward',
	'selectLineDown',
	'selectLineEnd',
	'selectLineStart',
	'selectLineUp',
	'selectPageDown',
	'selectPageUp',
	'selectParentSyntax',
	'selectSyntaxLeft',
	'selectSyntaxRight',
	'simplifySelection',
	'toggleBlockComment',
	'toggleComment',
	'toggleTabFocusMode',
];

// KeymapChoice
export type TkeymapChoice = { combo: string; desc_combo: string };
export type TypeComboSet = {
	keymapChoices: TkeymapChoice[];
	desc: {'short':string, 'long':string};
	type: string;
	logToHistory: boolean;
	fun: Function;
};

export type TMyBindings = {
	histBack: TypeComboSet;
	histForward: TypeComboSet;
	selectNextOccurrence: TypeComboSet;
	copyLineDown: TypeComboSet;
	copyLineUp: TypeComboSet;
	cursorCharLeft: TypeComboSet;
	cursorCharRight: TypeComboSet;
	selectCharLeft: TypeComboSet;
	selectCharRight: TypeComboSet;
	cursorDocEnd: TypeComboSet;
	cursorDocStart: TypeComboSet;
	cursorGroupLeft: TypeComboSet;
	cursorGroupRight: TypeComboSet;
	cursorLineBoundaryBackward: TypeComboSet;
	cursorLineBoundaryForward: TypeComboSet;
	cursorLineDown: TypeComboSet;
	cursorLineEnd: TypeComboSet;
	cursorLineStart: TypeComboSet;
	cursorLineUp: TypeComboSet;
	cursorMatchingBracket: TypeComboSet;
	cursorPageDown: TypeComboSet;
	cursorPageUp: TypeComboSet;
	cursorSyntaxLeft: TypeComboSet;
	cursorSyntaxRight: TypeComboSet;
	deleteCharBackward: TypeComboSet;
	deleteCharForward: TypeComboSet;
	deleteGroupBackward: TypeComboSet;
	deleteGroupForward: TypeComboSet;
	deleteLine: TypeComboSet;
	deleteLineBoundaryBackward: TypeComboSet;
	deleteLineBoundaryForward: TypeComboSet;
	indentLess: TypeComboSet;
	indentMore: TypeComboSet;
	indentSelection: TypeComboSet;
	insertBlankLine: TypeComboSet;
	insertNewlineAndIndent: TypeComboSet;
	moveLineDown: TypeComboSet;
	moveLineUp: TypeComboSet;
	selectAll: TypeComboSet;
	selectDocEnd: TypeComboSet;
	selectDocStart: TypeComboSet;
	selectGroupLeft: TypeComboSet;
	selectGroupRight: TypeComboSet;
	selectLine: TypeComboSet;
	selectLineBoundaryBackward: TypeComboSet;
	selectLineBoundaryForward: TypeComboSet;
	selectLineDown: TypeComboSet;
	selectLineEnd: TypeComboSet;
	selectLineStart: TypeComboSet;
	selectLineUp: TypeComboSet;
	selectPageDown: TypeComboSet;
	selectPageUp: TypeComboSet;
	selectParentSyntax: TypeComboSet;
	selectSyntaxLeft: TypeComboSet;
	selectSyntaxRight: TypeComboSet;
	simplifySelection: TypeComboSet;
	toggleBlockComment: TypeComboSet;
	toggleComment: TypeComboSet;
	toggleTabFocusMode: TypeComboSet;

};

export type TypekeymapChoice = {
	histBack: TypeComboSet;
	histForward: TypeComboSet;
	selectNextOccurrence: TypeComboSet;
	copyLineDown: TypeComboSet;
	copyLineUp: TypeComboSet;
	cursorCharLeft: TypeComboSet;
	cursorCharRight: TypeComboSet;
	selectCharLeft: TypeComboSet;
	selectCharRight: TypeComboSet;
	cursorDocEnd: TypeComboSet;
	cursorDocStart: TypeComboSet;
	cursorGroupLeft: TypeComboSet;
	cursorGroupRight: TypeComboSet;
	cursorLineBoundaryBackward: TypeComboSet;
	cursorLineBoundaryForward: TypeComboSet;
	cursorLineDown: TypeComboSet;
	cursorLineEnd: TypeComboSet;
	cursorLineStart: TypeComboSet;
	cursorLineUp: TypeComboSet;
	cursorMatchingBracket: TypeComboSet;
	cursorPageDown: TypeComboSet;
	cursorPageUp: TypeComboSet;
	cursorSyntaxLeft: TypeComboSet;
	cursorSyntaxRight: TypeComboSet;
	deleteCharBackward: TypeComboSet;
	deleteCharForward: TypeComboSet;
	deleteGroupBackward: TypeComboSet;
	deleteGroupForward: TypeComboSet;
	deleteLine: TypeComboSet;
	deleteLineBoundaryBackward: TypeComboSet;
	deleteLineBoundaryForward: TypeComboSet;
	indentLess: TypeComboSet;
	indentMore: TypeComboSet;
	indentSelection: TypeComboSet;
	insertBlankLine: TypeComboSet;
	insertNewlineAndIndent: TypeComboSet;
	moveLineDown: TypeComboSet;
	moveLineUp: TypeComboSet;
	selectAll: TypeComboSet;
	selectDocEnd: TypeComboSet;
	selectDocStart: TypeComboSet;
	selectGroupLeft: TypeComboSet;
	selectGroupRight: TypeComboSet;
	selectLine: TypeComboSet;
	selectLineBoundaryBackward: TypeComboSet;
	selectLineBoundaryForward: TypeComboSet;
	selectLineDown: TypeComboSet;
	selectLineEnd: TypeComboSet;
	selectLineStart: TypeComboSet;
	selectLineUp: TypeComboSet;
	selectPageDown: TypeComboSet;
	selectPageUp: TypeComboSet;
	selectParentSyntax: TypeComboSet;
	selectSyntaxLeft: TypeComboSet;
	selectSyntaxRight: TypeComboSet;
	simplifySelection: TypeComboSet;
	toggleBlockComment: TypeComboSet;
	toggleComment: TypeComboSet;
	toggleTabFocusMode: TypeComboSet;
};

// Command-Combo Chips Options
export const CmdCmbChipsOptions = [
	['Kommandos', 'cmd'],
	['Kombinationen', 'desc_combo']
];
