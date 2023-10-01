from rdkit import Chem
from rdkit.Chem import AllChem

# mol = Chem.MolFromSmiles("[H]C([H])([H])C")
# params = Chem.SmilesParserParams()
# params.removeHs = False

# mol = Chem.MolFromSmiles("[H]C([H])([H])C", params)
# AllChem.EmbedMolecule(mol)
# xyz = Chem.MolToXYZBlock(mol)

mol = Chem.MolFromSmiles("CC(C)CCC(C)C")
mol = Chem.AddHs(mol)
AllChem.EmbedMolecule(mol)
xyz = Chem.MolTo(mol)


print(xyz)
