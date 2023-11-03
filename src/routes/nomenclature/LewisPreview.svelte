<script lang="ts">
	import { renderSMILE } from '$lib/RDKit';
	import type { Molecule } from '$lib/molecules';

	export let molecule: Molecule;
	let svg: string;

	$: renderSMILE(molecule.smiles).then((content) => (svg = content));
</script>

{#if svg}
	{@html svg}
{/if}
