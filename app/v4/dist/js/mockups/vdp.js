/*
 * Carousel Declaration
 */
var Carousel = (function(){

	var carousel          = document.querySelector(".carousel");
	var carouselOuter     = document.querySelector(".carousel__outer");
	var carouselInner     = document.querySelector(".carousel__inner");
	var carouselItems     = document.querySelectorAll(".carousel__item");
	var carouselItemHero  = document.querySelectorAll(".carousel__item--hero");
	var carouselControls  = document.querySelector(".carousel__controls");
	var carouselLeft	  = document.querySelector(".carousel__control--left");
	var carouselRight	  = document.querySelector(".carousel__control--right");

	var carouselMaxHeight = 400;
	var carouselRows      = 2;
	var carouselIncrement = 500;
	var imageAspecRatio   = 4/3;
	var carouselHeroWidth = carouselMaxHeight * imageAspecRatio;
	var carouselItemWidth = carouselHeroWidth / carouselRows;
	//	TODO options for controls.

	var galleryActive     = false;
	var galleryActiveBCR;
	var galleryActiveX	  = 0;
	var galleryActiveY	  = 0;

	var _mouseClick       = true;
	var _mouseDown        = false;
	var _mouseCurrentXPos = 0;
	var _carouselMovedTotal  = carouselOuter.getAttribute("data-translated") | 0;

	var _offset 		  = 0;

	//
	//	Initializer Functions
	//
	Init = function() {
		AddEventListeners();
		CarouselImageInit();
		CarouselControlsInit();
	}
	//
	//	All Event Listeners
	//
	AddEventListeners = function() {
		//	document.body.addEventListener("keydown", KeyDown);
		carousel.addEventListener("mousedown", MouseDown);
		carousel.addEventListener("mousemove", MouseMove);
		carousel.addEventListener("mouseup", MouseUp);
		carousel.addEventListener("mouseleave", MouseLeave);
		carouselOuter.addEventListener("transitionend", TransitionEnd);
		carouselLeft.addEventListener("click", CarouselPrev);
		carouselRight.addEventListener("click", CarouselNext);
	}

	//	KeyDown = function(evt) {
	//		switch (evt.keyCode) {
	//			case 37: // Left
	//				console.log("left");
	//				break;
	//			case 39: // Right
	//				console.log("right");
	//				break;
	//		}
	//	}

	//
	//	Mouse Events
	//
	MouseDown = function(evt) {
		evt.preventDefault();
		_mouseClick       = true;
		_mouseDown        = true;
		_mouseCurrentXPos = evt.pageX;
		_carouselMovedTotal  = carouselOuter.getAttribute("data-translated") | 0;
	}

	MouseMove = function(evt) {
		//	if gallery is not active and I'm holding the click
		if (!galleryActive && _mouseDown === true) {
			//	if the mouse has moved
			if ((evt.pageX - _mouseCurrentXPos) !== 0) {
				//	drag the carousel
				CarouselDragging(true);
				CarouselSlideX((evt.pageX - _mouseCurrentXPos) + _carouselMovedTotal);
				_mouseClick = false;
			} else {
				_mouseClick = true;
			}
		}
	}

	MouseUp = function(evt) {
		//	if I just clicked
		if (_mouseClick) {
			//	if gallery is not active
			if (!galleryActive) {
				//	if target is carousel image
				if (evt.target.classList.contains("carousel__image")) {
					//	start gallery
					GalleryStart(evt.target);
				}
			} else {
				//	if target is not carousel image
				if (!evt.target.classList.contains("carousel__image")) {
					//	close gallery
					GalleryClose();
				}
			}
		}
		CarouselDragging(false);
		_mouseDown = false;
	}

	MouseLeave = function(evt) {
		CarouselDragging(false);
		_mouseDown = false;
	}

	//
	//	Controls
	//
	CarouselControlsHide = function() {
		carouselControls.classList.add("carousel__controls--hidden");
	}

	CarouselControlsShow = function() {
		carouselControls.classList.remove("carousel__controls--hidden");
	}

	CarouselControlsInit = function() {
		carouselControls.style.top = (carouselMaxHeight / 2) + "px";
	}

	TransitionEnd = function() {
		CarouselControlsShow();
	}

	//
	//	Carousel
	//
	CarouselDragging = function(isDragging) {
		if (isDragging) {
			CarouselControlsHide();
			carouselOuter.classList.add("dragging");
		} else {
			CarouselControlsShow();
			carouselOuter.classList.remove("dragging");
		}
	}

	CarouselImageInit = function() {
		var i = 0;
		var l = carouselItems.length;
		var carouselItemOffsetX = 0;
		var stack;
		for (i; i < l; i++) {
			stack = i%carouselRows;
			if (i === 0) {
				carouselItemOffsetX += carouselHeroWidth;
			} else if (((i-1) % carouselRows) === 0) {
				carouselItemOffsetX += carouselItemWidth;
			}
			if (i === 0) {
				carouselItems[i].style.transform = "translateX(" + (carouselItemOffsetX - carouselHeroWidth) + "px)";
				carouselItems[i].style.width = carouselHeroWidth + "px";
			} else {
				carouselItems[i].style.transform = "translateX(" + (carouselItemOffsetX - carouselItemWidth) + "px) translateY(" + (stack * carouselMaxHeight / carouselRows) +"px)";
				carouselItems[i].style.width = carouselItemWidth + "px";
			}
		}
		carousel.style.height = carouselMaxHeight + "px";
	}

	CarouselNext = function(evt) {
		evt.preventDefault();
		if (!galleryActive) {
			CarouselControlsHide();
			CarouselSlideX(_carouselMovedTotal - carouselIncrement);
		}
	}

	CarouselPrev = function(evt) {
		evt.preventDefault();
		if (!galleryActive) {
			CarouselControlsHide();
			CarouselSlideX(_carouselMovedTotal + carouselIncrement);
		}
	}

	CarouselSlideTo = function(evt) {
		CarouselControlsHide();
		CarouselSlideX(_carouselMovedTotal + ((parseInt(evt.target.getBoundingClientRect().left) - ((window.innerWidth / 2) - (evt.target.offsetWidth / 2))) * -1));
	}

	CarouselSlideX = function(distance) {
		return new Promise(function(resolve, reject) {
			var threshold = ((carouselOuter.scrollWidth - document.body.scrollWidth) * -1) + _offset;
			if (distance > 0){
				CarouselControlsShow();
				CarouselTranslateX(0);
			} else if (distance <= threshold){
				CarouselControlsShow();
				CarouselTranslateX(threshold);
			} else {
				CarouselTranslateX(distance);
			}
			resolve();
			return;
		});
	}

	CarouselTranslateX = function(distance) {
		carouselOuter.style.transform = "translate3d(" + Math.round(distance) + "px,0,0)";
		carouselOuter.setAttribute("data-translated", Math.round(distance));
	}

	//
	//	Gallery
	//
	GalleryStart = function(image) {
		galleryActive 	 = true;
		galleryActiveBCR = image.parentElement.getBoundingClientRect();
		galleryActiveX   = (document.body.scrollWidth / 2) - (galleryActiveBCR.width / 2);
		galleryActiveY   = (carouselMaxHeight / 2) - (galleryActiveBCR.height / 2);

		carousel.classList.add("carousel--active");
		image.parentElement.setAttribute("data-style", image.parentElement.getAttribute("style"));
		image.parentElement.style.transform = "translateX(" + galleryActiveX + "px) translateY(" + galleryActiveY + "px)";
		image.parentElement.classList.add("carousel__item--active");

		var prev        = PrevAll(image.parentElement);
		var prevOffsetX = galleryActiveX;
		for (var i = 0; i < prev.length; i++) {
			prevOffsetX -= carouselItemWidth;
			prev[i].setAttribute("data-style", prev[i].getAttribute("style"));
			prev[i].style.transform = "translateX(" + prevOffsetX + "px) translateY(" + galleryActiveY + "px)";
			prev[i].style.width = carouselItemWidth + "px";
		}

		var next        = NextAll(image.parentElement);
		var nextOffsetX = galleryActiveX;
		for (var i = 0; i < next.length; i++) {
			nextOffsetX += carouselItemWidth;
			next[i].setAttribute("data-style", next[i].getAttribute("style"));
			next[i].style.transform = "translateX(" + nextOffsetX + "px) translateY(" + galleryActiveY + "px)";
			next[i].style.width = carouselItemWidth + "px";
		}

		GalleryTranslateX(Math.abs(_carouselMovedTotal));
	}

	GalleryClose = function() {
		galleryActive = false;
		carousel.classList.remove("carousel--active");
		document.querySelector(".carousel__item--active").classList.remove("carousel__item--active");
		carouselInner.removeAttribute("style");
		carouselInner.removeAttribute("data-translated");
		for (var i = 0; i < carouselItems.length; i++) {
			carouselItems[i].setAttribute("style", carouselItems[i].getAttribute("data-style"));
			carouselItems[i].removeAttribute("data-style");
		}
	}

	GalleryTranslateX = function(distance) {
		carouselInner.style.transform = "translate3d(" + Math.round(distance) + "px,0,0)";
		carouselInner.setAttribute("data-translated", Math.round(distance));
	}

	//
	//	Utilities
	//
	PrevAll = function(element) {
		var result = [];
		while (element = element.previousElementSibling)
			result.push(element);
		return result;
	}

	NextAll = function(element) {
		var result = [];
		while (element = element.nextElementSibling)
			result.push(element);
		return result;
	}

	//
	//	Expose Public Functions
	//
	return {
		init: Init
	}

}())

Carousel.init();
