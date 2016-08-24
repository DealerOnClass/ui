var Dropdown = (function(){

	var _dropdowns = document.querySelectorAll(".js-dropdown__toggle");
	var _dropdownParent;

	Init = function() {
		_AddEventListeners();
	}

	_AddEventListeners = function() {
		for (var i = 0; i < _dropdowns.length; i++) {
			_dropdowns[i].addEventListener("click", _ToggleDropdown);
		}
	}

	_ToggleDropdown = function(evt) {
		evt.preventDefault();
        _dropdownParent = evt.target.parentElement;
		if (_dropdownParent.classList.contains("dropdown--open")) {
			_dropdownParent.classList.remove("dropdown--open");
		} else {
			_dropdownParent.classList.add("dropdown--open");
		}
	}

	return {
		init: Init
	}

})()

Dropdown.init();
