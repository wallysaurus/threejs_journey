import * as THREE from 'three'
import gsap from 'gsap'

// Example Imports
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Render Settings
const sizes = {
    width: 800,
    height: 600
}

// Scene Properties
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(sizes.width, sizes.height)
controls.enableDamping = true

camera.position.set(0, 0, 3)

// Object
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5), // geometry
    new THREE.MeshToonMaterial({ color: 0xff0000 }) // materials
)

const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0)

// Animation

gsap.to(mesh.position, {
    duration: 3,
    delay: 0,
    y: 1,
    ease: "elastic.out(1, 0.3)",
    repeat: -1,
    yoyo: true,
    yoyoEase: true
})

const clock = new THREE.Clock()
const tick = () => {
    const now = Date.now()
    const deltaTime = clock.getElapsedTime()

    pointLight.position.x = Math.sin( (now * 0.00025) * 7 ) * 300;
	pointLight.position.y = Math.cos( (now * 0.00025) * 5 ) * 400;
	pointLight.position.z = Math.cos( (now * 0.00025) * 3 ) * 300;

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

scene.add (
    camera,
    mesh,
    pointLight,
    new THREE.AxesHelper(),
    new THREE.AmbientLight( 0xc1c1c1, 3 )
)
tick()