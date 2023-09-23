export type Molecule = {
    name: string,
    smiles: string,
    groups: string[]
}
export type MoleculeRef = [string[], string]
export const molecules: MoleculeRef[] = [
    [["alcohols", "amines"], "2-Aminoethanol"],
    [["alcohols"], "2-Methylbutan-2-ol"],
    [["alcohols"], "2-Methylpropan-1-ol"],
    [["alcohols"], "2-Methylpropan-2-ol"],
    [["alcohols", "alkynes"], "But-2-yne-1_4-diol"],
    [["alcohols"], "Butan-1-ol"],
    [["alcohols"], "Ethane-1_2-diol"],
    [["alcohols"], "Ethanol"],
    [["alcohols"], "Hexan-1-ol"],
    [["alcohols"], "Methanol"],
    [["alcohols"], "Octan-1-ol"],
    [["alcohols"], "Pentan-1-ol"],
    [["alcohols"], "Pentan-3-ol"],
    [["alcohols"], "Propan-1-ol"],
    [["alcohols"], "Propan-2-ol"],
    [["alcohols"], "Propane-1_2_3-triol"],
]