---
layout: default
title: Marginalia
permalink: /writing/
---
<header class="page-head"><p class="eyebrow">Writing</p><h1>Marginalia</h1><p class="lede">An informal collection of notes, reflections, poetry, and ideas in progress.</p></header><section class="section"><ul class="post-list">{% for post in site.posts %}<li><p class="meta">{{ post.date | date: "%B %-d, %Y" }}</p><a href="{{ post.url }}">{{ post.title }}</a>{% if post.description %}<p>{{ post.description }}</p>{% endif %}</li>{% else %}<li><p>No posts yet. The first one will appear here.</p></li>{% endfor %}</ul></section>