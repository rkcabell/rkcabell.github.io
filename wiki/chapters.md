---
layout: wikipage_layout
title: Chapters
description: Read about the lore
moniker: Worldbuilding
slug: chapters
permalink: /chapters.html
categories: [root, world]
order: 5
---
<h2>Chapters of Dianthos</h2>
<ul>
   {% for chapter in site.chapters %}
         <li><a href="{{ chapter.url }}">{{ chapter.title }}</a></li>
   {% endfor %}
</ul>
