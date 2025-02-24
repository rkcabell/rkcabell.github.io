---
layout: wikipage_layout
title: Eras
description: Explore each era on an alien planet
moniker: Worldbuilding
slug: eras
permalink: /eras.html
categories: [root, world, personal]
order: 5
---

<h2>Eras of Dianthos</h2>
<ul>
   {% for era in site.eras %}
         <li><a href="{{ era.url }}">{{ era.title }}</a></li>
   {% endfor %}
</ul>
