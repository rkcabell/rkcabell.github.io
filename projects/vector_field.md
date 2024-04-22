---
layout: project_layout
title: Vector Field
moniker: Vector
description: ~Gravitational~
permalink: /projects/vector_field.html
categories: [project]
---

<label for="vectorField">Vector Field:</label>
<select id="vectorField">
<option value="gravity">Gravity</option>
<option value="wind">Wind</option>
<option value="curly">Curly</option>
<option value="away">Away</option>
<option value="damped">Damped</option>
<option value="bonus_gravity">Bonus</option>
</select>

<label for="kValue">Adjust k:</label>
<input type="range" id="kValue" min="0" max="10" step="0.1" value="1">
<label for="thetaValue">Adjust θ (in degrees):</label>
<input type="range" id="thetaValue" min="0" max="360" step="1" value="0">

<!-- <script src="/assets/js/vectors.js"></script> -->
<script src="/assets/js/vector2.js"></script>

<script>
    document.getElementById('kValue').addEventListener('input', function(e) {
        field.setK(parseFloat(e.target.value));
    });
    document.getElementById('thetaValue').addEventListener('input', function(e) {
        field.setTheta(parseFloat(e.target.value) * Math.PI / 180); // Convert degrees to radians
    });
</script>

<script>
document.getElementById('vectorField').addEventListener('change', function(e) {
    field.setField(e.target.value);
    redraw();
});
</script>
