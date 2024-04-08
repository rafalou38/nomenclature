<script lang="ts">
	import { onMount } from 'svelte';
	import { randRange, shuffleArray } from '$lib/utils';
	import { instance } from '@viz-js/viz';

	import { exercices, type Exercice } from './lewis';
	import HomeButton from '$lib/components/HomeButton.svelte';

	let responsesPossible = shuffleArray(exercices);
	let challengeArray = shuffleArray(exercices);
	let challenge: Exercice | null;
	let wrong: Exercice | null;
	let valid: Exercice | null;

	let succeeded = 0;
	let failed = 0;

	let EChallengeNode: SVGElement;

	function reset() {
		if (challengeArray.length == 0) challengeArray = shuffleArray(exercices);

		challenge = challengeArray.pop() || null;
		if (!challenge) throw new Error('Reset: Got nothing from pop');

		responsesPossible = shuffleArray(exercices);

		wrong = null;
		valid = null;

		instance().then(function (viz) {
			if (!challenge) throw new Error('Reset: challenge is null');

			let result = viz.renderSVGElement(shuffleArray(challenge.codes)[0], {
				engine: challenge.engine
			});
			EChallengeNode.innerHTML = result.innerHTML;
			EChallengeNode.classList.remove('loaded');

			setTimeout(() => {
				const g = EChallengeNode.children[0];
				EChallengeNode.setAttribute(
					'width',
					(Math.round(g?.getBoundingClientRect().width) || 10).toString()
				);
				EChallengeNode.setAttribute(
					'height',
					(Math.round(g?.getBoundingClientRect().height) || 10).toString()
				);
				EChallengeNode.classList.add('loaded');
			}, 510);
		});
	}

	onMount(() => {
		reset();
	});

	function submit(response: Exercice) {
		if (valid) return;

		valid = challenge;

		failed = Math.max(0, failed * 0.9 - 0.05);
		succeeded = Math.max(0, succeeded * 0.9 - 0.05);

		if (challenge?.family != response.family) {
			wrong = response;
			setTimeout(reset, 1000 * 2);
			failed++;

			if (challenge) challengeArray.push(challenge);
		} else {
			succeeded++;
			setTimeout(reset, 1000);
		}
	}
</script>

<HomeButton />

<svg class="loaded" style="display: none;"></svg>
<div class="wrapper h-screen grid">
	<div class="h-2 overflow-hidden bg-slate-200 flex items-stretch">
		<div
			class="bg-green-600 grow-0 shrink-0 transition-all"
			style="width: {(succeeded / (failed + succeeded)) * 100}%"
		/>
		<div
			class="bg-red-600 grow-0 shrink-0 transition-all"
			style="width: {(failed / (failed + succeeded)) * 100}%"
		/>
	</div>
	<div class="grid place-items-center text-8xl">
		<!-- {challenge} -->

		<svg bind:this={EChallengeNode}></svg>
	</div>
	<div class="grid grid-cols-3 md:grid-cols-4 gap-2 p-2">
		{#each responsesPossible as exercice, i}
			<button
				class="grid place-items-center bg-slate-200 hover:bg-slate-300 cursor-pointer sm:text-3xl text-xl rounded-md font-bold"
				class:valid={valid?.family == exercice.family}
				class:wrong={wrong?.family == exercice.family}
				on:click={() => submit(exercice)}
				on:touchend={() => submit(exercice)}
			>
				{exercice.family}
			</button>
		{/each}
			<button
				class="grid place-items-center bg-slate-200 sm:text-3xl text-xl rounded-md font-bold"
				disabled
			>
			</button>
	</div>
</div>

<style lang="postcss">
	.wrapper {
		grid-template-rows: auto 1fr 1fr;
	}
	.valid {
		@apply pointer-events-none bg-green-600 text-white;
	}
	.wrong {
		@apply pointer-events-none bg-red-600 text-white;
	}

	svg {
		pointer-events: none;
		user-select: none;
	}
	svg:not(.loaded) {
		opacity: 0;

		/* Return */
		/* transition: opacity ease 0.1s; */
	}
	svg.loaded {
		opacity: 1;
		scale: 2.5;

		/* Load */
		transition: all ease 0.5s;
	}

	@media (max-width: 700px) {
		svg.loaded {
			scale: 1.5;
		}
	}
	@media (max-width: 300px) {
		svg.loaded {
			scale: 1.5;
		}
	}
</style>
