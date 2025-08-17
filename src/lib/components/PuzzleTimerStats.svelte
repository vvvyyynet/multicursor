<script>
	import { Timer } from '@lucide/svelte';
	let {
		cmdLog,
		editorView = $bindable(),
		isSolved,
		cmdCountAll,
		time = $bindable(),
		classes = ''
	} = $props();

	let timer;
	function startTimer() {
		editorView.focus();
		timer = setInterval(() => {
			time++;
		}, 100);
	}
	function endTimer() {
		if (timer) {
			clearInterval(timer);
		}
	}

	// Start timer on first interaction with editor
	$effect(() => {
		if (cmdLog.list.length > 1 && !timer) {
			startTimer();
		}
	});

	// Stop timer when solved
	$effect(() => {
		if (isSolved) {
			endTimer();
		}
	});
</script>

<!-- Timer and Stats-->
<div class={['', classes]}>
	<!-- Heading -->
	<h6 class="w-full h6"><Timer class="mr-2 inline-block" />Timer and Stats</h6>
	<!-- Data -->
	<div class="mt-2 text-lg">
		<p>
			You solved this puzzle in
			<span class="text-2xl font-bold">{time} seconds</span>
			using <span class="text-2xl font-bold">{cmdCountAll}</span> different commands.
		</p>
	</div>
</div>
