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
		_galleryActive = false,
		_opacityAnim = 500,
		_imageClone;

	window.addEventListener('load', GalleryInit);
	window.addEventListener('load', OffsetInit);
	window.addEventListener('resize', GalleryInit);
	window.addEventListener('resize', OffsetInit);
	_carousel.addEventListener('mousedown', MouseDown);
	_carousel.addEventListener('mouseleave', MouseLeave);
	_carousel.addEventListener('mousemove', MouseMove);
	_carousel.addEventListener('mouseup', MouseUp);
	_carouselLeft.addEventListener('click', CarouselLeft);
	_carouselRight.addEventListener('click', CarouselRight);

	function OffsetInit(evt) {
		_offset                     = _vdpBodyContainer.offsetLeft + _gutter;
		_carousel.style.paddingLeft = _offset + "px";
		CarouselSetWidth();
	}

	function CarouselSetWidth() {
		_scrollWidth          = _carousel.scrollWidth;
		_carousel.style.width = _scrollWidth + _offset + "px";
	}

	function CarouselLeft(evt) {
		evt.preventDefault();
		if (_galleryActive) {
			GalleryLeft();
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
		if (_galleryActive) {
			GalleryRight();
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
			if (!_galleryActive) {
				GalleryStart(evt.target);
			}
		}
		_mouseDown = false;
	}

	function MouseLeave(evt) {
		_mouseDown = false;
	}

	function GalleryInit() {
		_carouselImages.forEach(function(current_value){
			current_value.style.transform = "translateX(" + current_value.offsetLeft + "px)" + "translateY(" + current_value.offsetTop + "px)";
			current_value.style.width  = current_value.offsetWidth + "px";
			current_value.style.height = current_value.offsetHeight + "px";
		});
		_carousel.classList.add("js-gallery-init");
	}

	function GalleryStart(_image) {
		_galleryActive    = true;
		var top, width, height, test, count, scroll;
		var leftIncrement = 0;
		var offset        = 300;
		var _carImages    = document.querySelectorAll(".js-vdp-carousel-image");
		//	_imageClone       = _image.cloneNode(true);
		//	_imageClone.classList.add("clone");
		//	_image.parentElement.insertBefore(_imageClone, _image);
		//	_image.classList.add("active");
		_carousel.classList.add("js-gallery-active");

		_carImages.forEach(function(current_value){
			width = current_value.style.width;
			height = current_value.style.height;
			if (current_value.parentElement.classList.contains("hero")) {
				current_value.style.width = (parseInt(width) / 2) + "px";
				current_value.style.height = (parseInt(height) / 2) + "px";
			} else if (current_value === _imageClone) {
				current_value.style.width = (parseInt(width) * 2) + "px";
				current_value.style.height = (parseInt(height) * 2) + "px";
			} else {
				current_value.style.width = width + "px";
				current_value.style.height = height + "px";
			}
			leftIncrement += offset;
			current_value.style.transform = "translateX(" + leftIncrement + "px)" + "translateY(100px)";
		});

		setTimeout(function() { CarouselSetWidth(); }, 1000);

		//	count = parseInt(_image.getAttribute("id"));
		//	if (count === 0) {
		//		scroll = count;
		//	} else {
		//		scroll = count * (offset + _image.offsetWidth);
		//	}
		//	var initialPosition = _carousel.getAttribute("data-translated") | 0;
		//	CarouselAnimateX(initialPosition, scroll, 0.5, "right");
	}

	function GalleryClose() {
		_carousel.classList.remove("js-gallery-active");
		$(".js-gallery-image-active").removeClass("js-gallery-image-active");
	}

	function GalleryLeft() {
		console.log("prev item");
	}

	function GalleryRight() {
		console.log("next item");
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
