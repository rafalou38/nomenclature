<script lang="ts">
	import { browser } from '$app/environment';
	import { renderSMILE } from '$lib/RDKit';
	import type { Molecule } from '$lib/molecules';
	import { onMount } from 'svelte';

	let speck: any;
	let Speck: any;

	export let molecule: Molecule;
	let svg: string;

	async function render(mol: Molecule) {
		if (!Speck) {
			// @ts-ignore
			Speck = (await import('speck-renderer')).default;
			console.log(Speck);
		}

		const slug = mol.name[0].replaceAll(/[^a-zA-Z0-9]+/g, '_') + '.xyz';
		const response = await fetch('/3d-files/' + slug);
		const data = await response.text();

		speck?.destroy();
		speck = new Speck({
			canvasContainerID: 'speck-root',
			canvasID: 'speck-canvas',
			options: {
				zoomRatio: 0.8,
				atoms: {
					atomRadius: 50
				}
				// brightness: 0
				// width: 1024,
				// height: 1024,
			}
		});

		speck.loadStructure(data);
        //speck.renderer.needReset = false;
		speck.renderer.renderer.setResolution(2048, 256);
		speck.renderer.view.atomScale = 0.3;
		speck.renderer.view.relativeAtomScale = 0.6;
		speck.renderer.view.spf = 32;

        // debugger;
		return
        speck.renderer.renderer.reset();
		for (let i = 0; i < 1024/32; i++) {
			speck.renderer.renderer.render(speck.renderer.view);
		}
        // console.log("done")
	}

	let EContainer: HTMLDivElement;
	let ECanvas: HTMLCanvasElement;

	let rect: DOMRect | null;

	$: rect = EContainer?.getBoundingClientRect();

	$: if (browser) render(molecule);
	onMount(() => render(molecule));
</script>

<div
	id="speck-root"
	class="w-screen grow grid place-items-center"
	on:mousemove={() => {
		console.log('move');
	}}
	bind:this={EContainer}
>
	<canvas
		id="speck-canvas"
		class="w-32 h-32"
		style="width: {rect ? Math.min(rect.width, rect.height) : 0}px; height: {rect
			? Math.min(rect.width, rect.height)
			: 0}px;"
		bind:this={ECanvas}
	>
	</canvas>
</div>
