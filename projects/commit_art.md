---
layout: project_layout
title: Commit Art
moniker: Contribution
description: ~Committed~
permalink: /projects/commit_art.html
image: /assets/images/projects/commit_art.png
categories: [project, inproject]
---

<h2>Contribution Art</h2>

<div class="centered">
    <img src="/assets/images/projects/commit_art_banner.png" alt="color picker add-on entry">
</div>

A script that publishes GitHub commits in a pattern to create visual artwork.

By back-dating GitHub commits to this repository, this script can create shapes in symbols in their GitHub Contributions Graph

The commits are defined by a provided grid. For example, this pattern creates a heart:

```
[
    [0, 1, 1, 0, 1, 1, 0],  # Sunday
    [1, 1, 1, 1, 1, 1, 1],  # Monday
    [1, 1, 1, 1, 1, 1, 1],  # Tuesday
    [1, 1, 1, 1, 1, 1, 1],  # Wednesday
    [0, 1, 1, 1, 1, 1, 0],  # Thursday
    [0, 0, 1, 1, 1, 0, 0],  # Friday
    [0, 0, 0, 1, 0, 0, 0],  # Saturday
]
```
For a brighter color for some pixels, you can change the number in the graph to be up to 23, as it splits the commits based on the hour.

Theoretically, someone could run DOOM on their contribution graph with something like this.

## Github Link

<a href="https://github.com/rkcabell/Commit-Art"> Here </a>
