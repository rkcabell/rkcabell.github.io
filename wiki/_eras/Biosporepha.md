---
layout: wikipage_layout
description: my era has a description
title: Biosporepha era
categories: [world, era]
order: 5
---

## Heading one

This is an example post. You can edit it or create a new one

… which is shown in the screenshot below:
![My helpful screenshot]({{ site.url }}/assets/screenshot.jpg)

{% highlight html %}

<ul>
  {% for era in site.wiki.eras %}
    <li>
      <a href="{{ era.url }}">{{ era.title }}</a>
    </li>
  {% endfor %}
</ul>{% endhighlight %}

Each post automatically takes the first block of text, from the beginning of the content to the first occurrence of excerpt_separator, and sets it as the post.excerpt

{% capture my_pgraph %}
If you don’t like the automatically-generated post excerpt, it can be overridden by adding excerpt to your post’s YAML Front Matter. Completely disable it by setting your excerpt_separator to "".
{% endcapture %}

Because Jekyll grabs the first paragraph you will not need to wrap the excerpt in p tags, which is already done for you. These tags can be removed with the following if you’d prefer:

{{ my_pgraph }}
