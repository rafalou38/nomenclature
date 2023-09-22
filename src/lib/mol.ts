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

  const [nAtoms, nBounds] = content.pop()?.trim().split(/\s+/).map(v => parseInt(v)) || [0, 0, 0]

  console.log(name, nAtoms, nBounds);


  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  let xMin = Infinity;
  let xMax = 0;
  let yMin = Infinity;
  let yMax = 0;
  for (let i = 0; i < nAtoms; i++) {
    const [xRaw, yRaw, zRaw, symbol] = content.pop()?.trim().split(/\s+/) as string[];
    const [x, y, z] = [xRaw, yRaw, zRaw].map(n => parseFloat(n) * 10)
    // console.log(x, y, z, symbol)

    xMin = Math.min(xMin, x);
    yMin = Math.min(yMin, y);
    xMax = Math.max(xMax, x);
    yMax = Math.max(yMax, y);

    //const element = document.createElement("text")
    const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    element.setAttribute("x", x.toString());
    element.setAttribute("y", y.toString());
    element.setAttribute("font-size", (2 + (z / 10)).toString())
    element.textContent = symbol.toString();

    svg.appendChild(element)
  }

  svg.setAttribute("viewBox", [xMin - 2, yMin - 2, Math.abs(xMin) + xMax + 4, Math.abs(yMin) + yMax + 4].map(n => Math.round(n)).join(" "))

  console.log(svg.outerHTML)
}