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
* The background blur is achieved by creating a
