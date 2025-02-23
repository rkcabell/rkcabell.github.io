---
layout: wikihome_layout
title: Dianthos
description: Welcome to the world of Dianthos
moniker: Worldbuilding
slug: world
permalink: /world.html
categories: [root, world, personal]
order: 5
---



<!-- <div class="myths">
  {% for myth in site.data.myths %}
    <div class="myth">
      <h2>{{ myth.extraFields.name }}</h2>
      <p>{{ myth.extraFields.description | newline_to_br }}</p>
      <h3>Connected Locations:</h3>
      <ul>
      {% for location in myth.extraFields.pairedConnectedLocations.value %}
        <li><a href="{{ location.url }}">{{ location.value }}</a></li>
      {% endfor %}
      </ul>
      <h3>Connected Events:</h3>
      <ul>
      {% for event in myth.extraFields.pairedEvents.value %}
        <li><a href="{{ event.url }}">{{ event.value }}</a></li>
      {% endfor %}
      </ul>
      <h4>Part of: <a href="{{ myth.extraFields.parentDoc.value.url }}">{{ myth.extraFields.parentDoc.value.label }}</a></h4>
    </div>
  {% endfor %}
  </div> -->

<div class="entries">
{% for entry in site.data.myths %}
  <div class="entry">
    <h2>{{ entry[1].name }}</h2> <!-- Assuming entry is a two-item array [key, value] -->
    <p>{{ entry[1].description }}</p>
    {% if entry[1].parentDoc %}
    <p>Part of: {{ entry[1].parentDoc.value.label }}</p>
    {% endif %}
    {% if entry[1].pairedConnectedLocations %}
    <ul>
      <li>Connected Locations:</li>
      {% for location in entry[1].pairedConnectedLocations.value %}
        <li>{{ location.value }} - <a href="{{ location.url }}">Link</a></li>
      {% endfor %}
    </ul>
    {% endif %}
    {% if entry[1].pairedEvents %}
    <ul>
      <li>Connected Events:</li>
      {% for event in entry[1].pairedEvents.value %}
        <li>{{ event.value }} - <a href="{{ event.url }}">Link</a></li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
{% endfor %}
</div>
