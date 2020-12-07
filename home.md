---
layout: default
title: Home
---
{% assign lastChapter = site.archive.last.id | slice: 8, 18 %}
{% assign chapterNum = site.archive.last.id | slice: 17, 18 %}

{% assign page = 0 %}
{% assign files = site.static_files %}
{% for image in files  %}
    {% if image.path contains lastChapter %}
        {% assign page = page | plus: 1 %}
    {% endif %}
{% endfor %}

<div class="glitch" data-text="Latest Update">Latest Update</div>


<div class="chapter-pages">
    <a href="{{ site.baseurl }}{{ site.archive.last.url }}?page={{ page }}" title="Chapter {{ chapterNum }} Page {{ page }}" page-id=""><img src="{{ site.baseurl }}/assets/main/latest-cover.png"></a>
</div>