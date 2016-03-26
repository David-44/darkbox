# Darkbox
A lightweight lightbox using CSS animations.

The [demo](http://morisset-web.co.uk/darkbox-demo.html) is here.

#### Why another damn lightbox ?
Because I was working on another damn carousel using CSS 3D transforms and animations, and I thought It would be nice to do something similar with a lightbox.

## Features

#### The bad
Let's start with what might cause problems, so we're done with it.
* No support for IE8 and below. If you want a fallback, make sure to enclose your images in an anchor tag linking to the image.
* Darkbox will work on browsers that don't support animations (IE9 and opera mini), but the transitions will not be smooth.

#### The good :
* No need for external libraries.
* Fully responsive.
* Super lightweight : Less than 4KB for the minified javascript and 2KB for the CSS.
* Effects are all done with CSS, which makes it easy to customise or extend with your own animations.

#### The debatable
* All images are preloaded during initialisation. This makes animations smoother but can put a lot of strain on your network connection if darkbox is used with a lot of high quality images.
* The background blur is achieved by appending a new stylesheet in the head element. It contains one rule on the selector `body > *:not(.d-overlay)`. This option can be disabled in the options by setting `backgroundBlur = false`. See how to customise below.

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

That is all you need to do to get darkbox to work with the default animation.

## Customising before using

Two things can be customised :
* The main CSS file : darkbox.css .
* javascript options

#### Default CSS
darkbox.css contains all the CSS necessary for darkbox. It contains 4 parts.

##### main styling of the overlay and image
The basics. `perspective` and `transform-origin` are used only for 3D transforms, they can be removed if not needed.

##### Overlay smooth transitions
Small animations used to avoid the overlay appearing at once. Nothing breaks if they're removed, the overlay will just appear abruptly.

##### Arrows
Styling of the svg arrows. There is a huge transparent border applied to make the touch area larger on touch devices.

##### Fade in, fade out
The default animation.

#### Animations used for transitions.

Extra animations are in the file animations.css
They can be seen on the [demo](http://morisset-web.co.uk/darkbox-demo.html) page.
By default, they all have a duration of 1 second for the out, and one second for the in. In order to modify it, you will need to change the duration of the animation **both in the CSS declarations and in the javascript options**.

#### javascript options

Options available and default values :

```javascript
{
  imageIn: "fadein",      // Class of the animation used when opening the overlay
  imageOut: "fadeout",    // Class of the animation used when closing the overlay
  imageLeftIn: "",        // Class of the animation used for the image entering the screen after the left arrow is clicked.
  imageLeftOut: "",       // Class of the animation used for the image leaving the screen after the left arrow is clicked.
  imageRightIn: "",       // Class of the animation used for the image entering the screen after the right arrow is clicked.
  imageRightOut: "",      // Class of the animation used for the image leaving the screen after the right arrow is clicked.
  transitionTime: 1000,   // time before the "in" animation starts
  fileTypes: /\.(jpg|png|gif|jpeg|tif|tiff|svg)$/i,   // file types accepted
  backgroundBlur: true    // Set to false if you don't want a backgroundBlur stylesheet appended to the head element
}
```
If imageLeftIn or imageRightIn are not set, the effect for imageIn is used instead. Same for imageOut.

##### Example of initialisation with option modifications :

```javascript
var options = {
  imageLeftIn: "cardleftin",
  imageLeftOut: "cardleftout",
  backgroundBlur: false
};
darkbox.init(options);
```



