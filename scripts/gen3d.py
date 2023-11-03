from rdkit import Chem
from rdkit.Chem import AllChem
import re
import os

import json


try:
    os.makedirs("./static/3d-files/")
except:
    pass
print("Generating 3D files...")

with open("./src/lib/data/molecules.json", "r") as f:
    molecules = json.load(f)["molecules"]
    print(f"Found {len(molecules)} molecules.")

for molecule in molecules:
    mol = Chem.MolFromSmiles(molecule[2])
    mol = Chem.AddHs(mol)
    AllChem.EmbedMolecule(mol)
    xyz = Chem.MolToXYZBlock(mol)

    # encode the name for filename support with regex
    name_fs = re.sub(r"[^a-zA-Z0-9]+", "_", molecule[1][0]).lower()

    print(f" - Generating {name_fs}.xyz")
    with open("./static/3d-files/" + name_fs + ".xyz", "w") as f:
        f.write(xyz)
