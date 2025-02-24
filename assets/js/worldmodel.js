import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/controls/OrbitControls.js'

document.addEventListener('DOMContentLoaded', function () {
  // Select container
  const container = document.getElementById('three-container')

  // Scene, Camera, Renderer
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

    // Ambient Light - Softly lights everything
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft overall light
    scene.add(ambientLight);

    // Directional Light - Adds depth and shading
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create an "atmosphere" glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.32, 64, 64); // Slightly larger than main sphere
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x6699ff, // Light blue glow
        transparent: true,
        opacity: 0.2, // Adjust for desired glow strength
        side: THREE.BackSide // Makes the glow appear around the edges
    });
    const atmosphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(atmosphere);


  // Create Sphere
  const geometry = new THREE.SphereGeometry(1.3, 64, 64)
  const material = new THREE.MeshStandardMaterial()
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)
  
  // Load Initial Texture
  const textureLoader = new THREE.TextureLoader()
  function updateTexture(texturePath) {
    textureLoader.load(texturePath, function (newTexture) {
        sphere.material.map = newTexture;
        sphere.material.needsUpdate = true;
        console.log(`✅ Loaded texture: ${texturePath}`);
    }, undefined, function (error) {
        console.error("❌ Texture loading error:", error);
    });
  }

  // Load the default texture
  updateTexture("/assets/images/maps/default.png");

  // Handle Map Selection
  const mapSelector = document.getElementById("map-selector");
  if (mapSelector) {
      mapSelector.addEventListener("change", function (event) {
          updateTexture(event.target.value);
      });
  }

  // Camera Position
  camera.position.z = 2.5

  // Controls (Mouse Interaction)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true // Smooth movement

  // Resize Handler
  window.addEventListener('resize', () => {
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })

  // Animation Loop
  function animate () {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
})
