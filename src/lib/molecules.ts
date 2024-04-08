export type Molecule = {
    name: string[],
    smiles: string,
    groups: string[],
    external: boolean
}
export type MoleculeRef = [string[], string[], string, number, boolean]
// Term:     https://www.lelivrescolaire.fr/page/18368819
// Permiere: https://www.lelivrescolaire.fr/page/6693210
// export const molecules: MoleculeRef[] = [
//     [["Alcane"], ["Méthane"], "C", 1],
//     [["Alcane"], ["Ethane"],  "CC", 1],
//     [["Alcane"], ["Propane"], "CCC", 1],
//     [["Alcane"], ["Butane"],  "CCCC", 1],
//     [["Alcane"], ["Pentane"], "CCCCC", 1],
//     [["Alcane"], ["Hexane"],  "CCCCCC", 1],
//     [["Alcane"], ["2-méthylbutane"], "CCC(C)C", 1],
//     [["Alcane"], ["3-propylhexane"], "CCC(CCC)CCC", 1],
//     [["Alcane"], ["2,2-diméthylbutane"], "CC(C)(C)CC", 1],
//     [["Alcane"], ["2,5-diméthylhexane"], "CC(C)CCC(C)C", 1],
//     [["Alcane"], ["3-éthyl-2-méthylpropane", "2-méthyl-3-éthylpropane"], "CC(C)C(CC)CC", 1],

//     [["Alcool"], ["Méthanol", "1-méthanol", "méthane-1-ol"], "CO", 1],
//     [["Alcool"], ["Propanol", "1-propanol", "propane-1-ol"], "CCCO", 1],
//     [["Alcool"], ["2-propanol", "propane-2-ol"], "CC(O)C", 1],
//     [["Alcool"], ["Ethanediol", "Ethane-1,2-diol",], "OCCO", 1],
//     [["Alcool"], ["Ethanediol", "Ethane-1,2-diol",], "C(O)C(O)CO", 1],
//     [["Alcool"], ["Propane-1,2,3-triol"], "C(O)C(O)CO", 1],
//     [["Alcool","Alcane"], ["2-Méthylpropan-2-ol"], "CC(C)(C)O", 1],
//     [["Alcool", "Amine"], ["2-Aminoéthanol"], "NCCO", 1],


//     // [["Alcool"], ["1-ol-Ethanol"],  "OCCO", 1],

//