---
layout: default
title: Writing
permalink: /writing/
---
<header class="page-head"><p class="eyebrow">Writing</p><h1>Notes, essays, and ideas in progress.</h1><p class="lede">A place for shorter philosophical writing, reading notes, reflections on teaching, and ideas that sit somewhere between the notebook and the formal paper.</p></header><section class="section"><ul class="post-list">{% for post in site.posts %}<li><p class="meta">{{ post.date | date: "%B %-d, %Y" }}</p><a href="{{ post.url }}">{{ post.title }}</a>{% if post.description %}<p>{{ post.description }}</p>{% endif %}</li>{% else %}<li><p>No posts yet. The first one will appear here.</p></li>{% endfor %}</ul></section>