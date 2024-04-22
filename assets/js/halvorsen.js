'use strict'

// Define global variables
let a = 1.4
let timestep = 0.005
let n = 2000
let scale = 12
let tracer1, tracer2
let history1 = []
let history2 = []
const historyLength = n
let drawmode = 'dotline'
let gridrotation = 0.0025
let gridAngle = 0

let isSpinning = true
let isPaused = false
let pauseclicks = 0
let fc = 0

function setup () {
  createCanvas(1250, 1000, WEBGL)
  background(200)
  colorMode(HSB)
  camera(200, -200, 500, 0, 0, 0, 0, 1, 0)
  perspective(PI / 3, 1, 5 * sqrt(3), 500 * sqrt(3))

  //   normalMaterial()
  specularMaterial(50)
  init()
  frameRate = 30
}

//   const canvasElement = document.querySelector('canvas')

//   if (canvasElement) {
//     canvasElement.addEventListener(
//       'wheel',
//       function (event) {
//         event.preventDefault()
//       },
//       { passive: false }
//     )
//   } else {
//     console.error('Canvas element not found!')
//   }
// }

function init () {
  // Initialize points
  tracer1 = createVector(1.0, 0.0, 0.0)
  tracer2 = createVector(1.5, 0.0, 0.0)
  history1 = []
  history2 = []
}

function drawGrid () {
  push()
  stroke(255)
  strokeWeight(1)
  rotateY(gridAngle)
  for (let i = -200; i <= 200; i += 20) {
    line(i, 125, -200, i, 125, 200) // Lines in z-direction
    line(-200, 125, i, 200, 125, i) // Lines in x-direction
  }
  pop()
}

function drawAxes () {
  const len = 100 // Length of each axis
  push()
  rotateY(gridAngle)
  translate(-200, 120, -200)

  // X-axis in red
  stroke(0, 100, 100)
  line(0, 0, 0, len, 0, 0)
  push()
  translate(len + 5, 0, 0)
  rotateZ(-HALF_PI)
  text('X', 0, 0)
  pop()

  // Y-axis in green
  stroke(120, 100, 100)
  line(0, 0, 0, 0, -len, 0)
  push()
  translate(0, len + 5, 0)
  text('Y', 0, 0)
  pop()

  // Z-axis in blue
  stroke(270, 100, 100)
  line(0, 0, 0, 0, 0, len)
  push()
  translate(0, 0, len + 5)
  rotateX(HALF_PI)
  text('Z', 0, 0)
  pop()

  pop()
}

// Executed at framerate
// draw is called automatically and should never be called
// controlled with noLoop(), redraw(), and loop()
function draw () {
  background(0)

  orbitControl()
  let locX = mouseX - height / 2
  let locY = mouseY - width / 2
  ambientLight(250, 100, 50, 0.5)
  pointLight(190, 70, 40, locX, locY, -100)

  //   let scale = 10

  // Calculate new positions based on some dynamics (placeholders here)
  if (!isPaused) {
    gridAngle += gridrotation

    updateTracers(tracer1)
    updateTracers(tracer2)

    // Update history for each tracer
    updateHistory(tracer1, history1)
    updateHistory(tracer2, history2)
  }

  drawGrid()
  drawAxes()

  // Draw lines for the history of each tracer
  drawHistory(history1, scale, drawmode)
  drawHistory(history2, scale, drawmode)

  //   Draw the current point
  //   stroke(frameCount % 361, 255, 255)
  //   strokeWeight(5)
  //   point(tracer1.x * scale, tracer1.z * scale, tracer1.y * scale)
  //   point(tracer2.x * scale, tracer2.z * scale, tracer2.y * scale)
}

function updateTracers (tracer) {
  let x = tracer.x,
    y = tracer.y,
    z = tracer.z

  // Calculate the deltas according to the Halvorsen attractor equations
  let dx = -a * x - 4 * y - 4 * z - y * y
  let dy = -a * y - 4 * z - 4 * x - z * z
  let dz = -a * z - 4 * x - 4 * y - x * x

  tracer.set(x + timestep * dx, y + timestep * dy, z + timestep * dz)
}

function updateHistory (tracer, history) {
  history.push({ x: tracer.x, y: tracer.y, z: tracer.z })
  if (history.length > historyLength) {
    history.shift() // Remove the oldest element to maintain a fixed length
  }
}

function drawHistory (history, scale, drawmode) {
  rotateY(gridAngle)
  if (drawmode === 'dotline') {
    for (let i = 0; i < history.length; i++) {
      let current = history[i]
      // Assign a new HSB color for each point
      stroke(i % 361, 100, 100) // Change the multiplier or add frameCount if you want dynamic colors
      strokeWeight(5) // Make sure points are visible
      point(current.x * scale, current.z * scale, current.y * scale)
    }
  } else if (drawmode === 'ribbon') {
    beginShape(LINES)
    for (let i = 1; i < history.length; i++) {
      let prev = history[i - 1]
      let current = history[i]
      stroke(frameCount % 361, 100, 100)
      vertex(prev.x * scale, prev.z * scale, prev.y * scale)
      vertex(current.x * scale, current.z * scale, current.y * scale)
    }
    endShape()
  } else if (drawmode === 'fast') {
    stroke(50, 100, 100)
    beginShape(TRIANGLES)
    for (let i = 1; i < history.length / 2; i++) {
      let prev = history[i - 1]
      let current = history[i]

      vertex(prev.x * scale, prev.z * scale, prev.y * scale)
      vertex(current.x * scale, current.z * scale, current.y * scale)
      //   vertex(
      //     ((prev.x + current.x) / 2) * scale,
      //     ((prev.z + current.z) / 2) * scale,
      //     ((prev.y + current.y) / 2) * scale
      //   )
    }
    endShape()
  }
}

// ###############################[ BUTTONS ]############################### //

// ###############################[ Pause ]############################### //
document.getElementById('pause-btn').addEventListener('click', function () {
  pauseclicks++
  const button = this

  if (isPaused) {
    isPaused = false
    gridrotation = 0.0025
    button.style.backgroundColor = '#4CAF50'
    loop()
  } else {
    isPaused = true
    gridrotation = 0
    button.style.backgroundColor = '#f44336'
    noLoop()
  }
})

// ###############################[ Reset 'a' ]############################### //
document.getElementById('reset-btn').addEventListener('click', function () {
  const a_slider = document.getElementById('a-slider')
  const a_output = document.getElementById('a-value')
  const s_slider = document.getElementById('s-slider')
  const s_output = document.getElementById('s-value')
  a = 1.4
  scale = 12
  a_slider.value = a.toString()
  s_slider.value = scale.toString()
  a_output.textContent = a.toFixed(2)
  s_output.textContent = scale.toFixed(2)

  clear()
  background(0)
  init()
})

// ###############################[ Update 'a' ]############################### //
document.getElementById('update-btn').addEventListener('click', function () {
  const a_slider = document.getElementById('a-slider')
  const a_output = document.getElementById('a-value')
  const s_slider = document.getElementById('s-slider')
  const s_output = document.getElementById('s-value')
  a = parseFloat(a_slider.value)
  a_output.textContent = a.toFixed(2)

  scale = parseFloat(s_slider.value)
  s_output.textContent = scale.toFixed(2)

  clear()
  background(0)
  init()
})

// ###############################[ Draw mode ]############################### //
document.getElementById('draw-mode-btn').addEventListener('click', function () {
  const toggleButton = this
  if (drawmode === 'dotline') {
    drawmode = 'ribbon'
    toggleButton.textContent = 'Switch to Fast Mode'
  } else if (drawmode === 'ribbon') {
    drawmode = 'fast'
    if (isSpinning) {
        gridrotation = 0.006
      } else {
        gridrotation = 0
      }
    toggleButton.textContent = 'Switch to Line Mode'
  } else if (drawmode === 'fast') {
    if (isSpinning) {
      gridrotation = 0.0025
    } else {
      gridrotation = 0
    }
    drawmode = 'dotline'
    toggleButton.textContent = 'Switch to Ribbon Mode'
  }
})

// ###############################[ Rotation ]############################### //
document.getElementById('rotation-btn').addEventListener('click', function () {
  const toggleButton = this
  if (isSpinning) {
    gridrotation = 0
    toggleButton.textContent = 'Unfreeze Rotation'
  } else {
    gridrotation = 0.0025
    toggleButton.textContent = 'Freeze Rotation'
  }
  isSpinning = !isSpinning
})

// ###############################[ H Slider ]############################### //
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('a-slider')
  const output = document.getElementById('a-value')

  // Function to update the slider text to match slider
  const updateValue = () =>
    (output.textContent = parseFloat(slider.value).toFixed(2))

  // Set event listener
  updateValue()
  slider.addEventListener('input', updateValue)
})

// ###############################[ Scale Slider ]############################### //
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('s-slider')
  const output = document.getElementById('s-value')

  // Function to update the slider text to match slider
  const updateValue = () =>
    (output.textContent = parseFloat(slider.value).toFixed(2))

  // Set event listener
  updateValue()
  slider.addEventListener('input', updateValue)
})

// ###############################[ Skip to Half ]############################### //
document
  .getElementById('skip-half-btn')
  .addEventListener('click', function () {})

// ###############################[ Skip to End ]############################### //
document
  .getElementById('skip-end-btn')
  .addEventListener('click', function () {})
