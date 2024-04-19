---
layout: default
title: Projects
moniker: Projects
description: My personal projects
permalink: /projects.html
categories: [root, project]
order: 2
---

## Welcome to my project page!

<div class="projects-grid ">
{% for project in site.data.projects %}
  <div class="project-item " id="txt-bkg">
    <a href="{{ project.link }}">
    <img src="{{ project.image }}" alt="{{ project.name }}">
    </a>
    <h3><a href="{{ project.link }}">{{ project.name }}</a></h3>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
</div>
