import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();

let book;
let mixer;

const loader = new GLTFLoader();
loader.load('/Palm Education/bookObject.glb',
    function (gltf) {
        book = gltf.scene;
        book.position.z = -20;
        book.rotation.y = 1;

        // first phase
        book.position.x = 2.8;
        book.position.y = .4;
        book.rotation.x = -0.5;
        book.rotation.y = 0.5;

        scene.add(book);

        mixer = new THREE.AnimationMixer(book);
        mixer.clipAction(gltf.animations[0]).play();

    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500,500,500);
scene.add(topLight);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.005);

    

};
reRender3D();