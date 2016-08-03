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
		$carousel          = $(carousel),
		_carousel          = document.querySelector(carousel),
		_carouselLeft      = document.querySelector(".js-control-left"),
		_carouselRight     = document.querySelector(".js-control-right"),
		_carouselFirst     = document.querySelector(".js-hero"),
		_vdpBodyContainer  = document.querySelector(".js-vdp-body-container");
	//	carousel controls
	var _scrollAnimationSpeed      = 500,
		_scrollVisibilityThreshold = 400;
	//	offset control
	var _offsetThreshold = 0,
		_isOffset  = false;
		_gutter	   = 15;
	//	mouse direction function
	var _oldPos = 0,
		_direction = "";
	//	mouse move function
	var _clickXPos  = 0,
		_previousMouseX,
		_currentMouseX,
		_distanceTravelled,
		_magicNumber = 0,
		_scrollXPos = 0;
	//	mouse down function
	var	_curDown    = false;
	//	carousel transform
	var _offset	= 0;
	//	sillyness
	var _simpleSolution = true;

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
		if (_isOffset) {
			_offsetThreshold = _vdpBodyContainer.offsetLeft + _gutter;
			_carousel.style.transform = "translate3d(" + _offsetThreshold + "px,0,0)";
		}
		if (_simpleSolution) {
			_carouselFirst.style.width = _vdpBodyContainer.offsetLeft + _gutter + "px";
		}
	}

	function ScrollLeft(evt) {
		evt.preventDefault();
		$carousel.animate({
			scrollLeft: '-=500'
		}, _scrollAnimationSpeed);
	}

	function ScrollRight(evt) {
		evt.preventDefault();
		$carousel.animate({
			scrollLeft: '+=500'
		}, _scrollAnimationSpeed);
	}

	function MouseDirection(evt) {
		evt.preventDefault();
		if (_oldPos < evt.pageX) {
			_direction = "right";
		} else if (_oldPos > evt.pageX) {
			_direction = "left";
		}
		_oldPos = evt.pageX;
		return _direction;
	}

	function MouseMove(evt) {
		evt.preventDefault();
		if (_curDown === true) {

			if (_simpleSolution) {
				console.log("simple solution used");
			} else {
				var rightPos = 0;
				var distanceRight = _carousel.getAttribute("total-distance-right") | 0;
				var leftPos = 0;
				var distanceLeft = _carousel.getAttribute("total-distance-left") | 0;

				var distancemoving = (_clickXPos - evt.pageX);
				var alreadymovedright = _carousel.getAttribute("alreadymovedright") | 0;
				var alreadymovedleft = _carousel.getAttribute("alreadymovedleft") | 0;

				_carousel.setAttribute("origin", _clickXPos);
				_carousel.setAttribute("current", evt.pageX);
				_carousel.setAttribute("distancemoving", Math.abs(distancemoving));

				if (MouseDirection(evt) === "right") {
					var moveright = alreadymovedleft + distancemoving;
					_carousel.setAttribute("alreadymovedright", moveright);
					_carousel.setAttribute("alreadymovedleft", 0);
				}
				if (MouseDirection(evt) === "left") {
					var moveleft = alreadymovedright + distancemoving;
					_carousel.setAttribute("alreadymovedleft", moveleft);
					_carousel.setAttribute("alreadymovedright", 0);
				}

				//	if (MouseDirection(evt) === "right") {
				//		if (restart) {
				//			console.log("reseting");
				//			//	rightPos = distanceLeft + (_clickXPos - evt.pageX) * -1;
				//		} else {
				//			console.log("continuing");
				//			//	rightPos = distanceLeft + (_clickXPos - evt.pageX) * -1;
				//		}
				//		_carousel.setAttribute("origin", _clickXPos);
				//		_carousel.setAttribute("current", evt.pageX);
				//		_carousel.setAttribute("total-distance-right", rightPos);
				//		//	netDisplacement = currentDisplacment + (_clickXPos - evt.pageX) * -1;
				//	}
				//	if (MouseDirection(evt) === "left") {
				//		restart = true;
				//	}
					// reset your origin ie. clickpos here
					// my current needs to become my origin...
						//	_carousel.getAttribute("origin", 0);
						//	_carousel.getAttribute("current", 0);

				//	if (MouseDirection(evt) === "left" ) {
				//		var makeRightZero = 0;
				//		leftPos = Math.abs(distanceRight + (_clickXPos - evt.pageX));
				//		_carousel.setAttribute("total-distance-left", leftPos);
				//		//	netDisplacement = currentDisplacment + (_clickXPos - evt.pageX);
				//	}

				//	console.log(makeRightZero);
				//	console.log(makeLeftZero);

				//displacement = displacement + (distanceLeft - distanceRight);
				//	_carousel.setAttribute("displacement", displacement + (_clickXPos - evt.pageX));

				//	if(displacement === _offsetThreshold){
				//		//you need to scroll
				//	}
			}
		}

		//	if (_curDown === true) {

		//		_previousMouseX    = _clickXPos;
		//		_currentMouseX     = _scrollXPos - evt.pageX;
		//		_distanceTravelled = _currentMouseX + _previousMouseX;

		//		var _offset = _carousel.getAttribute("data-offset") | 0;
		//		var _offsetLast = _carousel.getAttribute("data-offset-last") | 0;
		//		var _scroll = _carousel.getAttribute("data-scroll") | 0;
		//		var _scrollLast = _carousel.getAttribute("data-scroll-last") | 0;
		//		var magic = _carousel.getAttribute("data-scroll-magic") | 0;

		//		var somethingElse = _offsetThreshold;
		//		var _dataOffset = 0;

		//		if (_distanceTravelled > 0) {
		//			if (_offset < _offsetThreshold) {
		//				somethingElse = _distanceTravelled + _offsetLast;
		//			} else {
		//				if (_scrollLast === 0) {
		//					_scroll = _distanceTravelled - _offsetThreshold;
		//					if (_scroll < 0) {
		//						console.log("NOOOO");
		//					}
		//					console.log(_distanceTravelled);
		//					console.log(_scroll);
		//					console.log("first scroll");
		//				} else {
		//					_scroll = _distanceTravelled;
		//					console.log("you've scrolled before");
		//				}
		//			}
		//			_dataOffset = somethingElse > _offsetThreshold ? _offsetThreshold : somethingElse;
		//			_carousel.setAttribute("data-offset", _dataOffset);
		//			_carousel.setAttribute("data-scroll", _scroll);
		//			_carousel.setAttribute("data-scroll-magic", _scroll);
		//		} else {
		//			if (_dataOffset >= 0) {
		//				_offset = _distanceTravelled + _offsetLast;
		//				_dataOffset = _offset <= 0 ? 0 : _offset;
		//			}
		//			_carousel.setAttribute("data-offset", _dataOffset);
		//			_carousel.setAttribute("data-scroll", 0);
		//		}

		//		_carousel.style.transform = "translate3d("+ (_offsetThreshold - _dataOffset) +"px,0,0)";
		//		_carousel.scrollLeft = _scroll;
		//	}
	}

	function TranslateX(el, distance) {
		el.style.transform = "translate3d(" + distance + "px,0,0)";
	}

	function ScrollLeft(el, distance) {
		el.scrollLeft = distance;
	}

	function MouseDown(evt) {
		evt.preventDefault();
		_clickXPos = evt.pageX;
		_scrollXPos = _carousel.scrollLeft;
		_curDown = true;
	}

	function MouseUp(evt) {
		//	_carousel.setAttribute("data-offset-last", (_carousel.getAttribute("data-offset") | 0));
		//	_carousel.setAttribute("data-scroll-last", (_carousel.getAttribute("data-scroll") | 0));
			//	_carousel.setAttribute("total-distance-right", 0);
			//	_carousel.setAttribute("total-distance-left", 0);
		//	_carousel.setAttribute("alreadymovedleft", 0);
		//	_carousel.setAttribute("alreadymovedright", 0);
		_curDown = false;
	}

	function MouseLeave(evt) {
		_curDown = false;
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
		var _oldValue = oldValue; //

		var _newMin   = 0;
		var _newMax   = 1;
		var _newRange = _newMax - _newMin;
		var _newValue = ((_oldValue - _oldMin) * _newRange / _oldRange) + _newMin;

		return _newValue;
	}

})();

