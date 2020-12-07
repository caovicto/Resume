---
layout: default
title: Archive
---

<div class="glitch" data-text="Archive">Archive</div>

<div class="simple-list">
    <ul> 
        {% for chapter in site.archive %}
            <li>
            <a href="{{ site.baseurl }}{{ chapter.url }}">{{ chapter.title }}</a>
            </li>
        {% endfor %}
    </ul>
</div>
