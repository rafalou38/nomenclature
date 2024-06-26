import type { RDKitModule } from "@rdkit/rdkit";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		RDKit: RDKitModule | undefined
	}
}

export { };
