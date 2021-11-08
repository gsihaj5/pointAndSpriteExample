import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

let container = document.getElementById('container');
let camera, scene, renderer, controls;

//object
let cube;
let point;

init();
animate();

//let showingPoint = true;
//container.addEventListener('click', () => {
//if (showingPoint) {
//scene.remove(point);
//showingPoint = false;
//} else {
//scene.add(point);
//showingPoint = true;
//}
//});

function init() {
    scene = new THREE.Scene();
    initCamera();
    initRenderer();

    controls = new OrbitControls(camera, renderer.domElement);

    initCube();

    initPoint();

    initSprite();

    var light = new THREE.PointLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);
}

function initSprite() {
    let image = new THREE.TextureLoader().load('assets/icecrystal.png');
    let material = new THREE.SpriteMaterial({map: image});

    let sprite = new THREE.Sprite(material);
    scene.add(sprite);
    sprite.position.set(0, 2, 0);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function initPoint() {
    let image = new THREE.TextureLoader().load('assets/icecrystal.png');
    const material = new THREE.PointsMaterial({color: 0x888888, map: image});
    point = new THREE.Points(cube.geometry, material);
    point.material.size = 0.2;
    scene.add(point);
}

function initCube() {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({color: 0xff0000});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100,
    );
    camera.position.set(5, 5, 5);
}

function update() {
    cube.rotation.y += 0.05;

    controls.update();
    renderer.render(scene, camera);
}

function animate() {
    update();
    requestAnimationFrame(animate);
}
