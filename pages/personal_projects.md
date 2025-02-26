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

{% if page.categories contains 'professional' %}
  {% assign query_param = 'szosxzfarvay' %}
{% elsif page.categories contains 'personal' %}
  {% assign query_param = 'smrfhaoc' %}
{% endif %}

<div class="projects-grid">
  {% for project in site.pages %}
    {% if project.categories contains 'inproject' %}
      <div class="project-item" id="txt-bkg">
        <a href="{{ project.permalink | relative_url }}?{{ query_param }}">
          {% if project.image %}
            <img src="{{ project.image | relative_url }}" alt="{{ project.moniker }}">
          {% else %}
            <img src="/assets/images/projects/default-project-image.png" alt="No image available">
          {% endif %}
        </a>
        <h3><a href="{{ project.permalink | relative_url }}?{{ query_param }}">{{ project.title }}</a></h3>
      </div>
    {% endif %}
  {% endfor %}
</div>
