/*
 * Feed Mapping Module
 */
var FeedColumnMapping = (function(){

	var parent;
	var clone;
	var DuplicateButtonClone;
	var DeleteButtonClone;
	var DuplicateButtons = document.querySelectorAll(".js-columnmapping__button--duplicate");
	var DeleteButtons    = document.querySelectorAll(".js-columnmapping__button--delete");

	Init = function() {
		AddEventListeners();
	}

	AddEventListeners = function() {
		for (var i = 0; i < DuplicateButtons.length; i++) {
			DuplicateButtons[i].addEventListener("click", DuplicateItem);
		}
		for (var i = 0; i < DeleteButtons.length; i++) {
			DeleteButtons[i].addEventListener("click", DeleteItem);
		}
	}

	DuplicateItem = function(evt) {
		evt.preventDefault();
		if (evt.target.tagName === "BUTTON") {
			parent = evt.target.parentElement.parentElement;
		} else {
			return;
		}

		clone  = parent.cloneNode(true);
		parent.parentElement.appendChild(clone);

		DuplicateButtonClone = clone.querySelector(".js-columnmapping__button--duplicate");
		DuplicateButtonClone.addEventListener("click", DuplicateItem);

		DeleteButtonClone = clone.querySelector(".js-columnmapping__button--delete");
		DeleteButtonClone.addEventListener("click", DeleteItem);
	}

	DeleteItem = function(evt) {
		evt.preventDefault();
		if (evt.target.tagName === "BUTTON") {
			parent = evt.target.parentElement.parentElement;
		} else {
			return;
		}

		parent.remove();
	}

	return {
		init: Init
	}

}())

FeedColumnMapping.init();
