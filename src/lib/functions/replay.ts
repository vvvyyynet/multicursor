function applyStep(step, view) {
	if (step.changes) {
		for (const change of step.changes) {
			view.dispatch({
				changes: {
					from: change.fromA,
					to: change.toA,
					insert: change.inserted
				}
			});
		}
	}

	if (step.selection) {
		view.dispatch({
			selection: {
				ranges: step.selection.map((sel) => ({
					anchor: sel.from,
					head: sel.to
				}))
			},
			scrollIntoView: true
		});
	}
}
