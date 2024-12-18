---
layout: project_layout
title: Tuning Fork Simulation
moniker: Fork
description: ~Vibrations~
categories: [project, inproject]
---

<title>Tuning Fork Simulation</title>


<!-- <meta charset="UTF-8"> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script> -->

<div class="video-container">
  <video width="868" height="860" controls>
    <source src="/assets/videos/TuningFork_vid.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Github Link

<a href="https://github.com/rkcabell/sound-gen"> Here </a>

This project was built to help me in my worldbuilding. That is why the material selection is full of organic materials

The shape was initially going to change the tone but was scrapped

Density was meant to be changeable, for now it is 5800 for the inital fork and 3000 for subsequent forks

Formula for frequency is (N / (2 _ pi _ length\*_2)) _ sqrt((young_modulus _ moment_of_inertia) / (density _ cross_section_area))

I stopped working on this project because vPython is outdated and not fun to work with. It can be reformatted to work with another language as the complexity is low and all the math is done with numpy. I used vPython because it was the first result I found to generate a tone as well as drawing an image.

<!-- <script src="js/TuningFork.js"></script>
<script src="js/ForkSim.js"></script> -->
