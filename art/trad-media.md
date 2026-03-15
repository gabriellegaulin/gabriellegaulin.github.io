---
layout: 
title: Gabrielle Gaulin | Traditional Media
permalink: /art/trad-media
published: true
---

{% include gg-head.html %}
{% include bento-grid-styles.html %}

{% include grid-styling-overlap.html %}
{% include gg-nav.html %}

{% assign sorted_photos = site.trad-art| sort: "weight" %}

<body class="no-touch">

<div class="wrap">
  {% for image in sorted_photos %}
    <div class="box">
      <div class="boxInner">
        <img src="{{ image.image_path }}" alt="{{ image.title}}"/>

        <div class="titleBox">
          {{ image.title }} <br/> 
          <a href="{{ image.collection-name.url}}">{{ image.collection-name }}</a> 
        </div>

      </div>
    </div>
  {% endfor %}
</div>



</body>


<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.js"></script>
  <script type="text/javascript">
  $(function(){
     // See if this is a touch device
     if ('ontouchstart' in window)
     {
        // Set the correct body class
        $('body').removeClass('no-touch').addClass('touch');
       
        // Add the touch toggle to show text
        $('div.boxInner img').click(function(){
           $(this).closest('.boxInner').toggleClass('touchFocus');
        });
     }
  });
  </script>
