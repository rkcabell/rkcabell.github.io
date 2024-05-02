class TuningFork {
  constructor(frequency, x, y) {
    this.frequency = frequency;
    this.x = x;
    this.y = y;
    this.isPlaying = false;
  }

  display() {
    // Basic visualization
    stroke(255);
    fill(this.isPlaying ? 'red' : 'grey');
    ellipse(this.x, this.y, 50, 50);
  }

  playSound() {
    if (!this.oscillator) {
      this.oscillator = new p5.Oscillator();
      this.oscillator.setType('sine');
      this.oscillator.freq(this.frequency);
      this.oscillator.start();
    }
    this.oscillator.amp(0.5, 0.05);  // Fade in
    this.isPlaying = true;
  }

  stopSound() {
    if (this.oscillator) {
      this.oscillator.amp(0, 0.5);  // Fade out
      this.isPlaying = false;
    }
  }
}
