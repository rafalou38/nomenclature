<div class="h-screen grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-2 p-2">
	<a href="/prefix" class="link"><span class="font-black text-4xl">1</span> Préfixes</a>
	<a href="/familles" class="link"><span class="font-black text-4xl">2</span> Familles</a>
	<a href="#" aria-disabled class="link"><span class="font-black text-4xl">3</span> Nomenclature</a>
</div>

<style lang="postcss">
	.link {
		@apply flex flex-col items-center gap-6 justify-center bg-slate-200 hover:bg-slate-300 cursor-pointer sm:text-3xl text-3xl rounded-md font-bold;
	}
	.link[aria-disabled] {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
