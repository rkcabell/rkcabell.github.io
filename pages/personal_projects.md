---
layout: personalproject_layout
title: Projects
moniker: Projects
description: My personal projects
slug: projects
permalink: /projects.html
categories: [root, project, personal]
audience: personal
order: 3
---
<!-- PERSONAL PROJECTS == projects.html -->
## Welcome to my project page!

<div class="projects-grid">
  {% assign ordered_projects = site.projects | where_exp: "item", "item.order" | sort: "order" %}
  {% assign unordered_projects = site.projects | where_exp: "item", "item.order == nil" | sort_natural: "title" %}
  {% assign all_projects = ordered_projects | concat: unordered_projects %}
  {% for project in all_projects %}
    {% assign project_audience = project.audience | default: "both" %}
    {% if project_audience == "personal" or project_audience == "both" %}
      {% include project_card.html project=project %}
    {% endif %}
  {% endfor %}
</div>
