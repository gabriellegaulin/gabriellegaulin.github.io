---
layout: collection
collection-name: Midnight Scholar
---

<ul>
    {% for image in page.collection-name.banner-images %}
      <li><img src="{{ image.image_path }}" alt="{{ image.alt-text}}"/></li>
    {% endfor %}
</ul>