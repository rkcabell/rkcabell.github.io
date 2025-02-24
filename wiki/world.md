---
layout: wikipage_layout
title: Dianthos
description: Welcome to the world of Dianthos
moniker: Worldbuilding
slug: world
permalink: /world.html
categories: [root, world]
---

<label for="map-selector">Choose a map:</label>
<select id="map-selector">{% for map in site.data.maps.maps %}<option value="/assets/images/maps/{{ map.filename }}">{{ map.label }}</option>{% endfor %}</select>



<div id="three-container"> </div>

<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
{
    "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/"
    }
}
</script>

<script type="module" src="/assets/js/worldmodel.js"></script>



