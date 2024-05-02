---
layout: project_layout
title: Halvorsen Simulation
moniker: Halvorsen
description: ~Attractive~
permalink: /projects/halvorsen.html
categories: [project, inproject]
---

<title>Halvorsen Simulation</title>

## Controls

<div class="slider-container">
<button id="reset-btn" class="control-btn">Reset to default</button>
<button id="update-btn" class="control-btn">Update Canvas</button>
</div>

<div class="slider-container">
<label for="a-slider">Halvorsen Factor:</label>
<input type="range" id="a-slider" class="slider" min="0" max="3" step="0.10" value="1.40">
<span id="a-value">1.4</span>

<div id="v-space-30"></div>

<label for="s-slider">Scale:</label>
<input type="range" id="s-slider" class="slider" min="5" max="25" step="0.5" value="12">
<span id="s-value">12</span>

<div id="v-space-30"></div>

</div>
<div class="slider-container">
<button id="pause-btn" class="control-btn">Pause/Resume Animation</button>
<button id="rotation-btn" class="control-btn">Freeze Rotation</button>
<button id="draw-mode-btn" class="control-btn">Toggle Draw Mode</button>

</div>

## Canvas

<script src="js/halvorsen.js"></script>
