---
layout: wikipage_layout
description: Biopoesis era has a description
title: Biopoesis era
categories: [world, era]
order: 4
---

## Heading one

This is an example era. You can edit it or create a new one

… which is shown in the screenshot below:

{% highlight html %}

<ul>
    <li>
      <a> {{ site.title }}</a>
    </li>
</ul>
{% endhighlight %}

{% capture my_pgraph %}
If you don’t like the automatically-generated post excerpt, it can be overridden by adding excerpt to your post’s YAML Front Matter. Completely disable it by setting your excerpt_separator to "".
{% endcapture %}

{{ my_pgraph }}
