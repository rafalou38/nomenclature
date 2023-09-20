const base =
    `node [shape = circle; penwidth = 0; fontname = "sans-serif"];
     rankdir = LR;`


export interface Exercice {
    engine: string;
    family: string;
    group: string;
    codes: string[];
}
export const exercices: Exercice[] = [
    {
        engine: "dot",
        family: "Alcool",
        group: "Hydroxyle",
        codes: [
            `graph LewisStructure {
                ${base}
                R--OH;
            }`,
            `graph LewisStructure {
                ${base}
                R--O--H;
            }`,
        ]
    },
    {
        engine: "fdp",
        family: "Cétone",
        group: "Carbonyle",
        codes: [
            `graph LewisStructure {
                ${base}

                R1 -- C -- R2;
                C--O
                C--O
            }`
        ]
    },
    {
        engine: "dot",
        family: "Aldéhyde",
        group: "Carbonyle",
        codes: [
            `graph LewisStructure {
                ${base}

                I [style=invis]
                O [label="O"];
                H [label="H"];
                C [label="C"];
                
                I -- C -- H;
                O -- C;
                O -- C;
                {rank=same; O; C}
            }`
        ]
    },
    {
        engine: "dot",
        family: "Alkyle",
        group: "Alkyle",
        codes: [
            `graph LewisStructure {
                ${base}

                I [style = invis;];
                R1 [label="R"]
                R2 [label="R"]
                C1 [label="CH"]
                C2 [label="CH2"]

                I -- C2 [style=dashed]
                R1 -- C1 -- R2
                C2 -- C1
                {rank=same; I; C2; C1}
            }`
        ]
    },
    {
        engine: "dot",
        family: "Amine primaire",
        group: "Amine",
        codes: [
            `graph LewisStructure {
                ${base}

                H1 [label = "H";];
                I [style = invis;];
                H2 [label = "H";];
                R [label = "R";];
                N [label = "N";];
                
                N -- I [style = invis;];
                R -- N;
                N -- H1;
                N -- H2;
            }`
        ]
    },
    {
        engine: "dot",
        family: "Ester",
        group: "Ester",
        codes: [
            `graph LewisStructure {
                ${base}

                    R1 [label=""];
                    R2 [label="R"];
                    C [label="C"];
                    O1 [label="O"];
                    I [style=invis];
                    O2 [label="O"];
                    
                    R1 -- C;
                    O2 -- R2;


                    C -- O2;

                    C -- I [style=invis];
                    
                    C -- O1 [constraint=false];
                    C -- O1;

                    {rank=same; O1; I; O2;}
            }`
        ]
    },
    {
        engine: "dot",
        family: "Acide carboxylique",
        group: "carboxyle",
        codes: [
            `graph LewisStructure {
                ${base}

                R1 [label=""];
                H [label="H"];
                C [label="C"];
                O1 [label="O"];
                I [style=invis];
                O2 [label="O"];
                
                R1 -- C;
                O2 -- H;


                C -- O2;

                C -- I [style=invis];
                
                C -- O1 [constraint=false];
                C -- O1;

                {rank=same; O1; I; O2;}
            }`,
            `graph LewisStructure {
                ${base}

                R1 [label=""];

                C [label="C"];
                O1 [label="O"];
                I [style=invis];
                O2 [label="OH"];
                
                R1 -- C;



                C -- O2;

                C -- I [style=invis];
                
                C -- O1 [constraint=false];
                C -- O1;

                {rank=same; O1; I; O2;}
            }`
        ]
    },
]


