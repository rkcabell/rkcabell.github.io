---
layout: project_layout
title: Projects
moniker: Projects
description: My personal projects
slug: projects
permalink: /professional/projects.html
categories: [root, project, professional]
order: 3
---

## Welcome to my project page!

<div class="projects-grid ">
{% for project in site.data.projects %}
  <div class="project-item " id="txt-bkg">
    <a href="{{ project.link }}?szosxzfarvay">
    <img src="{{ project.image }}" alt="{{ project.name }}">
    </a>
    <h3><a href="{{ project.link }}?szosxzfarvay">{{ project.name }}</a></h3>
    <p>{{ project.description }}</p>
  </div>
{% endfor %}
</div>
