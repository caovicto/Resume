---
layout: default
title: Home
---

{% assign lastChapter = site.archive.last.id | slice: 17, 18 %}

<div class="glitch" data-text="Latest Update">Latest Update</div>
<!-- <div id="update-notif">Chapter {{lastChapter}} Page {{ site.lastPage }}</div> -->


<div class="chapter-pages">
    <a href="{{ site.baseurl }}{{ site.archive.last.url }}?page={{ site.lastPage }}" title="Latest Chapter" page-id="{{ site.lastPage }}"><img src="{{ site.baseurl }}/assets/main/latest-cover.png"></a>
</div>