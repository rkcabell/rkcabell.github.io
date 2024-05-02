let forks = [];
let addButton;

function setup() {
  createCanvas(800, 600);
  forks.push(new TuningFork(440, width / 2, height / 2));
  addButton = createButton('Add Tuning Fork');
  addButton.position(10, 10);
  addButton.mousePressed(addFork);
}

function draw() {
  background(0);
  forks.forEach(fork => {
    fork.display();
  });
}

function addFork() {
  let newFork = new TuningFork(random(220, 880), random(width), random(height));
  forks.push(newFork);
}

function mousePressed() {
  forks.forEach(fork => {
    let d = dist(mouseX, mouseY, fork.x, fork.y);
    if (d < 25) {
      if (!fork.isPlaying) {
        fork.playSound();
      } else {
        fork.stopSound();
      }
    }
  });
}
