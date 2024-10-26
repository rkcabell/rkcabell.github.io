import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//################### RENDERER SETUP ###################\\

//Renderer _ gltf/glb files
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace

//Size
// renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000)
const container = document.getElementById('three-container')
renderer.setSize(container.clientWidth, container.clientHeight)
container.appendChild(renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio)

//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Apply to html
document.body.appendChild(renderer.domElement)

//################### SCENE ###################\\

const scene = new THREE.Scene()

//fov - aspect - near - far
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
)
camera.position.set(4, 1, 5)

//################### ORBIT CONTROLS ###################\\

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan = false
controls.minDistance = 1.8
controls.maxDistance = 30
controls.minPolarAngle = 0.5
controls.maxPolarAngle = 1.68
controls.autoRotate = false
controls.target = new THREE.Vector3(0, 1, 0)
controls.update()

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32)
groundGeometry.rotateX(-Math.PI / 2)
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.castShadow = false
groundMesh.receiveShadow = true
scene.add(groundMesh)

const spotLight = new THREE.SpotLight(0xffffff, 2500, 100, 0.22, 1)
spotLight.position.set(0, 25, 0)
spotLight.castShadow = true
spotLight.shadow.bias = -0.0001
spotLight.penumbra = 0.7
scene.add(spotLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.18)
scene.add(ambientLight)

const loader = new GLTFLoader().setPath('assets/models/car/')
loader.load(
  'scene.gltf',
  gltf => {
    console.log('loading model')
    const mesh = gltf.scene

    mesh.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    mesh.position.set(0, 0.65, -1)
    scene.add(mesh)

    document.getElementById('progress-container').style.display = 'none'
  },
  xhr => {
    console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`)
  },
  error => {
    console.error(error)
  }
)

// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
})

function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
