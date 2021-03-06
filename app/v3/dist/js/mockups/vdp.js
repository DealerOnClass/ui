/*
 * Vdp Price Drop
 */
(function(){
	var _priceDrop     = document.querySelector(".js-vdp-sidebar-notifications-pricedrop");
	var _priceDropLink = document.querySelector(".js-vdp-sidebar-notifications-pricedrop-link");
	var _delay         = 2000;
	var _isVisible	   = true;

	_priceDropLink.addEventListener("click", function(event){
		event.preventDefault();
		SlideToggle();
	});

	setTimeout(function() { SlideToggle(); }, _delay);

	function SlideDown() {
		_priceDrop.classList.add("down");
		_isVisible = false;
	}

	function SlideUp() {
		_priceDrop.classList.remove("down");
		_isVisible = true;
	}

	function SlideToggle() {
		if (_isVisible) {
			SlideDown();
		} else {
			SlideUp();
		}
	}
})();
/*
 * Vdp Carousel
 */
(function(){
	var carouselWrapper    = ".js-vdp-carousel-wrapper";
	var carousel           = ".js-vdp-carousel";
	var carouselLeft	   = ".js-control-left";
	var	_carouselWrapper   = document.querySelector(carouselWrapper);
	var	_carousel          = document.querySelector(carousel);
	var	_carouselLeft      = document.querySelector(carouselLeft);
	var	_carouselRight     = document.querySelector(".js-control-right");
	var	_carouselImages    = document.querySelectorAll(".js-vdp-carousel-image");
	var _carouselFirstImage= document.querySelector(".hero--bg");
	var	_vdpBodyContainer  = document.querySelector(".js-vdp-body-container");
	var salePrice		   = document.querySelector("#getSalePriceEntryForm");
	//	carousel controls
	var _scrollAnimationDuration   = 0.5;
	var	_scrollVisibilityThreshold = 400;
	var	_scrollDistance			   = 300;
	var	_paddedScrollWidth		   = 0;
	//	offset control
	var _gutter	= 15;
	var	_offset;
	//	mouse move
	var _carouselMoved;
	var	_mouseMoved;
	var	_mouseMovedTotal;
	var	_mouseCurrentXPos;
	//	mouse down
	var	_mouseDown = false;
	//	carousel start
	var _mouseClick  = true;
	var	_opacityAnim = 500;
	var	_imageClone;
	//	gallery animation
	var galleryActive  = false;
	var	galleryXOffset = 0;
	var	galleryXGutter = 30;
	var	galleryYCenter = 0;
	var galleryActiveImage;
	var galleryOpeningPosition = 0;
	var galleryTransitioning = false;
	var	selector, top, width, height;
	//	clone
	var galleryActiveImageClone;
	// 	animations
	var _cssAnimationDuration = 225;
	//	resize
	var windowWidth;
	var mediaQuery = 1200; // eg min-width: 1200px "tablet"-ish

	window.addEventListener("load",        Init);
	window.addEventListener("resize",      Init);
	document.body.addEventListener("keydown",     CarouselKeys);
	ListenerAttribution(document.body,     "mousedown",   MouseDown);
	ListenerAttribution(document.body,     "mouseup",     MouseUp);
	ListenerAttribution(_carouselWrapper,  "mouseleave",  MouseLeave);
	ListenerAttribution(_carouselWrapper,  "mousemove",   MouseMove);
	ListenerAttribution(_carouselLeft,     "click",       CarouselLeft);
	ListenerAttribution(_carouselRight,    "click",       CarouselRight);

	function ListenerAttribution(element, event, handler) {
		element.addEventListener(event, function(e){
			if (windowWidth >= mediaQuery && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
				e.preventDefault();
				handler(e);
			}
		});
	}

	function Init(evt) {
		windowWidth = window.innerWidth;
		if (windowWidth >= mediaQuery) {
			_offset                     = 0;
			_paddedScrollWidth          = _carousel.scrollWidth + _offset;
			_carousel.style.width       = _paddedScrollWidth + "px";
			var i = 0;
			var len = _carouselImages.length;
			var centerPosition = 0;
			for(i; i < len; i++){
				centerPosition = _carouselImages[i].offsetLeft + _carouselImages[i].offsetWidth / 2;
				_carouselImages[i].setAttribute("data-initial", centerPosition);
			}
		} else {
			_carousel.removeAttribute("style");
		}
	}

	function CarouselLeft(evt) {
		evt.stopPropagation();
		if (galleryActive) {
			GalleryCycleImages("left", 1);
		} else {
			var initialPosition = _carousel.getAttribute("data-translated") | 0;
			var finalPosition   = initialPosition + _scrollDistance;
			if (finalPosition >= 0){
				CarouselAnimateX(initialPosition, 0, _scrollAnimationDuration, "left");
				//	_carouselLeft.style.opacity = 0;
			} else {
				CarouselAnimateX(initialPosition, finalPosition, _scrollAnimationDuration, "left");
				//	_carouselLeft.style.opacity = 1;
			}
			//	_carouselRight.style.opacity = 1;
		}
	}

	function CarouselRight(evt) {
		evt.stopPropagation();
		if (galleryActive) {
			GalleryCycleImages("right", 1);
		} else {
			var threshold       = ((_carousel.scrollWidth - document.body.scrollWidth) * -1) + _offset;
			var initialPosition = _carousel.getAttribute("data-translated") | 0;
			var finalPosition   = initialPosition - _scrollDistance;
			if (finalPosition <= threshold){
				CarouselAnimateX(initialPosition, threshold, _scrollAnimationDuration, "right");
				//	_carouselRight.style.opacity = 0;
			} else {
				CarouselAnimateX(initialPosition, finalPosition, _scrollAnimationDuration, "right");
				//	_carouselRight.style.opacity = 1;
			}
			//	_carouselLeft.style.opacity = 1;
		}
	}

	function CarouselAnimateX(start, end, animduration, direction) {
		return new Promise(function(resolve, reject) {
			var currentValue;
			var changeInValue = end - start;
			if (changeInValue === 0) {
				// figure out handle to handle for end cases
				// return Promise.reject("bad changeInValue");
				return;
			}
			var totalIterations = animduration * 60;
			var iterationCount = 0;
			function Animate() {
				currentValue = easeOutCubic(iterationCount, start, changeInValue, totalIterations);
				iterationCount++;
				if ((direction === "left" && currentValue < end) || (direction === "right" && currentValue > end)) {
					CarouselTranslateX(currentValue);
				} else {
					resolve();
					return;
				}
				requestAnimationFrame(Animate);
			}
			Animate();
		});
	}

	function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
		return (changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue);
	};

	function CarouselTranslateX(distance) {
		_carousel.style.transform = "translate3d(" + Math.round(distance) + "px,0,0)";
		_carousel.setAttribute("data-translated", Math.round(distance));
	}

	function MouseDown(evt) {
		document.activeElement.blur();
		_mouseClick       = true;
		_mouseDown        = true;
		_mouseCurrentXPos = evt.pageX;
		_mouseMovedTotal  = _carousel.getAttribute("data-translated") | 0;
	}

	function MouseMove(evt) {
		if (!galleryActive && _mouseDown === true) {
			_mouseMoved    = evt.pageX - _mouseCurrentXPos;
			_carouselMoved = _mouseMoved + _mouseMovedTotal;
			SlideCarousel(_carouselMoved);
		}
		_mouseClick = false;
	}

	function SlideCarousel(distance){
		_carousel.style.width = _paddedScrollWidth + "px";
		var threshold = ((_carousel.scrollWidth - document.body.scrollWidth) * -1) + _offset;
		if (distance > 0){
			CarouselTranslateX(0);
		} else if (distance <= threshold){
			CarouselTranslateX(threshold);
		} else {
			CarouselTranslateX(distance);
		}
	}

	function CarouselKeys(evt) {
		var ListenedKeys = [27,35,36,37,39];
		if (windowWidth < mediaQuery || ListenedKeys.indexOf(evt.keyCode) < 0 || evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA'){
			return;
		}

		if (galleryActive) {
			evt.preventDefault();
			switch (evt.keyCode) {
				case 27: // ESC
					GalleryClose();
					break;
				case 35: // End
					GalleryCycleImages("right", Math.abs(SlideCount(_carouselImages.length - 1)));
					break;
				case 36: // Home
					GalleryCycleImages("left", Math.abs(SlideCount(0)));
					break;
				case 37: // Left
					GalleryCycleImages("left", 1);
					break;
				case 39: // Right
					GalleryCycleImages("right", 1);
					break;
			}
		} else {
			switch (evt.keyCode) {
				case 37: // Left
					evt.preventDefault();
					CarouselLeft(evt);
					break;
				case 39: // Right
					evt.preventDefault();
					CarouselRight(evt);
					break;
			}
		}
	}

	function MouseUp(evt) {
		if (_mouseClick){
			if (evt.target.classList.contains("js-vdp-carousel-image")) {
				if (!galleryActive) {
					//	GalleryInit().then(_ => GalleryStart(evt.target));
					GalleryInit().then(function(){GalleryStart(evt.target)});
				} else {
					var countDifference = SlideCount(parseInt(evt.target.getAttribute("data-count")));
					if (countDifference > 0) {
						GalleryCycleImages("right", Math.abs(countDifference));
					} else {
						GalleryCycleImages("left", Math.abs(countDifference));
					}
				}
			} else if (galleryActive && !evt.target.classList.contains("js-gallery-control")) {
				GalleryClose();
			}
		}
		_mouseDown = false;
	}

	function SlideCount(_targetCount){
		galleryActiveImage          = _carousel.querySelector(".gallery-active");
		var galleryActiveImageCount = parseInt(galleryActiveImage.getAttribute("data-count"));
		//	console.log(_targetCount - galleryActiveImageCount);
		return _targetCount - galleryActiveImageCount;
	}

	function MouseLeave(evt) {
		_mouseDown = false;
	}

	function GalleryInit() {
		return new Promise(function(resolve, reject) {
			_carouselWrapper.classList.add("js-gallery-init");
			resolve();
			return;
		});
	}

	function GalleryStart(_image) {
		if (!galleryTransitioning){
			galleryTransitioning   = true;
			galleryActive          = true;							   // set gallery active
			galleryOpeningPosition = _image.offsetLeft;
			GalleryCloneActiveImage(_image);                       // clone image
			_image.classList.add("gallery-active");                // make image active
			_carouselWrapper.classList.add("js-gallery-fade");   // animate to gallery view

			setTimeout(function(){
				_carouselWrapper.classList.add("js-gallery-build");
			}, _cssAnimationDuration);

			setTimeout(function(){
				// more le-stupid (pad 150 extra to account for scaled final image)
				_carousel.style.width = _carousel.scrollWidth + 150 + "px";  // reset carousel width
				GallerySlideToImage(_image);                    // scroll to image
			}, (_cssAnimationDuration * 2));

			setTimeout(function(){
				_carouselWrapper.classList.add("js-gallery-active");
			}, (_cssAnimationDuration * 3));

			setTimeout(function(){
				_carouselWrapper.classList.remove("js-gallery-fade");
				galleryActiveImageClone.parentNode.removeChild(galleryActiveImageClone);
				galleryTransitioning = false;
			}, (_cssAnimationDuration * 4));
		}
	}

	function GalleryCloneActiveImage(image) {
		return new Promise(function(resolve, reject) {
			var x;
			var y = 100;
			var scaleTransform = " scale(2,2)";
			galleryActiveImageClone = image.cloneNode(true);
			galleryActiveImageClone.classList.add("clone");
			//	if clone is hero
			if (image.classList.contains("vdp-carousel-hero")) {
				galleryActiveImageClone.style.height = image.offsetHeight * 2;
				galleryActiveImageClone.style.width = image.offsetWidth * 2;
				y = 0;
				scaleTransform = "";
			}
			//	set initial clone position
			galleryActiveImageClone.style.transform = "translateX(" + image.getBoundingClientRect().left + "px)" + "translateY(" + image.offsetTop + "px)";
			//	place clone
			_carouselWrapper.appendChild(galleryActiveImageClone);
			//	set final clone position
			x = ((document.body.scrollWidth / 2) - (image.offsetWidth / 2));
			galleryActiveImageClone.style.transform = "translateX(" + x + "px)" + "translateY(" + y + "px)" + scaleTransform;
			resolve();
			return;
		});
	}

	function GalleryClose() {
		if (!galleryTransitioning){
			galleryTransitioning = true;
			galleryActiveImage   = _carousel.querySelector(".gallery-active");
			galleryActive        = false;

			_carouselWrapper.classList.add("js-gallery-fade");   // animate to gallery view

			setTimeout(function(){
				_carouselWrapper.classList.remove("js-gallery-active");
				galleryActiveImage.classList.remove("gallery-active");
			}, (_cssAnimationDuration));

			setTimeout(function(){
				_carouselWrapper.classList.remove("js-gallery-build");
				_carousel.style.width = _paddedScrollWidth + "px";
				var distance          = parseInt(galleryActiveImage.getAttribute("data-initial")) - (document.body.scrollWidth / 2);
				SlideCarousel(distance * -1);
			}, (_cssAnimationDuration * 2));

			setTimeout(function(){
				_carouselWrapper.classList.remove("js-gallery-fade");   // animate to gallery view
			}, (_cssAnimationDuration * 3));

			setTimeout(function(){
				_carouselWrapper.classList.remove("js-gallery-init");
				galleryTransitioning = false;
			}, (_cssAnimationDuration * 4));
		}
	}

	function GalleryCycleImages(direction, slideCount) {
		var galleryActiveImage = _carousel.querySelector(".gallery-active");
		var activeCount        = parseInt(galleryActiveImage.getAttribute("data-count"));
		var nextImage          = _carousel.querySelector("[data-count='" + (activeCount + slideCount) + "']");
		var prevImage          = _carousel.querySelector("[data-count='" + (activeCount - slideCount) + "']");

		if (direction === "right" && nextImage) {
			galleryActiveImage.classList.remove("gallery-active");
			nextImage.classList.add("gallery-active");
			GallerySlideToImage(nextImage);
		} else if (direction === "left" && prevImage) {
			galleryActiveImage.classList.remove("gallery-active");
			prevImage.classList.add("gallery-active");
			GallerySlideToImage(prevImage);
		}
	}

	function GallerySlideToImage(_image){
		if(parseInt(_image.getAttribute("data-count")) === 0){
			_carousel.classList.add("le-stupid");
		} else {
			_carousel.classList.remove("le-stupid");
		}
		var imagePosition = _image.offsetLeft;
		var desiredEndPosition = (document.body.scrollWidth / 2) - (_image.offsetWidth / 2);
		var slideDistance = imagePosition - desiredEndPosition;
		var translation = slideDistance * -1;
		CarouselTranslateX(translation);
	}

	//	function FadeControl() {
	//		if (_carousel.scrollLeft < _scrollVisibilityThreshold) {
	//			_carouselLeft.style.opacity = Normalize(_carousel.scrollLeft,0,_scrollVisibilityThreshold,0,1);
	//		}
	//	}

	//	function Normalize(oldValue,oldMin, oldMax, newMin, newMax) {
	//		//	http://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
	//		var _oldMin   = oldMin;
	//		var _oldMax   = oldMax;
	//		var _oldRange = _oldMax - _oldMin;
	//		var _oldValue = oldValue;

	//		var _newMin   = 0;
	//		var _newMax   = 1;
	//		var _newRange = _newMax - _newMin;
	//		var _newValue = ((_oldValue - _oldMin) * _newRange / _oldRange) + _newMin;

	//		return _newValue;
	//	};

})();

/*
 * Vdp Modals - TEMP
 */
(function(){
	var modalTrigger = $(".js-vdp-modal");
	var modalTarget;
	var modalTitle;
	var modalEmail;
	var modalInput;
	var _self;

	modalTrigger.on("click", function(evt) {
		evt.preventDefault();

		_self       = this;
		modalTarget = $(_self).attr("data-open");
		modalTitle  = $(_self).attr("data-title");
		modalEmail  = $(_self).attr("data-email");

		//	presumptuous much...
		if (modalEmail) {
			modalInputVal = $(modalEmail).val();
			$(modalTarget).find("#txtEmail").val(modalInputVal);
		} else {
			$(modalTarget).find("#txtEmail").val("");
		}

		$(modalTarget).modal("show");
		$(modalTarget +  " #defaultEPriceTitle").text(modalTitle);
	});
})();
/*
 * Vdp Disable Nav Links - TEMP
 */
(function() {
	var navLinks = $(".js-vdp-navbar");
	navLinks.on("click", function(evt) {
		evt.preventDefault();
	});
})();
