import * as THREE from 'three'
import gsap from 'gsap'

// Example Imports
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import funt from 'three/examples/fonts/gentilis_regular.typeface.json'

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
new FontLoader().load(
    funt,
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'wat de fack',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        scene.add(
            new THREE.Mesh(
                textGeometry,
                new THREE.MeshToonMaterial({ color: 0xff0000 })
            )
        )

        // gsap.to(mesh.position, {
        //     duration: 3,
        //     delay: 0,
        //     y: 1,
        //     ease: "elastic.out(1, 0.3)",
        //     repeat: -1,
        //     yoyo: true,
        //     yoyoEase: true
        // })
    }
)

const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0)

const clock = new THREE.Clock()
const tick = () => {
    const now = Date.now()
    const deltaTime = clock.getElapsedTime()

    pointLight.position.x = Math.sin( (now * 0.00025) * 7 ) * 50;
	pointLight.position.y = Math.cos( (now * 0.00025) * 5 ) * 100;
	pointLight.position.z = Math.cos( (now * 0.00025) * 3 ) * 50;

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

scene.add (
    camera,
    pointLight,
    new THREE.AxesHelper(),
    //new THREE.AmbientLight( 0xc1c1c1, 3 )
)
tick()