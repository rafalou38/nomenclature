import { browser } from "$app/environment";
import type { RDKitModule } from "@rdkit/rdkit";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


export async function GetRDKit(): Promise<RDKitModule> {
    if (!window.RDKit) {
        const RDKit = await
            window
                .initRDKitModule()
                .catch(() => {
                    console.log('Failed to load RDKIT');
                }) as RDKitModule;

        console.log('RDKit version: ' + RDKit.version());
        window.RDKit = RDKit;
    }

    return window.RDKit;
}



export async function renderSMILE(smiles: string) {
    const RDKit = await GetRDKit();

    // Create an RDKit molecule object
    const mol = RDKit.get_mol(smiles);
    mol?.add_hs();
    console.log(mol);


    return mol?.get_svg_with_highlights(
        JSON.stringify({
            // addAtomIndices: true
            explicitMethyl: true,
            // molDrawOptions: {
            //     circleAtoms: true
            // }
        })
    ) || 'Failed';

}