export async function molToSVG() {
    const content =
        `Methane
  OpenBabel07080916093D

  5  4  0  0  0  0  0  0  0  0999 V2000
    0.5288    0.1610    0.9360 H   0  0  0  0  0
    0.0000    0.0000    0.0000 C   0  0  0  0  0
    0.2051    0.8240   -0.6786 H   0  0  0  0  0
    0.3346   -0.9314   -0.4496 H   0  0  0  0  0
  -1.0685   -0.0537    0.1922 H   0  0  0  0  0
  1  2  1  0  0  0
  2  3  1  0  0  0
  2  4  1  0  0  0
  2  5  1  0  0  0
M  END
  `.split("\n").reverse();

  console.table(content)
  
  const name = content.pop();
  content.pop();
  content.pop();

  const [nAtoms, nBounds] = content.pop()?.trim().split(/\s+/).map(v=>parseInt(v)) || [0, 0, 0]
  
  console.log(name, nAtoms, nBounds);


  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");


  for (let i = 0; i < nAtoms; i++) {
    const [x,y,z, symbol] = content.pop()?.trim().split(/\s+/) as string[];
    console.log(x,y,z,symbol)

    //const element = document.createElement("text")
    const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    element.setAttribute("x", (parseFloat(x) *10).toString());
    element.setAttribute("y", (parseFloat(y) *10).toString());
    element.textContent= symbol.toString();

    svg.appendChild(element)
  }

  console.log(svg.outerHTML)
}