/*
 * Carousel
 */
var Carousel = (function(){

	var carousel          = document.querySelector(".carousel");
	var carouselOuter     = document.querySelector(".carousel__outer");
	var carouselInner     = document.querySelector(".carousel__inner");
	var carouselItems     = document.querySelectorAll(".carousel__item");
	var carouselItemHero  = document.querySelectorAll(".carousel__item--hero");

	var carouselMaxHeight = 400;
	var carouselRows      = 2;
	var imageAspecRatio   = 4/3;
	var carouselHeroWidth = carouselMaxHeight * imageAspecRatio;
	var carouselItemWidth = carouselHeroWidth / carouselRows;

	var galleryActive     = false;

	var _mouseClick      = true;
	var _mouseDown       = false;
	var _mouseCurrentXP  = 0;
	var _mouseMoved      = 0;
	var _mouseMovedTotal = carouselOuter.getAttribute("data-translated") | 0;

	var _carouselMoved   = 0;

	var _offset 		 = 0;


	Init = function() {
		AddEventListeners();
		CarouselImageInit();
	}

	AddEventListeners = function() {
		carousel.addEventListener("mousedown", MouseDown);
		carousel.addEventListener("mousemove", MouseMove);
		carousel.addEventListener("mouseup", MouseUp);
	}

	MouseDown = function(evt) {
		evt.preventDefault();
		_mouseClick       = true;
		_mouseDown        = true;
		_mouseCurrentXPos = evt.pageX;
		_mouseMovedTotal  = carouselOuter.getAttribute("data-translated") | 0;
	}

	MouseMove = function(evt) {
		if (!galleryActive && _mouseDown === true) {
			_mouseMoved    = evt.pageX - _mouseCurrentXPos;
			_carouselMoved = _mouseMoved + _mouseMovedTotal;
			CarouselSlideX(_carouselMoved);
		}
		_mouseClick = false;
	}

	MouseUp = function(evt) {
		_mouseDown = false;
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

	CarouselSlideX = function(distance) {
		//	carousel.style.width = _paddedScrollWidth + "px";
		var threshold = ((carouselOuter.scrollWidth - document.body.scrollWidth) * -1) + _offset;
		if (distance > 0){
			CarouselTranslateX(0);
		} else if (distance <= threshold){
			CarouselTranslateX(threshold);
		} else {
			CarouselTranslateX(distance);
		}
	}

	CarouselTranslateX = function(distance) {
		carouselOuter.style.transform = "translate3d(" + Math.round(distance) + "px,0,0)";
		carouselOuter.setAttribute("data-translated", Math.round(distance));
	}

	return {
		init: Init
	}

}())

Carousel.init();
