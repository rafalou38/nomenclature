<script>
	import { onMount } from 'svelte';
	import { molToSVG } from '../../lib/mol';

	onMount(() => {
		molToSVG();
	});
</script>
