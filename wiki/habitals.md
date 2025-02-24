---
layout: wikipage_layout
title: Habitals
description: Meet the creatures that live here
moniker: Worldbuilding
slug: habitals
permalink: /habitals.html
categories: [root, world, personal]
order: 5
---
<h2>Habitals of Dianthos</h2>

<ul>
   {% for habital in site.habitals %}
         <li><a href="{{ habital.url }}">{{ habital.title }}</a></li>
   {% endfor %}
</ul>