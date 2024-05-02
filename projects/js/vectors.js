let field

function setup () {
  createCanvas(800, 600)
  particles = []
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)))
  }
  field = new VectorField() // Ensure that the field is initialized
}

function draw () {
  background(51)
  drawVectorField()
  for (let particle of particles) {
    let force = field.calculate(particle.pos.x, particle.pos.y)
    particle.applyForce(force)
    particle.update()
    particle.display()
  }
}

class Particle {
  constructor (x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.acc = createVector(0, 0)
  }

  applyForce (force) {
    this.acc.add(force)
  }

  update () {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0) // Reset acceleration after applying it
  }

  display () {
    stroke(200)
    fill(127)
    ellipse(this.pos.x, this.pos.y, 10)
  }
}

class VectorField {
  constructor () {
    this.type = 'gravity' // defaults
    this.k = 1
    this.theta = 0
  }

  setField (type) {
    this.type = type
  }
  setK (k) {
    this.k = k
  }

  setTheta (theta) {
    this.theta = theta
  }

  calculate (x, y) {
    switch (this.type) {
      case 'gravity':
        return this.gravity()
      case 'wind':
        return this.wind()
      case 'curly':
        return this.curly(x, y)
      case 'away':
        return this.away(x, y)
      case 'damped':
        return this.damped(x, y)
      case 'bonus':
        return this.bonus(x, y)
      default:
        return createVector(0, 1)
    }
  }

  gravity () {
    // Example: Simple downward gravity
    return createVector(0, 0.5)
  }

  gravity (x, y) {
    return createVector(x, y)
  }

  wind () {
    // Example: Wind blowing to the right
    return createVector(0.5, 0)
  }
  wind (x, y) {
    return createVector(x, y)
  }

  curly (x, y) {
    let k = this.k
    let o = this.theta
    let u = -k * y * np.cos(o) + k * x * np.sin(o)
    let v = k * x * np.cos(o) + k * y * np.sin(o)
    return createVector(u, v)
  }

  away (x, y) {
    let k = this.k
    let o = this.theta
    u = -k * y * np.cos(o) - k * x * np.sin(o)
    v = -k * x * np.cos(o) + k * y * np.sin(o)
    return createVector(u, v)
  }

  damped (x, y) {
    let gravity_constant = 0.1
    let damping_factor = 0.5
    let epsilon = 1e-6
    let origin_x = 0
    let origin_y = 0
    let min_distance = 1e-10

    let distance = np.sqrt((x - origin_x) ** 2 + (y - origin_y) ** 2)
    let scaled_distance = np.maximum(distance, min_distance)
    let scaled_distance_cubed = (scaled_distance + epsilon) ** 3

    let u =
      y -
      x -
      (gravity_constant * (x - origin_x)) / scaled_distance_cubed -
      damping_factor * y
    let v =
      -x -
      y -
      (gravity_constant * (y - origin_y)) / scaled_distance_cubed +
      damping_factor * x

    return createVector(u, v)
  }

  bonus_gravity (x, y) {
    let gravity_constant = 0.5
    let origin_x = (origin_y = 0)

    let distance = np.sqrt((x - origin_x) ** 2 + (y - origin_y) ** 2)
    let u = y - x - (gravity_constant * (x - origin_x)) / distance ** 3
    let v = -x - y - (gravity_constant * (y - origin_y)) / distance ** 3
    return createVector(u, v)
  }
}

function drawVectorField () {
  const cols = width / 20
  const rows = height / 20
  const scale = 1

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * 20 + 10
      const y = j * 20 + 10
      let vector = field.calculate(x, y)
      drawArrow(x, y, vector.heading(), vector.mag() * scale * 20)
    }
  }
}

function drawArrow (x, y, angle, length) {
  const arrowSize = 4
  push()
  translate(x, y)
  rotate(angle)
  stroke(255, 100)
  strokeWeight(2)
  line(0, 0, length, 0)
  line(length, 0, length - arrowSize, -arrowSize)
  line(length, 0, length - arrowSize, arrowSize)
  pop()
}

// function vectorField (x, y) {
//   // Placeholder for a simple circular field
//   let v = createVector(y - height / 2, -(x - width / 2))
//   v.normalize() // Normalize to get direction
//   v.mult(0.5) // Scale the vector
//   return v
// }
