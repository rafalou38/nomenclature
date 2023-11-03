<script lang="ts">
	import { randRange, shuffleArray } from '$lib/utils';

	const prefixes = ['Méth-', 'Éth-', 'Prop-', 'But-', 'Pent-', 'Hex-'];
	let pool: number[] = [];

	let challenge = 1;
	let challengeArray = shuffleArray(prefixes);
	let wrong = '';
	let valid = '';

	let succeeded = 0;
	let failed = 0;

	function reset() {
		if (pool.length == 0) pool = shuffleArray(new Array(6).fill(0).map((e, i) => i + 1));

		challenge = pool.pop() || 1;
		challengeArray = shuffleArray(prefixes);
		wrong = '';
		valid = '';
	}

	reset();

	function submit(prefix: string) {
		if (valid) return; // Challenge has not ben reset

		const choice = prefixes.indexOf(prefix);

		valid = prefixes[challenge - 1];

		failed = Math.max(0, failed * 0.9 - 0.05);
		succeeded = Math.max(0, succeeded * 0.9 - 0.05);

		if (choice + 1 != challenge) {
			wrong = prefixes[choice];
			setTimeout(reset, 1000 * 2);
			failed++;
		} else {
			succeeded++;
			setTimeout(reset, 1000);
		}
	}

	$: console.log(succeeded, failed, succeeded / (failed + succeeded));
</script>

<div class="wrapper h-screen grid">
	<div class="h-2 overflow-hidden bg-slate-200 flex items-stretch">
		<div
			class="bg-green-600 grow-0 shrink-0"
			style="width: {(succeeded / (failed + succeeded)) * 100}%"
		/>
		<div
			class="bg-red-600 grow-0 shrink-0"
			style="width: {(failed / (failed + succeeded)) * 100}%"
		/>
	</div>
	<div class="grid place-items-center text-8xl font-black">{challenge}</div>
	<div class="grid grid-cols-3 gap-2 p-2">
		{#each challengeArray as prefix, i}
			<button
				class="grid place-items-center bg-slate-200 hover:bg-slate-300 cursor-pointer sm:text-3xl text-xl rounded-md font-bold"
				class:valid={valid == prefix}
				class:wrong={wrong == prefix}
				on:click={() => submit(prefix)}
				on:touchend={() => submit(prefix)}
			>
				{prefix}
			</button>
		{/each}
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
</style>
