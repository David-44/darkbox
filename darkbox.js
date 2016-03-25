var darkbox = function() {

	"use strict";

	var exports = {},

		settings = {
			imageIn: "fadein",
			imageOut: "fadeout",
			imageLeftIn: "",
			imageLeftOut: "",
			imageRightIn: "",
			imageRightOut: "",
			transitionTime: 1000,
			fileTypes: /\.(jpg|png|gif|jpeg|tif|tiff|svg)$/i,
			backgroundBlur: true
		},

		overlay = document.createElement("div"),
		imagesArray	= [],		// 2 dimension array of images darkbox will apply to, defined in init()
		currentImageNumber = 0,	// Index of the image selected. Initialised by openDarkbox
		currentCollection = 0,	// index of the container selected. Initialised in openDarkbox 
		currentImage = null,	// DOM element being displayed. Initialised in openDarkbox
		blurStyle = null,		// stylesheet holding the rule that blurs the background. Initialised in init()
		animationSupport = false;	// Checks if animations are supported. Tested during initialisation


	// Functions having an effect on the layout


	// Overlay click listener
	var overlayClickEvent = function(event) {
		event.stopPropagation();
		if (event.target.id === "d-leftarrow" || event.target.id === "pathleft") {
			browseBox("left");
		} else if (event.target.id === "d-rightarrow" || event.target.id === "pathright") {
			browseBox("right");
		} else {
			removeOverlay();
		}
	};

	
	// Function that applies the desired effect during image transition
	var imageTransition = function(newImage, effectIn, effectOut) {
		currentImage.className = effectOut;
		setTimeout(function() {			
			newImage.className = effectIn;
			overlay.removeChild(currentImage);
			overlay.appendChild(newImage);
			currentImage = newImage;
			if (!animationSupport) {
				currentImage.className = "";
			}
		}, settings.transitionTime);
	};


	// Browses one image to the "left" of imagesArray or to the "right"
	var browseBox = function(direction) {
		var newImage  = null;

		if (direction == "right") {
			if (currentImageNumber != imagesArray[currentCollection].length - 1) {
				newImage = imagesArray[currentCollection][++currentImageNumber];
			} else {
				newImage = imagesArray[currentCollection][0];
				currentImageNumber = 0;
			}
			imageTransition(newImage, settings.imageRightIn || settings.imageIn, settings.imageRightOut || settings.imageOut);
		} else {
			if (currentImageNumber != 0) {
				newImage = imagesArray[currentCollection][--currentImageNumber];
			} else {
				newImage = imagesArray[currentCollection][imagesArray[currentCollection].length - 1];
				currentImageNumber = imagesArray[currentCollection].length - 1;
			}
			imageTransition(newImage, settings.imageLeftIn || settings.imageIn, settings.imageLeftOut || settings.imageOut);
		}
	};


	// Hides the overlay and removes the image
	var removeOverlay = function(){
		currentImage.className = settings.imageOut;
		var clearingtime = (settings.transitionTime - 200 >= 0) ? settings.transitionTime - 200 : 0;
		setTimeout(function() {
			overlay.className = "d-overlay animclear";
			if (blurStyle instanceof StyleSheet) {
				blurStyle.disabled = true;
			}
		}, clearingtime);
		setTimeout(function() {
			overlay.style.display = "none";
			overlay.removeChild(currentImage);
			overlay.className = "d-overlay";
		}, settings.transitionTime);
	};



	// Helper functions that are used during initialisations


	// Adds an image to imagesArray
	var initialiseImage = function(tempNode, index) {
		
		var source = tempNode.getAttribute("href") || tempNode.getAttribute("src");
		
		if (source != undefined) {
			source = source.trim();
			if (settings.fileTypes.test(source)) {
				
				// creates the image element and pushes it in the array
				var imageElement = document.createElement("img");
				imageElement.setAttribute("src", source);
				 imagesArray[index].push(imageElement);

				// Adds an index on the target element corresponding to its index in imagesArray
				tempNode.setAttribute("data-darkbox-index", imagesArray[index].length - 1);
			}
		} else if ((tempNode.tagName.toLowerCase() === "li" || tempNode.tagName.toLowerCase() === "figure") && tempNode.firstElementChild) {
			initialiseImage(tempNode.firstElementChild, index);
		}
	};


	// Appends a stylesheet with to the head element. that stylesheet is disabled by default
	var addStylesheet = function(rule) {
		blurStyle = document.createElement("style");
		blurStyle.type = "text/css";
		blurStyle.appendChild(document.createTextNode(rule));
		document.getElementsByTagName("head")[0].appendChild(blurStyle);
		blurStyle.disabled = true;
	};



	// Initialisation
	
	
	exports.init = function(options) {

	
		// If an option object has been passed, it initialises the settings accordingly
		if (options && typeof options === "object") {
			for (var prop in options){
				if (prop in settings) {
					settings[prop] = options[prop];
				}
			}
		}
		

		// Sets animationSupport to true if animations are supported by the browser
		var animationstring = 'animation',
		    domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
		if( overlay.style.animationName ) { 
			animation = true; 
		}
		if( animationSupport === false ) {
		  for( var i = 0; i < domPrefixes.length; i++ ) {
		    if( overlay.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
		      animationSupport = true;
		      break;
		    }
		  }
		}


		// Creates the overlay and the arrows
		overlay.className = "d-overlay";
		overlay.innerHTML = '<svg class="d-leftarrow" id="d-leftarrow" width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#CCCCCC"><path id="pathleft" d="M 416.00,416.00l-96.00,96.00L 64.00,256.00L 320.00,0.00l 96.00,96.00L 256.00,256.00L 416.00,416.00z" ></path></svg>';
		overlay.innerHTML += '<svg class="d-rightarrow" id="d-rightarrow" width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#CCCCCC"><path id="pathright" d="M 64.00,416.00l 96.00,96.00l 256.00-256.00L 160.00,0.00L 64.00,96.00l 160.00,160.00L 64.00,416.00z" ></path></svg>';
		document.body.appendChild(overlay);



		// Temp variables used by the rest of the initialisation
		var wrapper = document.getElementsByClassName("darkbox"),
			tempNode = null,	// variable that will hold each element being analysed
			i,
			j,
			imageIndex;			// variable that will hold the imageIndex sent to the event listener


		// Builds the arrays of images and adds them to imagesArray
		for (i = 0; i < wrapper.length; i++) {

			// Adds event listeners to each darkbox container
			(function(wrapperIndex) {
				wrapper[i].addEventListener("click", function(event) {
					var elem = event.target;
					while (elem !== wrapper[i]) {
						if (imageIndex = elem.getAttribute("data-darkbox-index")) {
							darkbox.openDarkbox(wrapperIndex, imageIndex);
							event.preventDefault();
							break;
						} else {
							elem = elem.parentNode;
						}
					}
				}, false);
			})(i);

			// Adds a new array of images and populates it with image elements
			imagesArray[i] = [];
			for (j = 0; j < wrapper[i].children.length; j++){
				tempNode = wrapper[i].children[j];
				if (tempNode.nodeType === 1) {
					initialiseImage(tempNode, i);
				}
			}
		}


		// Adds a new stylesheet with a rule that blurs every direct child of body, except for the overlay
		if (settings.backgroundBlur) {
			if (document.body.style.webkitFilter !== undefined) {
				addStylesheet("body > *:not(.d-overlay) {-webkit-filter: blur(20px);}");
			} else if (document.body.style.filter !== undefined) {
				addStylesheet("body > *:not(.d-overlay) {filter: blur(20px);}");
			}
		}



		// Finishes by adding the click and touch handlers to the overlay and arrows
		// The touch handler disables the click event when it fires.
		// We use the touchend event in order to prevent the 300ms delay that occurs on touch devices
		overlay.addEventListener("click", overlayClickEvent, false);

		overlay.addEventListener("touchend", function(event) {
			event.currentTarget.removeEventListener("click", overlayClickEvent, false);
			overlayClickEvent(event);
		}, false);

		console.log("darkbox initialised");
	};



	// opens darkbox, retrieves the selected image from imagesArray and displays it
	exports.openDarkbox = function(wrapper_index, item_index) {
		if (blurStyle instanceof StyleSheet) {
			blurStyle.disabled = false;
		}
		currentCollection = wrapper_index;
		currentImageNumber = item_index;
		currentImage = imagesArray[currentCollection][currentImageNumber];
		overlay.appendChild(currentImage);
		overlay.className = "d-overlay animopaque";
		overlay.style.display = "block";
		currentImage.className = settings.imageIn;
		setTimeout(function(){
			overlay.className = "d-overlay";
		}, animationSupport && 400);
		if (!animationSupport) {
			currentImage.className = "";
		}
	};

	return exports;
	
}();




