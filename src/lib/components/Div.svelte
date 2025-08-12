<script>
	let { classes = '', children } = $props();
</script>

<div class={classes}>
	{@render children()}
</div>
