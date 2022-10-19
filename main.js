import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import ballMouse from './ball';

ballMouse()

// import Experience from './Experience/Experience';

// const experience = new Experience(document.querySelector('.canvas-container'))

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const loader = new GLTFLoader();

loader.load('/scene/proberaum_-_rehearsal_room.glb', (glb) => {
  // console.log(glb)
  const root = glb.scene;
  root.scale.set(4, 4, 4)
  root.position.set(0, -25, 0)
  root.rotation.set(0, -0.7, 0)

  scene.add(root);
  const rootGsaptl = gsap.timeline({ repeat: 0 });
  rootGsaptl.from(root.scale, { x: 0, y: 0, z: 0, duration: 15 })
    .to(root.scale, { x: 4, y: 4, z: 4 })

}, function (xhr) {
  const loadingProgress = xhr.loaded / xhr.total * 100 + "% loaded";
}, function (error) {
  console.error(error);
});


const light = new THREE.DirectionalLight(0xffffff, 1)
// const light = new THREE.AmbientLight( 0xffffff,0.6 );
// const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set(-1, 2, 2);
// light.scale.set(0.1,0.1,0.1)
// light.position.set(2,2,5)
scene.add(light);

// HELPER
// you can see where the light is coming from
// const lightHelper = new THREE.PointLightHelper(light)

// // you can see the orbit level
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(45, windowSize.width / windowSize.height, 0.1, 1000);
const cameraPosition = {
  // x: -150,
  // y: 19,
  // z: 179
  x: -202, y: 61, z: 97
}
// const cameraRotation = {
//   x: -0.2489262157770175,
//   y: -0.6603525735986122,
//   z: -0.154678631649775
// }
// camera.position.x = -120
// camera.position.y = 120
// camera.position.z = 160
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
// camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z)
// camera.up.set(0,5,0)
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});
const controlsCamera = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// window.addEventListener('click', () => {
//   console.log(camera.position)
// })

const gsaptl = gsap.timeline({ repeat: -1 });
gsaptl.from(camera.position, {
  x: cameraPosition.x,
  y: cameraPosition.y,
  z: cameraPosition.z, duration: 1
})
  .to(camera.position, { x: -103, y: 82, z: 208, duration: 10 })
  .to(camera.position, { x: -209, y: -2, z: 130, duration: 10 })
  .to(camera.position, { x: -115, y: 192, z: 60, duration: 10 })
  .to(camera.position, { x: -95, y: -5, z: 227, duration: 10 })
  .to(camera.position, {
    x: cameraPosition.x,
    y: cameraPosition.y,
    z: cameraPosition.z, duration: 10
  })

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
  console.log('resize');
  onWindowResize()
})


const animate = () => {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
  controlsCamera.update()

}
animate()

