"use strict";

var Carousel = (function(){

	var body             = document.body;
    var carousel         = document.querySelector(".js-carousel");
	var carouselOuter    = document.querySelector(".js-carousel__outer");
	var carouselInner    = document.querySelector(".js-carousel__inner");
	var carouselItems    = document.querySelectorAll(".js-carousel__item");
	var carouselControls = document.querySelector(".js-carousel__controls");
	var carouselNext	 = document.querySelector(".js-carousel__control--next");
	var carouselPrev	 = document.querySelector(".js-carousel__control--prev");

	var carouselHeight;
	var carouselRows;
	var aspectRatio;
	var carouselHeroWidth;
	var carouselItemWidth;
	var carouselIncrement;

	var carouselItemOffsetX = 0;

	var mouseClick         = true;
	var mouseDown          = false;
	var mouseCurrentXPos   = 0;
	var carouselMovedTotal = carouselOuter.getAttribute("data-translated") | 0;

	var dragThreshold;
	var keyboardMove = 0;

	var galleryActive = false;

	function Init(options) {
		AddEventListeners();
		_CarouselInit(options);
		_CarouselInitItems();
		_ControlsInit(options);
	}

	function AddEventListeners() {
		body.addEventListener("keydown", _KeyboardControls);
        carousel.addEventListener("mousedown", _MouseDown);
        carousel.addEventListener("mousemove", _MouseMove);
        carousel.addEventListener("mouseup", _MouseUp);
        carousel.addEventListener("mouseleave", _MouseLeave);
        carouselNext.addEventListener("click", _CarouselNext);
        carouselPrev.addEventListener("click", _CarouselPrev);
	}

	//
	//	Initialize Carousel
	//	Accepts options, sets height for carousel, then
	//	sets or initializes carousel items images to their
	//	proper positions via CarouselInitItems func.
	function _CarouselInit(options) {
		carouselHeight        = options.carouselHeight || 400;
		carouselRows          = options.carouselRows || 2;
		aspectRatio           = options.aspectRatio || 4/3;
		carouselIncrement	  = options.carouselIncrement || 500;
		carouselHeroWidth     = carouselHeight * aspectRatio;
		carouselItemWidth     = carouselHeroWidth / carouselRows;

		carousel.style.height = carouselHeight + "px";
		carouselOuter.style.transform = "translateX(0)";
		carouselOuter.setAttribute("data-translated", 0);
	}

	//
	//	Initialize Carousel Items
	//	For each carousel item, Checks if item is the hero
	//	item and increments the offset accordingly. Sets
	//	translate x and y. Uses modulo operater to create
	//	visual rows.
	function _CarouselInitItems() {
		carouselItemOffsetX = 0;
		for (var i = 0; i < carouselItems.length; i++) {
			if (i === 0) {
				carouselItemOffsetX += carouselHeroWidth;
			} else if ((i-1)%carouselRows === 0) {
				carouselItemOffsetX += carouselItemWidth;
			}
			if (i === 0) {
				carouselItems[i].style.transform
					= "translateX(" + (carouselItemOffsetX - carouselHeroWidth) + "px)";
				carouselItems[i].style.width = carouselHeroWidth + "px";
			} else {
				carouselItems[i].style.transform
					= "translateX(" + (carouselItemOffsetX - carouselItemWidth) + "px)"
					+ "translateY(" + ((i%carouselRows) * carouselHeight / carouselRows) +"px)";
				carouselItems[i].style.width = carouselItemWidth + "px";
			}
		}
	}

	//
	//	Drag Carousel using Mouse
	//	Checks boolean and adds a class if dragging is
	//	true. Used with CSS to disable transitions when
	//	mouse drag is taking place versus keyboard controls
	//	or carousel controls.
	function _CarouselMouseDrag(isDragging) {
		if (isDragging) {
			carouselOuter.classList.add("dragging");
		} else {
			carouselOuter.classList.remove("dragging");
		}
	}

	//
	//	Will translate the carousel a value of "distance".
	//	Additionally, will check if the carousel translate
	//	has reached it's limits and set them.
	function _CarouselSlideTo(distance) {
		dragThreshold = ((carouselOuter.scrollWidth - body.scrollWidth) * -1);
		if (distance > 0) {
			_CarouselTranslateX(0);
		} else if (distance <= dragThreshold){
			_CarouselTranslateX(dragThreshold);
		} else {
			_CarouselTranslateX(distance);
		}
	}

	function _CarouselTranslateX(distance) {
		keyboardMove = distance;
		carouselOuter.style.transform = "translateX(" + Math.round(distance) + "px)";
		carouselOuter.setAttribute("data-translated", Math.round(distance));
	}

	//
	//	Checks for state of carousel and goes to the next
	//	carousel item.
	function _CarouselNext(evt) {
		evt.preventDefault();
		if (!galleryActive) {
			_CarouselSlideTo(keyboardMove -= carouselIncrement);
		}
		//	else {
		//		GalleryNext();
		//	}
	}

	//
	//	Checks for state of carousel and goes to the prev
	//	carousel item.
	function _CarouselPrev(evt) {
		evt.preventDefault();
		if (!galleryActive) {
			_CarouselSlideTo(keyboardMove += carouselIncrement);
		}
		//	else {
		//		GalleryNext();
		//	}
	}

	//
	//	Initialize Carousel Controls, setting positions etc.
	function _ControlsInit() {
		carouselControls.style.top = (carouselHeight / 2) + "px";
	}

	//
	//	Change Carousel state to Gallery. Change layout of
	//	images and focus the active image.
	function _GalleryStart(image) {
		_GalleryIsActive(true, image);
		_GalleryInitItems(image);
	}

	function _GalleryInitItems(image) {
		var active    = image.parentElement;
		var activeBCR = active.getBoundingClientRect();
		var center    = ((body.scrollWidth / 2) - (carouselHeroWidth / 2)) - carouselMovedTotal;

		//	Handle all images
		for (var i = 0; i < carouselItems.length; i++) {
			carouselItems[i].setAttribute("data-init-position", carouselItems[i].style.transform);
			carouselItems[i].style.width = carouselItemWidth + "px";
		}

		//	Handle active image
		active.style.transform = "translateX(" + center + "px) translateY(0)";
		active.style.width = carouselHeroWidth + "px";

		//	Handle prev images
		var prev        = _PrevAll(active);
		var prevOffsetX = center;
		for (var i = 0; i < prev.length; i++) {
			prevOffsetX -= carouselItemWidth;
			prev[i].style.transform = "translateX(" + prevOffsetX + "px) translateY(50%)";
		}

		//	Handle next images
		var next        = _NextAll(active);
		var nextOffsetX = center;
		for (var i = 0; i < next.length; i++) {
			nextOffsetX += carouselItemWidth;
			next[i].style.transform = "translateX(" + nextOffsetX + "px) translateY(50%)";
		}
	}

	function _GalleryClose() {
		_GalleryIsActive(false);
		for (var i = 0; i < carouselItems.length; i++) {
			if (i === 0) {
				carouselItems[i].style.width = carouselHeroWidth + "px";
			} else {
				carouselItems[i].style.width = carouselItemWidth + "px";
			}
			carouselItems[i].style.transform = carouselItems[i].getAttribute("data-init-position");
		}
	}

	function _GalleryIsActive(isActive, image) {
		if (isActive) {
			galleryActive = true;
			carousel.classList.add("active");
			if (image) {
				image.parentElement.classList.add("active");
			}
		} else {
			galleryActive = false;
			carousel.classList.remove("active");
			carousel.querySelector(".active").classList.remove("active");
		}
	}

	function _GalleryTranslateX(distance) {
		carouselInner.style.transform = "translateX(" + Math.round(distance) + "px)";
		carouselInner.setAttribute("data-translated", Math.round(distance));
	}

	//
	//	When mousedown event occurs on the carousel set
	//	mouseclick and mousedown to true, additionally
	//	capture the cursor's current position and if the
	//	carousel has already been dragged get that value.
	function _MouseDown(evt) {
		evt.preventDefault();
		mouseClick         = true;
		mouseDown          = true;
		mouseCurrentXPos   = evt.pageX;
		carouselMovedTotal = carouselOuter.getAttribute("data-translated") | 0;
	}

	//
	//	When mousemove event occurs on the carousel and the
	//	gallery is not active and mousedown is true then
	//	check the following: if the mouse has moved begin
	//	dragging the carousel and set mouseclick to false.
	//	Else if the mouse hasn't moved, then the user is
	//	trying to click on an image.
	function _MouseMove(evt) {
		if (!galleryActive && mouseDown === true) {
			if ((evt.pageX - mouseCurrentXPos) !== 0) {
				_CarouselMouseDrag(true);
				_CarouselSlideTo((evt.pageX - mouseCurrentXPos) + carouselMovedTotal);
				mouseClick = false;
			} else {
				mouseClick = true;
			}
		}
	}

	//
	//	this deserves a lengthy description...
	function _MouseUp(evt) {
		if (mouseClick) {
			if (!galleryActive) {
				if (evt.target.classList.contains("carousel__image")) {
					_GalleryStart(evt.target);
				}
			} else {
				_GalleryClose();
				//	if (evt.target.classList.contains("js-carousel__control")) {
				//		return;
				//	} else if (evt.target.classList.contains("carousel__image")) {
				//		console.log("go to image");
				//	} else {
				//		_GalleryClose();
				//	}
			}
		}
		_CarouselMouseDrag(false);
		mouseDown = false;
	}

    //
	//	If the mouse leaves the carousel then we're not
	//	dragging it or clicking down on it.
	function _MouseLeave(evt) {
		_CarouselMouseDrag(false);
		mouseDown = false;
	}

	//
	//	When the left or right arrows are moved, depending
	//	on what state is the carousel is (carousel/gallery)
	//	slide or go to next image.
	function _KeyboardControls(evt) {
		switch (evt.keyCode) {
			case 37: // Left
				_CarouselPrev(evt);
				break;
			case 39: // Right
				_CarouselNext(evt);
				break;
		}
	}

	//
	//	Get all previous elements
	function _PrevAll(element) {
		var result = [];
		while (element = element.previousElementSibling)
			result.push(element);
		return result;
	}

	//
	//	Get all next elements
	function _NextAll(element) {
		var result = [];
		while (element = element.nextElementSibling)
			result.push(element);
		return result;
	}

	return {
		init: Init
	}

})();

Carousel.init({
	carouselHeight: 400,
	carouselIncrement: 500,
	carouselRows: 2,
	aspectRatio: 4/3
});

var SetCarouselOptions = (function(){

	var setRows = document.querySelector(".js-options-rows");
	var setHeight = document.querySelector(".js-options-height");
	var rows, height;

	function Init() {
		setRows.addEventListener("change", _UpdateRows);
		setHeight.addEventListener("change", _UpdateHeight);
	}

	function _UpdateRows(evt) {
		rows = evt.target.value;
		_CarouselUpdate();
	}

	function _UpdateHeight(evt) {
		height = evt.target.value;
		_CarouselUpdate();
	}

	function _CarouselUpdate() {
		Carousel.init({
			carouselHeight: height,
			carouselRows: rows
		})
	}

	return {
		init: Init
	}

})();

SetCarouselOptions.init();
