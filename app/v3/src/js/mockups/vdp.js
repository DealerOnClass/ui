/*
 * Vdp Lazy Load Images
 */
//	(function(){
//		var bLazy = new Blazy({
//			selector: '.vdp-carousel-image',
//			success: function(ele){
//				// Image has loaded
//				// Do your business here
//			}
//		   , error: function(ele, msg){
//			  if(msg === 'missing'){
//				  console.log("Data-src is missing");
//			  }
//			  else if(msg === 'invalid'){
//				  console.log("Data-src is invalid");
//			  }
//		  }
//		});
//	})();
/*
 * Vdp Price Drop
 */
(function(){
	var _priceDrop     = document.querySelector(".js-vdp-sidebar-notifications-pricedrop");
	var _priceDropLink = document.querySelector(".js-vdp-sidebar-notifications-pricedrop-link");
	var _delay         = 2000;
	var _isVisible	   = true;

	_priceDropLink.addEventListener('click', function(event){
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
	var carousel           = ".js-vdp-carousel",
		carouselLeft	   = ".js-control-left",
		$carousel          = $(carousel),
		$carouselLeft	   = $(carouselLeft),
		_carousel          = document.querySelector(carousel),
		_carouselLeft      = document.querySelector(carouselLeft),
		_carouselRight     = document.querySelector(".js-control-right"),
		_carouselImages    = document.querySelectorAll(".js-vdp-carousel-image"),
		_vdpBodyContainer  = document.querySelector(".js-vdp-body-container");
		_galleryActiveItem = document.querySelector(".gallery-active");
	//	carousel controls
	var _scrollAnimationDuration   = 250,
		_scrollVisibilityThreshold = 400,
		_scrollDistance			   = 300,
		_scrollWidth 			   = 0;
	//	offset control
	var _gutter	= 15,
		_offset;
	//	mouse move
	var _carouselMoved,
		_mouseMoved,
		_mouseMovedTotal,
		_mouseCurrentXPos,
		_threshold;
	//	mouse down
	var	_mouseDown    = false;
	//	carousel start
	var _mouseClick	= true,
		_opacityAnim = 500,
		_imageClone;
	//	gallery animation
	var galleryActive = false,
		galleryXOffset = 0,
		galleryXGutter = 30,
		galleryYCenter = 0,
		galleryPrevious,
		galleryCurrent,
		galleryNext,
		galleryCounter = 0,
		value = 0,
		selector, top, width, height;

	window.addEventListener('load', Init);
	window.addEventListener('resize', Init);
	_carousel.addEventListener('mousedown', MouseDown);
	_carousel.addEventListener('mouseleave', MouseLeave);
	_carousel.addEventListener('mousemove', MouseMove);
	_carousel.addEventListener('mouseup', MouseUp);
	_carouselLeft.addEventListener('click', CarouselLeft);
	_carouselRight.addEventListener('click', CarouselRight);

	function Init(evt) {
		OffsetInit().then(_ => CarouselSetWidth());
	}

	function OffsetInit(evt) {
		return new Promise(function(resolve, reject) {
			_offset                     = _vdpBodyContainer.offsetLeft + _gutter;
			//	_carousel.style.paddingLeft = _offset + "px";
			resolve();
			return;
		});
	}

	function CarouselSetWidth() {
		_scrollWidth          = _carousel.scrollWidth;
		_carousel.style.width = _scrollWidth + _offset + "px";
	}

	function CarouselLeft(evt) {
		evt.preventDefault();
		if (galleryActive) {
			GalleryPrev();
		} else {
			var initialPosition = _carousel.getAttribute("data-translated") | 0;
			var finalPosition   = initialPosition + _scrollDistance;
			if (finalPosition >= 0){
				CarouselAnimateX(initialPosition, 0, 0.5, "left").then(_ => alert("yup"));
				//	_carouselLeft.style.opacity = 0;
			} else {
				CarouselAnimateX(initialPosition, finalPosition, 0.5, "left");
				//	_carouselLeft.style.opacity = 1;
			}
			//	_carouselRight.style.opacity = 1;
		}
	}

	function CarouselRight(evt) {
		evt.preventDefault();
		if (galleryActive) {
			GalleryNext();
		} else {
			var threshold       = ((_carousel.scrollWidth - document.body.scrollWidth) * -1) + _offset;
			var initialPosition = _carousel.getAttribute("data-translated") | 0;
			var finalPosition   = initialPosition - _scrollDistance;
			if (finalPosition <= threshold){
				CarouselAnimateX(initialPosition, threshold, 0.5, "right").then(_ => alert("yup"));
				//	_carouselRight.style.opacity = 0;
			} else {
				CarouselAnimateX(initialPosition, finalPosition, 0.5, "right");
				//	_carouselRight.style.opacity = 1;
			}
			//	_carouselLeft.style.opacity = 1;
		}
	}

	function CarouselAnimateX(start, end, duration, direction) {
		return new Promise(function(resolve, reject) {
			var currentValue;
			var changeInValue = end - start;
			if (changeInValue === 0) {
				return Promise.reject("bad changeInValue");
			}
			var totalIterations = duration * 60;
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
		_carousel.style.transform = "translate3d(" + distance + "px,0,0)";
		_carousel.setAttribute("data-translated", distance);
	}

	function MouseDown(evt) {
		evt.preventDefault();
		_mouseClick       = true;
		_mouseDown        = true;
		_mouseCurrentXPos = evt.pageX;
		_mouseMovedTotal  = _carousel.getAttribute("data-translated") | 0;
	}

	function MouseMove(evt) {
		evt.preventDefault();
		if (_mouseDown === true) {
			_mouseClick    = false;
			_mouseMoved    = evt.pageX - _mouseCurrentXPos;
			_carouselMoved = _mouseMoved + _mouseMovedTotal;
			_threshold     = ((_carousel.scrollWidth - document.body.scrollWidth) * -1) + _offset;

			if (_carouselMoved > 0){
				CarouselTranslateX(0);
				//	_carouselRight.style.opacity = 0;
			} else if (_carouselMoved <= _threshold){
				CarouselTranslateX(_threshold);
				//	_carouselLeft.style.opacity = 0;
			} else {
				CarouselTranslateX(_carouselMoved);
				//	_carouselLeft.style.opacity = 1;
				//	_carouselLeft.style.opacity = 1;
			}
		}
	}

	function MouseUp(evt) {
		if (_mouseClick){
			if (!galleryActive) {
				GalleryInit().then(_ => GalleryStart(evt.target));
			} else {
				if (!evt.target.classList.contains("js-vdp-carousel-image")) {
					GalleryClose();
				}
			}
		}
		_mouseDown = false;
	}

	function MouseLeave(evt) {
		_mouseDown = false;
	}

	function GalleryInit() {
		return new Promise(function(resolve, reject) {
			////	_carouselImages.forEach(function(current_value){
			////		current_value.style.transform = "translateX(" + current_value.offsetLeft + "px)" + "translateY(" + current_value.offsetTop + "px)";
			////		current_value.style.width  = current_value.offsetWidth + "px";
			////		current_value.style.height = current_value.offsetHeight + "px";
			////	});
			_carousel.classList.add("js-gallery-init");
			resolve();
			return;
		});
	}

	function GalleryStart(_image) {
		galleryActive    = true;
		_image.classList.add("gallery-active");

		// animation happens
		_carousel.classList.add("js-gallery-active");

		CarouselSetWidth();
		

		var initialPosition = 0;
		var imagePosition = _image.offsetLeft;
		var desiredEndPosition = (document.body.scrollWidth / 2) - (_image.offsetWidth / 2);
		var slideDistance = imagePosition - desiredEndPosition;		console.log(slideDistance);
		

		var finalPosition = slideDistance * -1		
		CarouselTranslateX(finalPosition);
	}

	function GalleryClose() {
		_carousel.classList.remove("js-gallery-active");
	}

	function GalleryPrev() {
		GalleryCycleImages("prev");
	}

	function GalleryNext() {
		GalleryCycleImages("next");
	}

	function GalleryCycleImages(direction) {
		var activeImage = _carousel.querySelector(".gallery-active");
		var activeCount = parseInt(activeImage.getAttribute("data-count"));
		var nextImage = _carousel.querySelector("[data-count='" + (activeCount + 1) + "']");
		var prevImage = _carousel.querySelector("[data-count='" + (activeCount - 1) + "']");

		if (direction === "next" && nextImage) {
			//	if(prevImage){
			//		prevImage.classList.remove("gallery-prev");
			//	}
			//
			//	activeImage.classList.add("gallery-prev");
			//	activeImage.classList.remove("gallery-active");

			//	var advanceItem = _carousel.querySelector("#vdp-carousel-image-" + (parseInt(nextImage.getAttribute("data-count")) + 1));

			//	nextImage.classList.add("gallery-active");
			//	nextImage.classList.remove("gallery-next");

			//	if(advanceItem){
			//		advanceItem.classList.add("gallery-next");
			//	}
		} else if (direction === "prev" && prevImage) {
			//	if(nextImage){
			//		nextImage.classList.remove("gallery-next");
			//	}

			//	activeImage.classList.add("gallery-next");
			//	activeImage.classList.remove("gallery-active");

			//	var advanceItem = _carousel.querySelector("#vdp-carousel-image-" + (parseInt(prevImage.getAttribute("data-count")) - 1));

			//	prevImage.classList.add("gallery-active");
			//	prevImage.classList.remove("gallery-prev");

			//	if(advanceItem){
			//		advanceItem.classList.add("gallery-prev");
			//	}
		}
	}

	var nextEvent = new CustomEvent(
		"next",
		{
			bubbles: true,
			cancelable: true
		}
	);

	var prevEvent = new CustomEvent(
		"prev",
		{
			bubbles: true,
			cancelable: true
		}
	);

	function GalleryAnimateImages(images, image) {
		return new Promise(function(resolve, reject) {
			images.forEach(function(current_value, index, array){
				width = parseInt(current_value.style.width);
				height = parseInt(current_value.style.height);

				var stupid;
				if (current_value.parentElement.classList.contains("hero")) {
					SetDimensions(current_value, (height / 2), (width / 2));
					galleryYCenter = ((_carousel.offsetHeight / 2) - (image.offsetHeight / 2));

					galleryXOffset += current_value.offsetWidth + galleryXGutter;
					current_value.setAttribute("data-translated", galleryXOffset);
					current_value.style.transform = "translateX(" + galleryXOffset + "px)" + "translateY(" + galleryYCenter + "px)";
				} else if (current_value === image) {
					SetDimensions(current_value, (height * 2), (width * 2));
					galleryYCenter = 0;
					//
					current_value.classList.add("gallery-active");
					console.log(current_value.offsetWidth);
					//	galleryXOffset += image.offsetWidth;
					current_value.setAttribute("data-translated", (galleryXOffset + (galleryXGutter / 2)));
					current_value.style.transform = "translateX(" + (galleryXOffset + (galleryXGutter / 2)) + "px)" + "translateY(" + galleryYCenter + "px)";
				} else {
					SetDimensions(current_value, height, width);
					galleryYCenter = ((_carousel.offsetHeight / 2) - (image.offsetHeight / 2));

					galleryXOffset += current_value.offsetWidth + galleryXGutter;
					current_value.setAttribute("data-translated", galleryXOffset);
					current_value.style.transform = "translateX(" + galleryXOffset + "px)" + "translateY(" + galleryYCenter + "px)";
				}

				//	if (current_value === image) {
				//		current_value.classList.add("gallery-active");
				//		//	galleryPrevious = array[index - 1];
				//		//	galleryCurrent = array[index];
				//		//	galleryNext = array[index + 1];
				//		//	galleryPrevious.classList.add("gallery-prev");
				//		//	galleryCurrent.classList.add("gallery-active");
				//		//	galleryNext.classList.add("gallery-next");
				//	}
			});
			resolve();
			return;
		});
	}

	function SetDimensions(el, height, width) {
		el.style.height = height + "px";
		el.style.width = width + "px";
	}

	function FadeControl() {
		if (_carousel.scrollLeft < _scrollVisibilityThreshold) {
			_carouselLeft.style.opacity = Normalize(_carousel.scrollLeft,0,_scrollVisibilityThreshold,0,1);
		}
	}

	function Normalize(oldValue,oldMin, oldMax, newMin, newMax) {
		//	http://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
		var _oldMin   = oldMin;
		var _oldMax   = oldMax;
		var _oldRange = _oldMax - _oldMin;
		var _oldValue = oldValue;

		var _newMin   = 0;
		var _newMax   = 1;
		var _newRange = _newMax - _newMin;
		var _newValue = ((_oldValue - _oldMin) * _newRange / _oldRange) + _newMin;

		return _newValue;
	}
})();
