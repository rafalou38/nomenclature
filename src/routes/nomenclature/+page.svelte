<script lang="ts">
	import { onMount } from 'svelte';

	import { shuffleArray, simplify } from '$lib/utils';

	import LewisPreview from './LewisPreview.svelte';
	import Preview3D from './Preview3D.svelte';

	import type { Molecule, MoleculeRef } from '$lib/molecules';
	import { molecules as mUnTyped } from '$lib/data/molecules.json';
	import HomeButton from '$lib/components/HomeButton.svelte';
	import Preview3DSpeck from './Preview3D-Speck.svelte';
	import Icon from '@iconify/svelte';
	import { clamp } from 'three/src/math/MathUtils';

	const molecules = mUnTyped as MoleculeRef[];

	let input = '';

	let current: Molecule | null = null;

	let queue: MoleculeRef[] = [];

	let state: 'failed' | 'guessing' | 'succeeded' = 'guessing';

	let score = 0.25;

	async function next() {
		while (true) {
			if (queue.length == 0) queue = shuffleArray(structuredClone(molecules)).filter((m) => m[3]);

			const ref = queue.pop()!;

			console.log(ref[1][0], simplify(ref[1][0]));

			current = {
				groups: ref[0],
				name: ref[1].map((n) => n.toLowerCase()),
				smiles: ref[2],
				external: ref[4]
			};

			if (score < 0.3 && current?.name[0].length > 9) continue;
			else if (score < 0.5 && current?.name[0].length > 15) continue;
			else if (score < 0.8 && current?.name[0].length > 20 && current?.name[0].length < 10)
				continue;
			else if (score < 0.9 && current?.name[0].length > 25 && current?.name[0].length < 15)
				continue;
			else break;
		}
	}

	function submit() {
		if (!current) return;
		EInput.focus();
		if (state == 'guessing') {
			console.log(current.name, current.name.map(simplify));
			console.log(input, simplify(input));

			if (current.name.map(simplify).includes(simplify(input))) {
				state = 'succeeded';
				score *= 1.25;
			} else {
				state = 'failed';
				score *= 0.9;
			}
			score = clamp(score, 0.25, 1);
		}

		setTimeout(
			() => {
				if (state == 'succeeded') setTimeout(next, 1000);
				input = '';
				state = 'guessing';
				setTimeout(() => {
					EInput?.focus();
				}, 100);
			},
			state == 'succeeded' ? 1000 : 2000
		);
	}

	onMount(async () => {
		EInput.focus();
		EInput.click();
		next();
	});

	let EInput: HTMLTextAreaElement;
	$: if (state == 'guessing') {
		console.log('focus', EInput);
	}

	let displayMode = 'text';
</script>

<div class="flex flex-col h-dvh">
	<HomeButton />
	<!-- {score} -->
	<div class="flex overflow-hidden rounded-lg w-max absolute right-0 z-10 m-2">
		<button
			class="rounded-none m-0 border-none p-4 bg-slate-200"
			class:bg-slate-300={displayMode == 'text'}
			on:click={() => (displayMode = 'text')}
		>
			<Icon icon="solar:text-square-outline" />
		</button>
		{#if !current?.external}
			<button
				class="rounded-none m-0 border-none p-4 bg-slate-200"
				class:bg-slate-300={displayMode == 'custom'}
				on:click={() => (displayMode = 'custom')}
			>
				<Icon icon="game-icons:molecule" />
			</button>
			<button
				class="rounded-none m-0 border-none p-4 bg-slate-200"
				class:bg-slate-300={displayMode == 'third'}
				on:click={() => (displayMode = 'third')}
			>
				<Icon icon="game-icons:gooey-molecule" />
			</button>
		{/if}
	</div>

	<div class="flex w-full p-4 mt-16">
		<textarea
			placeholder={{
				guessing: 'Entrer le nom de la molecule...',
				failed: 'Mauvaise réponse!',
				succeeded: "Bravo c'est la bonne réponse."
			}[state]}
			class="state-{state}"
			bind:this={EInput}
			bind:value={input}
			on:keydown={(e) => {
				console.log(e.key);

				if (e.key == 'Enter') {
					e.preventDefault();
					submit();
				}
			}}
		/>

		<button on:click={submit} class="submit state-{state}">OK</button>
	</div>

	<!-- <div class="flex cheats">
		<button class="grow" on:click={next}>Skip</button>
		<button
			class="grow"
			on:click={() => {
				state = 'succeeded';
			}}>Show</button
		>
	</div> -->
	<div class="mol-container mx-auto grow h-full flex flex-col items-center justify-center">
		<!-- {#if current} -->
		<span class="answer" class:shown={state != 'guessing'}>{current?.name[0]}</span>
		<!-- {/if} -->
		{#if current}
			{#if displayMode == 'text' || current?.external}
				<LewisPreview molecule={current} />
			{:else if displayMode == 'third'}
				<Preview3DSpeck molecule={current} />
			{:else}
				<Preview3D molecule={current} />
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	.mol-container {
		width: 60vmin;
		height: 60vmin;
	}
	:global(.mol-container > svg) {
		width: 100%;
		height: auto;
		/* height: 60vmin; */
	}

	.answer {
		@apply text-4xl font-bold opacity-0 -mt-10 transition-all;
		&.shown {
			@apply opacity-100 mt-0;
		}
	}

	.state-failed {
		animation: shake 400ms ease-in forwards 1;
	}

	textarea {
		@apply grow bg-slate-100 rounded-xl p-6 py-4 w-full text-xl
		 ring-transparent outline-none border-slate-200 border-4 border-r-0 rounded-r-none 
		 break-words resize-none
		 placeholder:text-slate-500;
		&.state-succeeded {
			@apply bg-green-100 border-green-200;
		}
		&.state-failed {
			@apply bg-red-100 border-red-200;
		}
	}
	button.submit {
		@apply rounded-xl p-6 py-4 text-xl
		 ring-transparent outline-none border-slate-200 border-4 border-l-0 rounded-l-none bg-slate-200;
		&.state-succeeded {
			@apply bg-green-200 border-green-200;
		}
		&.state-failed {
			@apply bg-red-200 border-red-200;
		}
		&:hover {
			filter: brightness(0.95);
		}
	}
	.cheats button {
		@apply p-1 rounded-none text-sm m-1;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(5px);
		}
		50% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
