
"use strict";

// Define global variables
let a = 1.4;
let timestep = 0.005;
let n = 10000;
let scale = 25;
let tracer1, tracer2;

let isPaused = false;
let pauseclicks = 0;
let fc = 0;

function setup() {
    createCanvas(800, 800, WEBGL);
    background(0);
    colorMode(HSB);
    init();
    frameRate = 30;
}

function init() {
    // Initialize coordinates
    tracer1 = createVector(1.0, 0.0, 0.0);
    tracer2 = createVector(1.5, 0.0, 0.0);
}
// Executed at framerate
// draw is called automatically and should never be called
// controlled with noLoop(), redraw(), and loop()
function draw() {
    //Pause and unpause
    if (isPaused) {
        noLoop();
        return;
    }

    // Use local variables for performance
    let x = tracer1.x, y = tracer1.y, z = tracer1.z;
    let x2 = tracer2.x, y2 = tracer2.y, z2 = tracer2.z;

    // Calculate the deltas according to the Halvorsen attractor equations
    let dx = -a * x - 4 * y - 4 * z - y * y;
    let dy = -a * y - 4 * z - 4 * x - z * z;
    let dz = -a * z - 4 * x - 4 * y - x * x;

    let dx2 = -a * x2 - 4 * y2 - 4 * z2 - y2 * y2;
    let dy2 = -a * y2 - 4 * z2 - 4 * x2 - z2 * z2;
    let dz2 = -a * z2 - 4 * x2 - 4 * y2 - x2 * x2;

    // Update coordinates
    tracer1.set(x + timestep * dx, y + timestep * dy, z + timestep * dz);
    tracer2.set(x2 + timestep * dx2, y2 + timestep * dy2, z2 + timestep * dz2);

    // Draw the current point
    stroke(frameCount % 361, 255, 255);
    strokeWeight(5);
    point(tracer1.x * scale, tracer1.z * scale, tracer1.y * scale);
    point(tracer2.x * scale, tracer2.z * scale, tracer2.y * scale);
}

// ###############################[ BUTTONS ]############################### //

// ###############################[ Pause ]############################### //
document.getElementById('pause-btn').addEventListener('click', function () {
    pauseclicks++;
    const button = this;

    // Resume animation from current frame
    if (pauseclicks % 2 == 0) {
        isPaused = false
        frameCount = fc
        button.style.backgroundColor = "#4CAF50";
        loop();

    // Pause animation
    } else {
        isPaused = true
        fc = frameCount
        button.style.backgroundColor = "#f44336";
    }
});

// ###############################[ Reset 'a' ]############################### //
document.getElementById('reset-a-btn').addEventListener('click', function () {
    const slider = document.getElementById('a-slider');
    const output = document.getElementById('a-value');
    a = 1.4;
    slider.value="1.4"
    output.textContent = a.toFixed(2);  // Display the current value of 'a'

    clear();
    background(0);
    init();
});

// ###############################[ Update 'a' ]############################### //
document.getElementById('update-a-btn').addEventListener('click', function () {
    const slider = document.getElementById('a-slider');
    const output = document.getElementById('a-value');
    a = parseFloat(slider.value)
    output.textContent = a.toFixed(2);  // Display the current value of 'a'

    clear();
    background(0);
    init();
});

// ###############################[ Slider ]############################### //
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('a-slider');
    const output = document.getElementById('a-value');

    // Function to update the slider text to match slider
    const updateAValue = () => output.textContent = parseFloat(slider.value).toFixed(2);

    // Set event listener
    updateAValue();
    slider.addEventListener('input', updateAValue);
});

// ###############################[ Skip to Half ]############################### //
document.getElementById('skip-half-btn').addEventListener('click', function () {
    
});

// ###############################[ Skip to End ]############################### //
document.getElementById('skip-end-btn').addEventListener('click', function () {
    
});