---
layout: default
title: Car
description: Car display case
moniker: Car
slug: car
permalink: /Car.html
categories: [root, gallery, protected, personal]
heading: Car
gallery: Car-gallery
order: 9
tags: car
background: bgCar
incremental: true
protected: true
---

<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
{
    "imports": {
    "three": "https://unpkg.com/three@v0.163.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@v0.163.0/examples/jsm/"
    }
}
</script>

<div id="heading">
      <h1>Fiat 124 Spider</h1>
      <div class="border"></div>
</div>
<div id="progress-container">
    <div id="progress">Spooling turbo...</div>
</div>
<script type="module" src="assets/js/carmodel.js"></script>
