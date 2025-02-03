import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'

// Example Imports
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { vertexShader } from './static/gridVertexShader.js'

// Render Settings
const sizes = {
    width: 800,
    height: 600
}

// Scene Properties
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
const camera = new THREE.OrthographicCamera()
//const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(sizes.width, sizes.height)
renderer.antialias = true
scene.background = new THREE.Color(0x2B2A32)


// const gui = new GUI()
// const debugGUI = {
//     x: 1,
//     y: 1,
//     z: 1,
//     rotX: 1,
//     rotY: 1,
// }

// gui.add(debugGUI, 'x', -10.0, 10.0, 0.01).listen().onChange( function(a) { camera.position.x = a; } )
// gui.add(debugGUI, 'y', -10.0, 10.0, 0.01).listen().onChange( function(a) { camera.position.y = a; } )
// gui.add(debugGUI, 'z', -10.0, 10.0, 0.01).listen().onChange( function(a) { camera.position.z = a; } )
// gui.add(debugGUI, 'rotX', -10.0, 10.0, 0.01).listen().onChange( function(a) { camera.rotation.x = a; } )
// gui.add(debugGUI, 'rotY', -10.0, 10.0, 0.01).listen().onChange( function(a) { camera.rotation.y = a; } )

//controls.enableDamping = true

camera.position.set(0.47, 1.3559, 2.84277)
camera.lookAt(1.0053711578618532, 0.5909762397184678, -0.32925362047597867)

// Object
new FontLoader().load(
    'static/fonts/Bebas_Neue_Regular.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'ryan',
            {
                font: font,
                size: 0.4,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        const mesh = new THREE.Mesh(
            textGeometry,
            //new THREE.MeshToonMaterial({ color: 0x5f00ff })
            //new THREE.MeshNormalMaterial()
            new THREE.MeshBasicMaterial({ wireframe: true })
        )

        mesh.scale.x *= 1.2

        scene.add(mesh)
        gsap.to(mesh.position, {
            duration: 3,
            delay: 0,
            y: 1,
            ease: "elastic.out(1, 0.5)",
            repeat: -1,
            yoyo: true,
            yoyoEase: true
        })
    }
)

// const gridHelper = new THREE.GridHelper( 10, 60 );
// scene.add(gridHelper);
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    //new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true })
    new THREE.ShaderMaterial({
        uniforms: {

        },
        vertexShader: vertexShader,
    })
);
plane.position.y -= 0.0
plane.rotation.set(Math.PI / 2, 0, 0);
scene.add(plane);

const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)

const clock = new THREE.Clock()
const tick = () => {
    const now = Date.now()
    const deltaTime = clock.getElapsedTime()

    // pointLight.position.x = Math.sin( (now * 0.00025) * 7 ) * 50;
	// pointLight.position.y = Math.cos( (now * 0.00025) * 5 ) * 100;
	// pointLight.position.z = Math.cos( (now * 0.00025) * 3 ) * 50;

    //console.log(camera)
    //console.log(controls)

    //controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

scene.add (
    camera,
    pointLight,
    ambientLight,
    //new THREE.AxesHelper(),
    //new THREE.AmbientLight( 0xc1c1c1, 3 )
)
tick()
