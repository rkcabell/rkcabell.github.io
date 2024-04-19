---
layout: project_layout
title: Halvorsen Simulation
moniker: Halvorsen
description: ~Attractive~
permalink: /projects/halvorsen.html
categories: [project]
---

## Controls

<div class="slider-container">
<button id="pause-btn" class="control-btn">Pause/Resume Animation</button>
<button id="reset-a-btn" class="control-btn">Reset to default</button>
<button id="update-a-btn" class="control-btn">Update H.Factor</button>
</div>

<div class="slider-container">
<label for="a-slider">Halvorsen Factor: </label>
<input type="range" id="a-slider" class="slider" min="0" max="3" step="0.10" value="1.40">
<span id="a-value">1.4</span>
</div>

## Canvas

<script src="/assets/js/halvorsen.js"></script>
