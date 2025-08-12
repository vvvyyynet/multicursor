import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';

const editLog: {
	changes: { fromA: number; toA: number; fromB: number; toB: number; inserted: string };
	selection: { from: number; to: number }[];
}[] = [];

export const keyLogger = ViewPlugin.fromClass(
	class {
		constructor(view: EditorView) {
			console.log('Keylogger started');
		}

		update(update: ViewUpdate) {
			const entry: any = {};

			if (update.docChanged) {
				const changes: (typeof editLog)[0]['changes'][] = [];
				update.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
					changes.push({
						fromA,
						toA,
						fromB,
						toB,
						inserted: inserted.toString()
					});
				});
				entry.changes = changes;
			}

			if (update.selectionSet) {
				entry.selection = update.state.selection.ranges.map((r) => ({
					from: r.from,
					to: r.to
				}));
			}

			if (entry.changes || entry.selection) {
				editLog.push(entry);
			}
		}

		destroy() {
			console.log('Keylogger stopped');
		}
	}
);
