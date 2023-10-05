import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { assert } from './utils';
import { elements, type ElementInfo } from './data/elements';

export interface Molecule3D {
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
    private molecules: Molecule3D[] = [];
    controls: OrbitControls;
    pointLight: THREE.PointLight;

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
        this.renderer.setClearColor( 0xffffff, 1 );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        // this.controls.autoRotate = true;
        // this.controls.autoRotateSpeed = 4;

        this.renderer.setAnimationLoop(animation);

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        function animation(time) {
            // mesh.rotation.x = time / 2000;
            // mesh.rotation.y = time / 1000;
            // if(self.pointLight)
            // self.pointLight.position.x = 5 + time/10000;
        // self.pointLight.position
        

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

    displayXYZ(data: string) {
        this.resetScene();
        this.molecules = [];

        // Parse the xyz data
        const lines = data.split('\n').reverse();
        const n = parseInt(assert(lines.pop(), 'Invalid xyz file'));
        lines.pop();



        for (let i = 0; i < n; i++) {
            const info = assert(lines.pop())
            assert(info, 'Invalid xyz file');
            assert(info, 'Invalid xyz file');

            const [label, x, y, z] = assert(info.split(/[\s\t]+/));

            if(!elements[label]){
                console.log(label, "Is unknown");
                continue;
            }

            const molecule = {
                label,
                x: parseFloat(x),
                y: parseFloat(y),
                z: parseFloat(z),
                element: elements[label]
            }
            this.molecules.push(molecule);


            const geometry = new THREE.SphereGeometry(molecule.element.radius/7, 32, 16);
            const [r,g,b] = molecule.element.color;
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(r,g,b),     // Set the base color
                shininess: 0,      // Adjust the shininess to control reflectivity
                specular: 0x222222   // Set the color of the specular highlight
            });




            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(molecule.x / 6, molecule.y / 6, molecule.z / 6);
            this.scene.add(mesh);
        }
        console.log(this.molecules);
    }
}