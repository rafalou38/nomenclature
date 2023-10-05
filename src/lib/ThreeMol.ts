import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { assert } from './utils';
import { elements, type ElementInfo } from './data/elements';

export interface Atom3D {
    label: string;
    x: number;
    y: number;
    z: number;
    element: ElementInfo
}


export class ThreeMolRenderer {

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private atoms: Atom3D[] = [];
    private controls: OrbitControls;
    private pointLight: THREE.PointLight | undefined;

    constructor(canvas: HTMLCanvasElement) {

        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.01,
            10
        );
        this.camera.position.z = 1;


        this.scene = new THREE.Scene();


        // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        // const material = new THREE.MeshNormalMaterial();

        // const mesh = new THREE.Mesh(geometry, material);
        // this.scene.add(mesh);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setClearColor(0xffffff, 1);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 4;

        this.renderer.setAnimationLoop(animation);

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        function animation() {
            // mesh.rotation.x = time / 2000;
            // mesh.rotation.y = time / 1000;
            // if(self.pointLight)
            // self.pointLight.position.x = 5 + time/10000;
            // self.pointLight.position
            //console.log(self.camera.position, self.pointLight?.position)
            if (self.pointLight) {

                self.pointLight.position.set(
                    self.camera.position.x * 8,
                    self.camera.position.y * 8,
                    self.camera.position.z * 8,
                ).setLength(7)
            }

            self.controls.update();
            self.renderer.render(self.scene, self.camera);
        }
    }
    private resetScene() {
        this.scene.clear();
        const ambientLight = new THREE.AmbientLight(0xaeaeae, 2);
        this.scene.add(ambientLight);

        this.pointLight = new THREE.PointLight(0xFFFFFF, 80);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        // this.scene.fog = new THREE.Fog(0xFFFFFF, 10, 15);
    }

    resize(width: number, height: number) {
        this.renderer.setSize(width, height);
    }

    addAom(atom: Atom3D) {
        this.atoms.push(atom);

        const geometry = new THREE.SphereGeometry(atom.element.radius / 7, 64, 64);
        const [r, g, b] = atom.element.color;
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(r, g, b),     // Set the base color
            shininess: 0,      // Adjust the shininess to control reflectivity
            specular: 0x222222   // Set the color of the specular highlight
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(atom.x / 6, atom.y / 6, atom.z / 6);
        this.scene.add(mesh);
    }


    connectAtoms(atomOrigin: Atom3D, atomTarget: Atom3D) {
        const posOrigin = new THREE.Vector3(
            atomOrigin.x / 6,
            atomOrigin.y / 6,
            atomOrigin.z / 6,
        )
        const posTarget = posOrigin.clone().lerp(new THREE.Vector3(
            atomTarget.x / 6,
            atomTarget.y / 6,
            atomTarget.z / 6,
        ), 0.5);
        const curve = new THREE.CatmullRomCurve3([posOrigin, posTarget]);

        const geometry = new THREE.TubeGeometry(curve, 20, atomOrigin.element.radius / 30, 32);
        const [r, g, b] = atomOrigin.element.color;
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(r, g, b),     // Set the base color
            shininess: 0,      // Adjust the shininess to control reflectivity
            specular: 0x222222   // Set the color of the specular highlight
        });

        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    displayXYZ(data: string) {
        this.resetScene();
        this.atoms = [];

        // Parse the xyz data
        const lines = data.split('\n').reverse();
        const n = parseInt(assert(lines.pop(), 'Invalid xyz file'));
        lines.pop();

        for (let i = 0; i < n; i++) {
            const info = assert(lines.pop())
            assert(info, 'Invalid xyz file');

            const [label, x, y, z] = assert(info.split(/[\s\t]+/));

            if (!elements[label]) {
                console.log(label, "Is unknown");
                continue;
            }

            const atom = {
                label,
                x: parseFloat(x),
                y: parseFloat(y),
                z: parseFloat(z),
                element: elements[label]
            }
            this.addAom(atom);
        }

        for (const atomOrigin of this.atoms) {
            for (const atomTarget of this.atoms) {
                if (atomOrigin == atomTarget) continue;
                const dist = Math.sqrt(
                    Math.pow((atomOrigin.x - atomTarget.x), 2) +
                    Math.pow((atomOrigin.y - atomTarget.y), 2) +
                    Math.pow((atomOrigin.z - atomTarget.z), 2),
                );

                const connectDist = elements[atomOrigin.label].radius + elements[atomTarget.label].radius;
                if (connectDist >= (dist * 0.9)) {
                    //console.log(atomOrigin.label, atomTarget.label, connectDist, dist);
                    this.connectAtoms(atomOrigin, atomTarget);
                }
            }
        }
    }

}