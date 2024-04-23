---
layout: post_layout
---

## Example post

This is an example post. You can edit it or create a new one

… which is shown in the screenshot below:
![My helpful screenshot]({{ site.url }}/assets/screenshot.jpg)

{% highlight html %}

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>{% endhighlight %}

Each post automatically takes the first block of text, from the beginning of the content to the first occurrence of excerpt_separator, and sets it as the post.excerpt

Because Jekyll grabs the first paragraph you will not need to wrap the excerpt in p tags, which is already done for you. These tags can be removed with the following if you’d prefer:

{{ post.excerpt | remove: '<p>' | remove: '</p>' }}

If you don’t like the automatically-generated post excerpt, it can be overridden by adding excerpt to your post’s YAML Front Matter. Completely disable it by setting your excerpt_separator to "".
