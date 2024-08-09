---
layout: personalproject_layout
title: Projects
moniker: Projects
description: My personal projects
slug: projects
permalink: /projects.html
categories: [root, project, personal]
order: 3
---
<!-- PERSONAL PROJECTS == projects.html -->
## Welcome to my project page!

<div class="projects-grid ">
{% for project in site.data.projects %}
  <div class="project-item " id="txt-bkg">
    <a href="{{ project.link }}?smrfhaoc">
    <img src="{{ project.image }}" alt="{{ project.name }}">
    </a>
    <h3><a href="{{ project.link }}?smrfhaoc">{{ project.name }}</a></h3>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
</div>
