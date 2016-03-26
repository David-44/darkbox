# Darkbox
A lightweight lightbox using CSS3 animations as transitions.

#### Why another damn lightbox ?
Because I was working on another damn carousel using CSS 3D transforms and animations, and I thought It would be nice to do something similar with a lightbox.

## Features

#### The bad
Let's start with what might cause problems, so we're done with it.
* No support for IE8 and below. If you want a fallback, make sure to enclose your images in an anchor tag linking to the image.
* the lightbox will work on browsers that don't support animations (IE9 and opera mini), but the transitions will not be smooth.

#### The good :
* No need for external libraries.
* Fully responsive.
* Super lightweight : Less than 4KB for the minified javascript and 2KB for the CSS.
* Easy to customise : On top of the few options that can be set on the module itself, most of the work is done with CSS.
* Easy to extend with your own image transitions

#### The debatable
* All images are preloaded during initialisation. This makes animations smooth but can put a lot of strain on your network connection if darkbox is used with a lot of high quality images.
* The background blur is achieved by appending a new stylesheet in the head element that queries `body > *:not(.d-overlay)`. This option can be disabled in the options by setting `backgroundBlur = false`. See options.

## Basic setup and functionalities

#### In your markup
Add a class of `darkbox` to each images container and that's it. 
Image containers can be any kind of elements : ul, div, section, as long as they contain links to images in the following form :
* Any element with an href or src attribute linking to an image (most commonly `<a>` and `<img>` elements).
* Any `<li>` or `<figure>` element containing anchors or images.

Any element not in this list will just be ignored.
##### Example :
```html
<ul class="darkbox">
  <li><a href="images/trees1.jpg"><img src="images/trees1.jpg" alt="picture of trees" /></a></li>
  <li><a href="images/trees2.jpg"><img src="images/trees2.jpg" alt="picture of trees" /></a></li>
  <li><a href="images/trees3.jpg"><img src="images/trees3.jpg" alt="picture of trees" /></a></li>
  <li><a href="images/trees4.jpg"><img src="images/trees4.jpg" alt="picture of trees" /></a></li>
  <li><a href="http://google.com"></a></li>
</ul>
```
This will create an array of 4 images, the last anchor will silently be ignored since it doesn't link to an image.

#### The stylesheet
Copy darkbox.min.css in your project folder and link to it in your document's head.
```html
<link rel="stylesheet" type="text/css" href="darkbox.min.css">`
```
The defaut stylesheet uses a fadein / fadeout transition lasting 1 second each (2 seconds in total).

#### the javascript
Copy darkbox.min.js and link to it **at the end of your document** and initialise it with another script tag.
```html
<script src="darkbox.min.js"></script>
<script>darkbox.init();</script>
```

That is all you need to do to get darkbox to work. Now, to customize it.




