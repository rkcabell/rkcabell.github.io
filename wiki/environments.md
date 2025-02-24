---
layout: wikipage_layout
title: Environments
description: Explore the geography of an alien planet
moniker: Worldbuilding
slug: environments
permalink: /environments.html
categories: [root, world, personal]
order: 5
---
<h2>Environments of Dianthos</h2>

<ul>
   {% for env in site.locations %}
         <li><a href="{{ env.url }}">{{ env.title }}</a></li>
   {% endfor %}
</ul>