// Taken from https://github.com/wwwtyro/speck/blob/gh-pages/src/elements.js
export type ElementInfo = {
    symbol: string;
    name: string;
    mass: number;
    radius: number;
    color: number[];
    number: number;
}

export const elements: { [key: string]: ElementInfo } = {
    'Xx': { 'symbol': 'Xx', 'name': 'unknown', 'mass': 1.00000000, 'radius': 1.0000, 'color': [1.000, 0.078, 0.576], 'number': 0 },
    'H': { 'symbol': 'H', 'name': 'hydrogen', 'mass': 1.00794000, 'radius': 0.3100, 'color': [1.000, 1.000, 1.000], 'number': 1 },
    'He': { 'symbol': 'He', 'name': 'helium', 'mass': 4.00260200, 'radius': 0.2800, 'color': [0.851, 1.000, 1.000], 'number': 2 },
    'Li': { 'symbol': 'Li', 'name': 'lithium', 'mass': 6.94100000, 'radius': 1.2800, 'color': [0.800, 0.502, 1.000], 'number': 3 },
    'Be': { 'symbol': 'Be', 'name': 'beryllium', 'mass': 9.01218200, 'radius': 0.9600, 'color': [0.761, 1.000, 0.000], 'number': 4 },
    'B': { 'symbol': 'B', 'name': 'boron', 'mass': 10.81100000, 'radius': 0.8400, 'color': [1.000, 0.710, 0.710], 'number': 5 },
    'C': { 'symbol': 'C', 'name': 'carbon', 'mass': 12.01070000, 'radius': 0.7300, 'color': [0.565, 0.565, 0.565], 'number': 6 },
    'N': { 'symbol': 'N', 'name': 'nitrogen', 'mass': 14.00670000, 'radius': 0.7100, 'color': [0.188, 0.314, 0.973], 'number': 7 },
    'O': { 'symbol': 'O', 'name': 'oxygen', 'mass': 15.99940000, 'radius': 0.6600, 'color': [1.000, 0.051, 0.051], 'number': 8 },
    'F': { 'symbol': 'F', 'name': 'fluorine', 'mass': 18.99840320, 'radius': 0.5700, 'color': [0.565, 0.878, 0.314], 'number': 9 },
    'Ne': { 'symbol': 'Ne', 'name': 'neon', 'mass': 20.17970000, 'radius': 0.5800, 'color': [0.702, 0.890, 0.961], 'number': 10 },
    'Na': { 'symbol': 'Na', 'name': 'sodium', 'mass': 22.98976928, 'radius': 1.6600, 'color': [0.671, 0.361, 0.949], 'number': 11 },
    'Mg': { 'symbol': 'Mg', 'name': 'magnesium', 'mass': 24.30500000, 'radius': 1.4100, 'color': [0.541, 1.000, 0.000], 'number': 12 },
    'Al': { 'symbol': 'Al', 'name': 'aluminum', 'mass': 26.98153860, 'radius': 1.2100, 'color': [0.749, 0.651, 0.651], 'number': 13 },
    'Si': { 'symbol': 'Si', 'name': 'silicon', 'mass': 28.08550000, 'radius': 1.1100, 'color': [0.941, 0.784, 0.627], 'number': 14 },
    'P': { 'symbol': 'P', 'name': 'phosphorus', 'mass': 30.97376200, 'radius': 1.0700, 'color': [1.000, 0.502, 0.000], 'number': 15 },
    'S': { 'symbol': 'S', 'name': 'sulfur', 'mass': 32.06500000, 'radius': 1.0500, 'color': [1.000, 1.000, 0.188], 'number': 16 },
    'Cl': { 'symbol': 'Cl', 'name': 'chlorine', 'mass': 35.45300000, 'radius': 1.0200, 'color': [0.122, 0.941, 0.122], 'number': 17 },
    'Ar': { 'symbol': 'Ar', 'name': 'argon', 'mass': 39.94800000, 'radius': 1.0600, 'color': [0.502, 0.820, 0.890], 'number': 18 },
    'K': { 'symbol': 'K', 'name': 'potassium', 'mass': 39.09830000, 'radius': 2.0300, 'color': [0.561, 0.251, 0.831], 'number': 19 },
    'Ca': { 'symbol': 'Ca', 'name': 'calcium', 'mass': 40.07800000, 'radius': 1.7600, 'color': [0.239, 1.000, 0.000], 'number': 20 },
    'Sc': { 'symbol': 'Sc', 'name': 'scandium', 'mass': 44.95591200, 'radius': 1.7000, 'color': [0.902, 0.902, 0.902], 'number': 21 },
    'Ti': { 'symbol': 'Ti', 'name': 'titanium', 'mass': 47.86700000, 'radius': 1.6000, 'color': [0.749, 0.761, 0.780], 'number': 22 },
    'V': { 'symbol': 'V', 'name': 'vanadium', 'mass': 50.94150000, 'radius': 1.5300, 'color': [0.651, 0.651, 0.671], 'number': 23 },
    'Cr': { 'symbol': 'Cr', 'name': 'chromium', 'mass': 51.99610000, 'radius': 1.3900, 'color': [0.541, 0.600, 0.780], 'number': 24 },
    'Mn': { 'symbol': 'Mn', 'name': 'manganese', 'mass': 54.93804500, 'radius': 1.3900, 'color': [0.611, 0.478, 0.780], 'number': 25 },
    'Fe': { 'symbol': 'Fe', 'name': 'iron', 'mass': 55.84500000, 'radius': 1.3200, 'color': [0.878, 0.400, 0.200], 'number': 26 },
    'Co': { 'symbol': 'Co', 'name': 'cobalt', 'mass': 58.69340000, 'radius': 1.2600, 'color': [0.941, 0.565, 0.627], 'number': 27 },
    'Ni': { 'symbol': 'Ni', 'name': 'nickel', 'mass': 58.93319500, 'radius': 1.2400, 'color': [0.314, 0.816, 0.314], 'number': 28 },
    'Cu': { 'symbol': 'Cu', 'name': 'copper', 'mass': 63.54600000, 'radius': 1.3200, 'color': [0.784, 0.502, 0.200], 'number': 29 },
    'Zn': { 'symbol': 'Zn', 'name': 'zinc', 'mass': 65.38000000, 'radius': 1.2200, 'color': [0.490, 0.502, 0.690], 'number': 30 },
    'Ga': { 'symbol': 'Ga', 'name': 'gallium', 'mass': 69.72300000, 'radius': 1.2200, 'color': [0.761, 0.561, 0.561], 'number': 31 },
    'Ge': { 'symbol': 'Ge', 'name': 'germanium', 'mass': 72.64000000, 'radius': 1.2000, 'color': [0.400, 0.561, 0.561], 'number': 32 },
    'As': { 'symbol': 'As', 'name': 'arsenic', 'mass': 74.92160000, 'radius': 1.1900, 'color': [0.741, 0.502, 0.890], 'number': 33 },
    'Se': { 'symbol': 'Se', 'name': 'selenium', 'mass': 78.96000000, 'radius': 1.2000, 'color': [1.000, 0.631, 0.000], 'number': 34 },
    'Br': { 'symbol': 'Br', 'name': 'bromine', 'mass': 79.90400000, 'radius': 1.2000, 'color': [0.651, 0.161, 0.161], 'number': 35 },
    'Kr': { 'symbol': 'Kr', 'name': 'krypton', 'mass': 83.79800000, 'radius': 1.1600, 'color': [0.361, 0.722, 0.820], 'number': 36 },
    'Rb': { 'symbol': 'Rb', 'name': 'rubidium', 'mass': 85.46780000, 'radius': 2.2000, 'color': [0.439, 0.180, 0.690], 'number': 37 },
    'Sr': { 'symbol': 'Sr', 'name': 'strontium', 'mass': 87.62000000, 'radius': 1.9500, 'color': [0.000, 1.000, 0.000], 'number': 38 },
    'Y': { 'symbol': 'Y', 'name': 'yttrium', 'mass': 88.90585000, 'radius': 1.9000, 'color': [0.580, 1.000, 1.000], 'number': 39 },
    'Zr': { 'symbol': 'Zr', 'name': 'zirconium', 'mass': 91.22400000, 'radius': 1.7500, 'color': [0.580, 0.878, 0.878], 'number': 40 },
    'Nb': { 'symbol': 'Nb', 'name': 'niobium', 'mass': 92.90638000, 'radius': 1.6400, 'color': [0.451, 0.761, 0.788], 'number': 41 },
    'Mo': { 'symbol': 'Mo', 'name': 'molybdenum', 'mass': 95.96000000, 'radius': 1.5400, 'color': [0.329, 0.710, 0.710], 'number': 42 },
    'Tc': { 'symbol': 'Tc', 'name': 'technetium', 'mass': 98.00000000, 'radius': 1.4700, 'color': [0.231, 0.620, 0.620], 'number': 43 },
    'Ru': { 'symbol': 'Ru', 'name': 'ruthenium', 'mass': 101.07000000, 'radius': 1.4600, 'color': [0.141, 0.561, 0.561], 'number': 44 },
    'Rh': { 'symbol': 'Rh', 'name': 'rhodium', 'mass': 102.90550000, 'radius': 1.4200, 'color': [0.039, 0.490, 0.549], 'number': 45 },
    'Pd': { 'symbol': 'Pd', 'name': 'palladium', 'mass': 106.42000000, 'radius': 1.3900, 'color': [0.000, 0.412, 0.522], 'number': 46 },
    'Ag': { 'symbol': 'Ag', 'name': 'silver', 'mass': 107.86820000, 'radius': 1.4500, 'color': [0.753, 0.753, 0.753], 'number': 47 },
    'Cd': { 'symbol': 'Cd', 'name': 'cadmium', 'mass': 112.41100000, 'radius': 1.4400, 'color': [1.000, 0.851, 0.561], 'number': 48 },
    'In': { 'symbol': 'In', 'name': 'indium', 'mass': 114.81800000, 'radius': 1.4200, 'color': [0.651, 0.459, 0.451], 'number': 49 },
    'Sn': { 'symbol': 'Sn', 'name': 'tin', 'mass': 118.71000000, 'radius': 1.3900, 'color': [0.400, 0.502, 0.502], 'number': 50 },
    'Sb': { 'symbol': 'Sb', 'name': 'antimony', 'mass': 121.76000000, 'radius': 1.3900, 'color': [0.620, 0.388, 0.710], 'number': 51 },
    'Te': { 'symbol': 'Te', 'name': 'tellurium', 'mass': 127.60000000, 'radius': 1.3800, 'color': [0.831, 0.478, 0.000], 'number': 52 },
    'I': { 'symbol': 'I', 'name': 'iodine', 'mass': 126.90470000, 'radius': 1.3900, 'color': [0.580, 0.000, 0.580], 'number': 53 },
    'Xe': { 'symbol': 'Xe', 'name': 'xenon', 'mass': 131.29300000, 'radius': 1.4000, 'color': [0.259, 0.620, 0.690], 'number': 54 },
    'Cs': { 'symbol': 'Cs', 'name': 'cesium', 'mass': 132.90545190, 'radius': 2.4400, 'color': [0.341, 0.090, 0.561], 'number': 55 },
    'Ba': { 'symbol': 'Ba', 'name': 'barium', 'mass': 137.32700000, 'radius': 2.1500, 'color': [0.000, 0.788, 0.000], 'number': 56 },
    'La': { 'symbol': 'La', 'name': 'lanthanum', 'mass': 138.90547000, 'radius': 2.0700, 'color': [0.439, 0.831, 1.000], 'number': 57 },
    'Ce': { 'symbol': 'Ce', 'name': 'cerium', 'mass': 140.11600000, 'radius': 2.0400, 'color': [1.000, 1.000, 0.780], 'number': 58 },
    'Pr': { 'symbol': 'Pr', 'name': 'praseodymium', 'mass': 140.90765000, 'radius': 2.0300, 'color': [0.851, 1.000, 0.780], 'number': 59 },
    'Nd': { 'symbol': 'Nd', 'name': 'neodymium', 'mass': 144.24200000, 'radius': 2.0100, 'color': [0.780, 1.000, 0.780], 'number': 60 },
    'Pm': { 'symbol': 'Pm', 'name': 'promethium', 'mass': 145.00000000, 'radius': 1.9900, 'color': [0.639, 1.000, 0.780], 'number': 61 },
    'Sm': { 'symbol': 'Sm', 'name': 'samarium', 'mass': 150.36000000, 'radius': 1.9800, 'color': [0.561, 1.000, 0.780], 'number': 62 },
    'Eu': { 'symbol': 'Eu', 'name': 'europium', 'mass': 151.96400000, 'radius': 1.9800, 'color': [0.380, 1.000, 0.780], 'number': 63 },
    'Gd': { 'symbol': 'Gd', 'name': 'gadolinium', 'mass': 157.25000000, 'radius': 1.9600, 'color': [0.271, 1.000, 0.780], 'number': 64 },
    'Tb': { 'symbol': 'Tb', 'name': 'terbium', 'mass': 158.92535000, 'radius': 1.9400, 'color': [0.189, 1.000, 0.780], 'number': 65 },
    'Dy': { 'symbol': 'Dy', 'name': 'dysprosium', 'mass': 162.50000000, 'radius': 1.9200, 'color': [0.122, 1.000, 0.780], 'number': 66 },
    'Ho': { 'symbol': 'Ho', 'name': 'holmium', 'mass': 164.93032000, 'radius': 1.9200, 'color': [0.000, 1.000, 0.612], 'number': 67 },
    'Er': { 'symbol': 'Er', 'name': 'erbium', 'mass': 167.25900000, 'radius': 1.8900, 'color': [0.000, 0.902, 0.459], 'number': 68 },
    'Tm': { 'symbol': 'Tm', 'name': 'thulium', 'mass': 168.93421000, 'radius': 1.9000, 'color': [0.000, 0.831, 0.322], 'number': 69 },
    'Yb': { 'symbol': 'Yb', 'name': 'ytterbium', 'mass': 173.05400000, 'radius': 1.8700, 'color': [0.000, 0.749, 0.220], 'number': 70 },
    'Lu': { 'symbol': 'Lu', 'name': 'lutetium', 'mass': 174.96680000, 'radius': 1.8700, 'color': [0.000, 0.671, 0.141], 'number': 71 },
    'Hf': { 'symbol': 'Hf', 'name': 'hafnium', 'mass': 178.49000000, 'radius': 1.7500, 'color': [0.302, 0.761, 1.000], 'number': 72 },
    'Ta': { 'symbol': 'Ta', 'name': 'tantalum', 'mass': 180.94788000, 'radius': 1.7000, 'color': [0.302, 0.651, 1.000], 'number': 73 },
    'W': { 'symbol': 'W', 'name': 'tungsten', 'mass': 183.84000000, 'radius': 1.6200, 'color': [0.129, 0.580, 0.839], 'number': 74 },
    'Re': { 'symbol': 'Re', 'name': 'rhenium', 'mass': 186.20700000, 'radius': 1.5100, 'color': [0.149, 0.490, 0.671], 'number': 75 },
    'Os': { 'symbol': 'Os', 'name': 'osmium', 'mass': 190.23000000, 'radius': 1.4400, 'color': [0.149, 0.400, 0.588], 'number': 76 },
    'Ir': { 'symbol': 'Ir', 'name': 'iridium', 'mass': 192.21700000, 'radius': 1.4100, 'color': [0.090, 0.329, 0.529], 'number': 77 },
    'Pt': { 'symbol': 'Pt', 'name': 'platinum', 'mass': 195.08400000, 'radius': 1.3600, 'color': [0.816, 0.816, 0.878], 'number': 78 },
    'Au': { 'symbol': 'Au', 'name': 'gold', 'mass': 196.96656900, 'radius': 1.3600, 'color': [1.000, 0.820, 0.137], 'number': 79 },
    'Hg': { 'symbol': 'Hg', 'name': 'mercury', 'mass': 200.59000000, 'radius': 1.3200, 'color': [0.722, 0.722, 0.816], 'number': 80 },
    'Tl': { 'symbol': 'Tl', 'name': 'thallium', 'mass': 204.38330000, 'radius': 1.4500, 'color': [0.651, 0.329, 0.302], 'number': 81 },
    'Pb': { 'symbol': 'Pb', 'name': 'lead', 'mass': 207.20000000, 'radius': 1.4600, 'color': [0.341, 0.349, 0.380], 'number': 82 },
    'Bi': { 'symbol': 'Bi', 'name': 'bismuth', 'mass': 208.98040000, 'radius': 1.4800, 'color': [0.620, 0.310, 0.710], 'number': 83 },
    'Po': { 'symbol': 'Po', 'name': 'polonium', 'mass': 210.00000000, 'radius': 1.4000, 'color': [0.671, 0.361, 0.000], 'number': 84 },
    'At': { 'symbol': 'At', 'name': 'astatine', 'mass': 210.00000000, 'radius': 1.5000, 'color': [0.459, 0.310, 0.271], 'number': 85 },
    'Rn': { 'symbol': 'Rn', 'name': 'radon', 'mass': 220.00000000, 'radius': 1.5000, 'color': [0.259, 0.510, 0.588], 'number': 86 },
    'Fr': { 'symbol': 'Fr', 'name': 'francium', 'mass': 223.00000000, 'radius': 2.6000, 'color': [0.259, 0.000, 0.400], 'number': 87 },
    'Ra': { 'symbol': 'Ra', 'name': 'radium', 'mass': 226.00000000, 'radius': 2.2100, 'color': [0.000, 0.490, 0.000], 'number': 88 },
    'Ac': { 'symbol': 'Ac', 'name': 'actinium', 'mass': 227.00000000, 'radius': 2.1500, 'color': [0.439, 0.671, 0.980], 'number': 89 },
    'Th': { 'symbol': 'Th', 'name': 'thorium', 'mass': 231.03588000, 'radius': 2.0600, 'color': [0.000, 0.729, 1.000], 'number': 90 },
    'Pa': { 'symbol': 'Pa', 'name': 'protactinium', 'mass': 232.03806000, 'radius': 2.0000, 'color': [0.000, 0.631, 1.000], 'number': 91 },
    'U': { 'symbol': 'U', 'name': 'uranium', 'mass': 237.00000000, 'radius': 1.9600, 'color': [0.000, 0.561, 1.000], 'number': 92 },
    'Np': { 'symbol': 'Np', 'name': 'neptunium', 'mass': 238.02891000, 'radius': 1.9000, 'color': [0.000, 0.502, 1.000], 'number': 93 },
    'Pu': { 'symbol': 'Pu', 'name': 'plutonium', 'mass': 243.00000000, 'radius': 1.8700, 'color': [0.000, 0.420, 1.000], 'number': 94 },
    'Am': { 'symbol': 'Am', 'name': 'americium', 'mass': 244.00000000, 'radius': 1.8000, 'color': [0.329, 0.361, 0.949], 'number': 95 },
    'Cm': { 'symbol': 'Cm', 'name': 'curium', 'mass': 247.00000000, 'radius': 1.6900, 'color': [0.471, 0.361, 0.890], 'number': 96 },
    'Bk': { 'symbol': 'Bk', 'name': 'berkelium', 'mass': 247.00000000, 'radius': 1.6600, 'color': [0.541, 0.310, 0.890], 'number': 97 },
    'Cf': { 'symbol': 'Cf', 'name': 'californium', 'mass': 251.00000000, 'radius': 1.6800, 'color': [0.631, 0.212, 0.831], 'number': 98 },
    'Es': { 'symbol': 'Es', 'name': 'einsteinium', 'mass': 252.00000000, 'radius': 1.6500, 'color': [0.702, 0.122, 0.831], 'number': 99 },
    'Fm': { 'symbol': 'Fm', 'name': 'fermium', 'mass': 257.00000000, 'radius': 1.6700, 'color': [0.702, 0.122, 0.729], 'number': 100 },
    'Md': { 'symbol': 'Md', 'name': 'mendelevium', 'mass': 258.00000000, 'radius': 1.7300, 'color': [0.702, 0.051, 0.651], 'number': 101 },
    'No': { 'symbol': 'No', 'name': 'nobelium', 'mass': 259.00000000, 'radius': 1.7600, 'color': [0.741, 0.051, 0.529], 'number': 102 },
    'Lr': { 'symbol': 'Lr', 'name': 'lawrencium', 'mass': 262.00000000, 'radius': 1.6100, 'color': [0.780, 0.000, 0.400], 'number': 103 },
    'Rf': { 'symbol': 'Rf', 'name': 'rutherfordium', 'mass': 261.00000000, 'radius': 1.5700, 'color': [0.800, 0.000, 0.349], 'number': 104 },
    'Db': { 'symbol': 'Db', 'name': 'dubnium', 'mass': 262.00000000, 'radius': 1.4900, 'color': [0.820, 0.000, 0.310], 'number': 105 },
    'Sg': { 'symbol': 'Sg', 'name': 'seaborgium', 'mass': 266.00000000, 'radius': 1.4300, 'color': [0.851, 0.000, 0.271], 'number': 106 },
    'Bh': { 'symbol': 'Bh', 'name': 'bohrium', 'mass': 264.00000000, 'radius': 1.4100, 'color': [0.878, 0.000, 0.220], 'number': 107 },
    'Hs': { 'symbol': 'Hs', 'name': 'hassium', 'mass': 277.00000000, 'radius': 1.3400, 'color': [0.902, 0.000, 0.180], 'number': 108 },
    'Mt': { 'symbol': 'Mt', 'name': 'meitnerium', 'mass': 268.00000000, 'radius': 1.2900, 'color': [0.922, 0.000, 0.149], 'number': 109 },
    'Ds': { 'symbol': 'Ds', 'name': 'Ds', 'mass': 271.00000000, 'radius': 1.2800, 'color': [0.922, 0.000, 0.149], 'number': 110 },
    'Uuu': { 'symbol': 'Uuu', 'name': 'Uuu', 'mass': 272.00000000, 'radius': 1.2100, 'color': [0.922, 0.000, 0.149], 'number': 111 },
    'Uub': { 'symbol': 'Uub', 'name': 'Uub', 'mass': 285.00000000, 'radius': 1.2200, 'color': [0.922, 0.000, 0.149], 'number': 112 },
    'Uut': { 'symbol': 'Uut', 'name': 'Uut', 'mass': 284.00000000, 'radius': 1.3600, 'color': [0.922, 0.000, 0.149], 'number': 113 },
    'Uuq': { 'symbol': 'Uuq', 'name': 'Uuq', 'mass': 289.00000000, 'radius': 1.4300, 'color': [0.922, 0.000, 0.149], 'number': 114 },
    'Uup': { 'symbol': 'Uup', 'name': 'Uup', 'mass': 288.00000000, 'radius': 1.6200, 'color': [0.922, 0.000, 0.149], 'number': 115 },
    'Uuh': { 'symbol': 'Uuh', 'name': 'Uuh', 'mass': 292.00000000, 'radius': 1.7500, 'color': [0.922, 0.000, 0.149], 'number': 116 },
    'Uus': { 'symbol': 'Uus', 'name': 'Uus', 'mass': 294.00000000, 'radius': 1.6500, 'color': [0.922, 0.000, 0.149], 'number': 117 },
    'Uuo': { 'symbol': 'Uuo', 'name': 'Uuo', 'mass': 296.00000000, 'radius': 1.5700, 'color': [0.922, 0.000, 0.149], 'number': 118 },
}