var sidebar = (function () {

	var sidebarIsOpen;
	var body		  = document.body;
	var sidebar       = document.querySelector(".js-offcanvas-sidebar");
	var sidebarToggle = document.querySelector(".js-offcanvas-toggle");
	var backdrop	  = document.querySelector(".js-offcanvas-backdrop");

	Init = function () {
		AddEventListeners();
	}

	AddEventListeners = function () {
		sidebarToggle.addEventListener("click", Toggle);
		backdrop.addEventListener("click", CloseSidebar);
	}

	Toggle = function (evt) {
		evt.preventDefault();
		if (!sidebarIsOpen) {
			OpenSidebar();
		} else {
			CloseSidebar();
		}
	}

	CloseSidebar = function () {
		body.classList.remove("sidebar-is-open");
		sidebarIsOpen = false;
	}

	OpenSidebar = function () {
		body.classList.add("sidebar-is-open");
		sidebarIsOpen = true;
	}

	return {
		init: Init
	}

})();
sidebar.init();
