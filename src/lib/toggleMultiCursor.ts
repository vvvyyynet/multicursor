
	// Function to toggle multi-cursor
export default function toggleMultiCursor(view) {
		const { state, dispatch } = view;
		const { selection, doc } = state;

		// Ensure there's at least one selection in the editor
		if (selection.ranges.length === 0) return;

		const currentRange = selection.main;
		const currentCursorPosition = currentRange.head;

		// Ensure the cursor position is valid
		if (currentCursorPosition < 0 || currentCursorPosition >= doc.length) return;

		// Find the line at the cursor position
		const line = doc.lineAt(currentCursorPosition);
		const nextLineNumber = line.number + 1;

		// Check if we're already at the last line
		if (nextLineNumber > doc.lines) return;

		// Get the start position of the next line
		const nextLineStart = doc.line(nextLineNumber).from;
		// Add a new selection/cursor at the start of the next line
		const newSelections = selection.ranges.map((range) => ({
			anchor: nextLineStart,
			head: nextLineStart
		}));

		// Update the editor state with the new selections
		const newState = state.update({
			selection: { ranges: newSelections }
		});

		dispatch(newState);
	}
  