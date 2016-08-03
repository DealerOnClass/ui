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
		_vdpBodyContainer  = document.querySelector(".js-vdp-body-container");
	//	carousel controls
	var _scrollAnimationSpeed      = 500,
		_scrollVisibilityThreshold = 400,
		_scrollWidth 			   = 0;
	//	offset control
	var _gutter	= 15,
		_offset = 0;
	//	mouse move
	var _clickXPos  = 0,
		_scrollXPos = 0,
		_previousMouseX,
		_currentMouseX,
		_distanceTravelled;
	//	mouse down
	var	_curDown    = false;
	//	carousel start
	var _isClick	= true,
		_galleryActive = false,
		_opacityAnim = 500,
		_parentItem,
		_imageClone;

	window.addEventListener('load', OffsetControl);
	window.addEventListener('resize', OffsetControl);
	_carousel.addEventListener('scroll', FadeControl);
	_carousel.addEventListener('mousemove', MouseMove);
	_carousel.addEventListener('mousedown', MouseDown);
	_carousel.addEventListener('mouseup', MouseUp);
	_carousel.addEventListener('mouseleave', MouseLeave);
	_carouselLeft.addEventListener('click', ScrollLeft);
	_carouselRight.addEventListener('click', ScrollRight);

	function OffsetControl(evt) {
		_scrollWidth = _carousel.scrollWidth;
		_offset = _vdpBodyContainer.offsetLeft + _gutter;
		_carousel.style.paddingLeft = _offset + "px";
	}

	function ScrollLeft(evt) {
		evt.preventDefault();
		if (_galleryActive) {
			//GalleryLeft();
			$carousel.animate({
				scrollLeft: '-=500'
			}, _scrollAnimationSpeed);
		} else {
			$carousel.animate({
				scrollLeft: '-=500'
			}, _scrollAnimationSpeed);
		}
	}

	function ScrollRight(evt) {
		evt.preventDefault();
		if (_galleryActive) {
			//GalleryRight();
			$carousel.animate({
				scrollLeft: '+=500'
			}, _scrollAnimationSpeed);
		} else {
			$carousel.animate({
				scrollLeft: '+=500'
			}, _scrollAnimationSpeed);
		}
	}

	function MouseMove(evt) {
		evt.preventDefault();
		if (_curDown === true) {
			_isClick = false;
			_previousMouseX    = _clickXPos;
			_currentMouseX     = _scrollXPos - evt.pageX;
			_distanceTravelled = _currentMouseX + _previousMouseX;
			ScrollToLeft(_carousel, _distanceTravelled);
		}
	}

	function ScrollToLeft(el, distance) {
		el.scrollLeft = distance;
	}

	function MouseDown(evt) {
		evt.preventDefault();
		_isClick = true;
		_clickXPos = evt.pageX;
		_scrollXPos = _carousel.scrollLeft;
		_curDown = true;
	}

	function MouseUp(evt) {
		if (_isClick){
			if (_galleryActive) {
				return;
				//	if (evt.target.classList.contains("js-gallery-image-clone") == false) {
				//		GalleryClose();
				//		_galleryActive = false;
				//		_curDown = false;
				//	} else {
				//		_curDown = false;
				//		return;
				//	}
			} else {
				GalleryStart(evt.target);
			}
		}
		_curDown = false;
	}

	function MouseLeave(evt) {
		_curDown = false;
	}

	function GalleryStart(_image) {
		_galleryActive = true;
		//	TODO: make it scale to size, instead of opacity
		if (_carouselLeft.style.opacity != "1") {
			_carouselLeft.style.opacity = "1";
		}
		_carousel.classList.add("js-gallery-init");
		_imageClone = _image.cloneNode(true);
		//	B
		_imageClone.style.left = _image.getBoundingClientRect().left + "px";
		//	A
		//	_imageClone.style.transform = 'translate3d(' + _image.getBoundingClientRect().left + "px,0,0)";
		_imageClone.style.top = _image.offsetTop + "px";
		_imageClone.classList.add("js-gallery-image-clone");
		_image.classList.add("js-gallery-image-clicked");
		_carousel.appendChild(_imageClone);

		var test = (window.innerWidth / 2) - ((_image.offsetWidth * 2) / 2);

		setTimeout(function() {
			$(".js-gallery-image-clone").addClass("animated");
			//	A
			//	$(".js-gallery-image-clone").css('transform', 'translate3d(' + test + "px,0,0)");
			//	B
			$(".js-gallery-image-clone").css("left", test + "px");
	    }, 150);

		setTimeout(function() {
			_carousel.classList.add("js-gallery-active");
	    }, 250);

		setTimeout(function() {
			var elW = _image.offsetWidth;
			var elS = _image.offsetLeft;
			var win = window.innerWidth;
			$carousel.animate({
				scrollLeft: elS - ((win / 2) - (elW / 2))
			}, 500);
		}, 500);

	}

	//	function GalleryClose() {
	//		_carousel.classList.remove("js-gallery-active");
	//		$(".js-gallery-image-active").removeClass("js-gallery-image-active");
	//	}

	function GalleryLeft() {
		console.log("prev item");
	}

	function GalleryRight() {
		console.log("next item");
		//	$("js-gallery-image-clicked");
	}

	function FadeControl() {
		if (_carousel.scrollLeft < _scrollVisibilityThreshold) {
			_carouselLeft.style.opacity = Normalize(_carousel.scrollLeft,0,_scrollVisibilityThreshold,0,1);
		}
		//	//	Determine end of scroll && fade for controlRight
		//	console.log(_carousel.scrollLeft);
		//	console.log(_carousel.offsetWidth + _offset);
		//	console.log(_carousel.scrollLeft - _carousel.offsetWidth);
		//	//	if () {
		//	//		//	_carouselRight.style.opacity = Normalize(_carousel.scrollLeft,0,_scrollVisibilityThreshold,0,1);
		//	//		console.log("chicken is good");
		//	//	}
	}

	function Normalize(oldValue,oldMin, oldMax, newMin, newMax) {
		//	http://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another

		var _oldMin   = oldMin;
		var _oldMax   = oldMax;
		var _oldRange = _oldMax - _oldMin;
		var _oldValue = oldValue; //

		var _newMin   = 0;
		var _newMax   = 1;
		var _newRange = _newMax - _newMin;
		var _newValue = ((_oldValue - _oldMin) * _newRange / _oldRange) + _newMin;

		return _newValue;
	}

})();

