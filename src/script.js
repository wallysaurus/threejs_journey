import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
const camera = new THREE.OrthographicCamera()
//const controls = new OrbitControls(camera, renderer.domElement)
// const gui = new GUI({ width: 340 })

renderer.setSize(sizes.width, sizes.height)
scene.background = new THREE.Color(0x2B2A32)

camera.position.set(0.47, 1.3559, 2.84277)
camera.lookAt(1.0053711578618532, 0.5909762397184678, -0.32925362047597867)

// Water Shader
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.02 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.823 },

        uSmallWavesElevation: { value: 0.059 },
        uSmallWavesFrequency: { value: 8.029 },
        uSmallWavesSpeed: { value: 0.576 },
        uSmallIterations: { value: 4 },

        uDepthColor: { value: new THREE.Color(0x186691) },
        uSurfaceColor: { value: new THREE.Color(0x9bd8ff) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 }
    }
});
const water = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 51, 51),
    waterMaterial
)
water.rotation.x = - Math.PI * 0.5
water.scale.set(0.1, 0.2, 0.0)
water.position.set(0.66, 0.4, 0.1)

new FontLoader().load(
    '/fonts/Bebas_Neue_Regular.json',
    (font) =>
    {
        const mesh = new THREE.Mesh(
            new TextGeometry(
                "ryan",
                {
                    font: font,
                    size: 0.4,
                    depth: 0.2,
                    curveSegments: 12,
                    bevelEnabled: false,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            ),
            new THREE.MeshBasicMaterial({ wireframe: true })
        )

        mesh.scale.x *= 1.2
        scene.add(mesh)

    }
)

const gltfLoader = new GLTFLoader()

gltfLoader.load(
	// resource URL
	'/models/shark.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene.children[0] );

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );
        console.log(error);

	}
);
// gltfLoader.load(
//     './shark 2.gltf',
//     (gltf) =>
//     {
//         console.log('success')
//         console.log(gltf)
//         scene.add(gltf.scene)
//     },
//     (progress) =>
//     {
//         console.log('progress')
//         console.log(progress)
//     },
//     (error) =>
//     {
//         console.log('error')
//         console.log(error)
//     }
// )

const pointLight = new THREE.PointLight(0xffffff, 2, 800, 0)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)

const clock = new THREE.Clock()
const tick = () => {
    const now = Date.now()
    const deltaTime = clock.getElapsedTime()

    //controls.update()
    const elapsedTime = clock.getElapsedTime()

    // Water
    waterMaterial.uniforms.uTime.value = elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

// Debug
// gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
// gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
// gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
// gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')
// gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
// gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
// gui.close()

scene.add (
    camera,
    pointLight,
    ambientLight,
    water,
)
tick()
