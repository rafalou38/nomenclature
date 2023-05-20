<div class="h-screen grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-2 p-2">
	<a href="/familles" aria-disabled class="link">Familles</a>
	<a href="/prefix" class="link">Préfixes</a>
	<a href="/nom" aria-disabled class="link">Nomenclature</a>
</div>

<style lang="postcss">
	.link {
		@apply grid place-items-center bg-slate-200 hover:bg-slate-300 cursor-pointer sm:text-3xl text-3xl rounded-md font-bold;
	}
	.link[aria-disabled] {
		pointer-events: none;
		opacity: 0.75;
	}
</style>
