// Import styles
import './style.css'

// Your JavaScript code here 
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Setup renderer first
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

// Add resize listener
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Studio Lighting Setup
// Main key light (directional light)
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Fill light (hemisphere light)
const fillLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
scene.add(fillLight);

// Ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Rim light for edge highlighting
const rimLight = new THREE.PointLight(0xffffff, 1);
rimLight.position.set(-5, 3, -5);
scene.add(rimLight);

// High intensity directional light
const intenseLight = new THREE.DirectionalLight(0xffffff, 2.5);
intenseLight.position.set(-3, 4, 2);
scene.add(intenseLight);

let loader = new THREE.TextureLoader();
let color = loader.load('/text/color.jpg', undefined, undefined, (error) => {
    console.error('Error loading color texture:', error);
});
let roughness = loader.load('/text/roughness.jpg', undefined, undefined, (error) => {
    console.error('Error loading roughness texture:', error);
});
let normal = loader.load('/text/normal.png', undefined, undefined, (error) => {
    console.error('Error loading normal texture:', error);
});

const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );
const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, normalMap: normal } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// GUI Setup
const gui = new dat.GUI();

// Material Settings
const materialFolder = gui.addFolder('Material Settings');
materialFolder.add(material, 'roughness', 0, 1, 0.01).name('Roughness');
materialFolder.add(material, 'metalness', 0, 1, 0.01).name('Metalness');

// Handle normalScale properly
const normalScaleFolder = materialFolder.addFolder('Normal Scale');
normalScaleFolder.add(material.normalScale, 'x', 0, 2, 0.01).name('X');
normalScaleFolder.add(material.normalScale, 'y', 0, 2, 0.01).name('Y');

materialFolder.addColor({ color: '#ffffff' }, 'color').onChange((value) => {
    material.color.set(value);
}).name('Color Tint');

// Mesh Settings
const meshFolder = gui.addFolder('Mesh Settings');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
meshFolder.add(cube.scale, 'x', 0.1, 3, 0.1).name('Scale X');
meshFolder.add(cube.scale, 'y', 0.1, 3, 0.1).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0.1, 3, 0.1).name('Scale Z');

// Lighting Settings
const lightingFolder = gui.addFolder('Lighting Settings');
lightingFolder.add(keyLight, 'intensity', 0, 5, 0.1).name('Key Light');
lightingFolder.add(fillLight, 'intensity', 0, 2, 0.1).name('Fill Light');
lightingFolder.add(ambientLight, 'intensity', 0, 2, 0.1).name('Ambient Light');
lightingFolder.add(rimLight, 'intensity', 0, 5, 0.1).name('Rim Light');
lightingFolder.add(intenseLight, 'intensity', 0, 5, 0.1).name('Intense Light');

// Open all folders by default
materialFolder.open();
meshFolder.open();
lightingFolder.open();

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

  }

animate();

