import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { createEditorExtensions } from './editorExtensions.svelte';
import type { TypeCustomCommands } from '$lib/constants';

export type TeditorSettings = {
	historySettings: ThistorySettings;
};
export type ThistorySettings = {
	useComboDesc: boolean;
	useLongDesc: boolean;
};

export type TcmdLogList = {
	id: number;
	state: any;
	type: string;
	ntimes: number;
	cmd: TypeCustomCommands | 'initial' | string;
	combo: string;
	description: String;
	doc: EditorState['doc'];
	sel: EditorState['selection'];
};

export type TcmdLog = {
	list: TcmdLogList[];
	length: number;
	currentIndex: number;
};

export function pushToHistory(cmdLog: TcmdLog, item: TcmdLogList) {
	if (cmdLog.list.length == 0) {
		cmdLog.list.push(item);
	} else {
		cmdLog.list = [...cmdLog.list.slice(0, cmdLog.currentIndex + 1), item];
	}
	cmdLog.currentIndex = cmdLog.list.length - 1;
}

export function updateLastInHistory(cmdLog: TcmdLog, item: TcmdLogList) {
	cmdLog.list[cmdLog.list.length - 1] = item;
}

export function restoreHistory(editorView: EditorView, cmdLog: TcmdLog, index: number) {
	const newState = EditorState.fromJSON(cmdLog.list[index].state, {
		extensions: createEditorExtensions(editorView, cmdLog)
	});
	editorView?.setState(newState);
	cmdLog.currentIndex = index;
}

export function goHistory(editorView: EditorView, cmdLog: TcmdLog, direction: -1 | 1) {
	let newIndex = cmdLog.currentIndex + direction;
	if (newIndex >= 0 && newIndex < cmdLog.list.length) {
		restoreHistory(editorView, cmdLog, newIndex);
	}
}
