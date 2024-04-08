<script lang="ts">
	import { browser } from '$app/environment';
	import { renderSMILE } from '$lib/RDKit';
	import { ThreeMolRenderer } from '$lib/ThreeMol';
	import type { Molecule } from '$lib/molecules';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let molecule: Molecule;
	async function render(mol: Molecule) {
		const slug = mol.name[0].replaceAll(/[^a-zA-Z0-9]+/g, '_') + '.xyz';
		const response = await fetch('/3d-files/' + slug);
		const data = await response.text();

        renderer.displayXYZ(data);
	}

    let observer: ResizeObserver;
	let EContainer: HTMLDivElement;
	let ECanvas: HTMLCanvasElement;

    let renderer: ThreeMolRenderer;

    function fitCanvas() {
        let rect = EContainer?.getBoundingClientRect();
        if (rect) {
            renderer.resize(rect.width, rect.height);
            console.log("Resized", rect.width, rect.height);

            // renderer = new ThreeMolRenderer(ECanvas);
            // if(molecule) render(molecule);
        }
    }

    onMount(() => {
        if(!ECanvas) throw new Error('No canvas element');

        renderer = new ThreeMolRenderer(ECanvas);

        let timeout: number;
        observer = new ResizeObserver((entries) => {
            clearTimeout(timeout);
            timeout = setTimeout(fitCanvas, 10);
        })
        observer.observe(EContainer);
    })
	$: if (browser) render(molecule);
</script>

<div class="container w-screen grow bg-pink-100 relative" bind:this={EContainer}>
	<canvas bind:this={ECanvas} width="400" height="400" class="absolute h-full w-full"></canvas>
</div>
