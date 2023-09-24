<script lang="ts">
	import { GetRDKit, renderSMILE } from '$lib/RDKit';
	import type { RDKitModule } from '@rdkit/rdkit';
	import postcss from 'postcss';
	import { onMount } from 'svelte';
	import { shuffleArray } from '../lib/utils';
	import { molecules, type Molecule, type MoleculeRef } from '$lib/molecules';

	let RDKit: RDKitModule;
	let svg = '';
	let input = '';

	let current: Molecule | null = null;

	let queue: MoleculeRef[] = [];

	let state: 'failed' | 'guessing' | 'succeeded' = 'guessing';

	async function next() {
		if (queue.length == 0) queue = shuffleArray(structuredClone(molecules)).filter((m) => m[3]);
		const ref = queue.pop()!;

		current = {
			groups: ref[0],
			name: ref[1].map((n) => n.toLowerCase()),
			smiles: ref[2]
		};

		svg = await renderSMILE(current.smiles);
	}

	function submit() {
		debugger;
		input = '';

		if (!current) return;
		if (state == 'guessing') {
			if (current.name.includes(input.toLowerCase())) {
				state = 'succeeded';
			} else {
				state = 'failed';
			}
		}

		setTimeout(() => {
			state = 'guessing';
			setTimeout(() => {
				EInput?.focus();
			}, 100);
		}, 5000);
	}

	onMount(async () => {
		next();
	});

	let EInput: HTMLTextAreaElement;
	$: if (state == 'guessing') {
		console.log('focus', EInput);
	}
</script>

<div class="flex flex-col h-screen">
	<div class="flex">
		<button class="grow" on:click={next}>Skip</button>
		<button class="grow"
			on:click={() => {
				state = 'succeeded';
			}}>Show</button
		>
	</div>
	<div class="mol-container mx-auto grow h-full flex flex-col items-center justify-center">
		<!-- {#if current} -->
		<span class="answer" class:shown={state != 'guessing'}>{current?.name[0]}</span>
		<!-- {/if} -->

		{#if svg}
			{@html svg}
		{/if}
	</div>

	<div class="flex w-full p-4">
		<textarea
			placeholder={{
				guessing: 'Entrer le nom de la molecule...',
				failed: 'Mauvaise réponse!',
				succeeded: "Bravo c'est la bonne réponse."
			}[state]}
			class="state-{state}"
			disabled={state != 'guessing'}
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
		<button on:click={submit} class="state-{state}">OK</button>
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
	button {
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
