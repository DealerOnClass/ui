var fontResizer = (function(){

	//
	//	Vars
	var target        = document.querySelector(".js-font-target");
    var increase      = document.querySelector(".js-font-increase");
    var decrease      = document.querySelector(".js-font-decrease");
    var reset         = document.querySelector(".js-font-reset");
	var initialSize   = 0;
	var incrementSize = 0;

	//
	//	Intialize
	function Init() {
		initialSize = _GetFontSize(target, "font-size");
		_AddEventListeners();
	}
	function _AddEventListeners() {
		increase.addEventListener("click", _Increase);
		decrease.addEventListener("click", _Decrease);
		reset.addEventListener("click", _Reset);
	}

	//
	//	The Works		
	function _Increase() {
		incrementSize++;
		_SetFontSize(parseInt(initialSize) + incrementSize);
	}
	function _Decrease() {
		incrementSize--;
		_SetFontSize(parseInt(initialSize) + incrementSize);
	}
	function _Reset() {
		target.removeAttribute("style");
		incrementSize = 0;
		initialSize  = _GetFontSize(target, "font-size");
	}

	//
	//	Utilities
	function _GetFontSize(elem) {
		return window.getComputedStyle(elem, null).getPropertyValue("font-size");
	}
	function _SetFontSize(value) {
		target.style.fontSize = value + "px";
	}

	//
	//	Expose
	return {
		init: Init
	}
})()

fontResizer.init();
