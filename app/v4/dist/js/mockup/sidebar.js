var sidebar = (function () {

	var sidebarIsOpen;
	var body		  = document.body;
	var sidebar       = document.querySelector(".js-offcanvas-sidebar");
	var sidebarToggle = document.querySelector(".js-offcanvas-toggle");
	var backdrop	  = document.querySelector(".js-offcanvas-backdrop");

	function Init() {
		AddEventListeners();
	}

	function AddEventListeners() {
		sidebarToggle.addEventListener("click", Toggle);
		backdrop.addEventListener("click", CloseSidebar);
	}

	function Toggle(evt) {
		evt.preventDefault();
		if (!sidebarIsOpen) {
			OpenSidebar();
		} else {
			CloseSidebar();
		}
	}

	function CloseSidebar() {
		body.classList.remove("sidebar-is-open");
		sidebarIsOpen = false;
	}

	function OpenSidebar() {
		body.classList.add("sidebar-is-open");
		sidebarIsOpen = true;
	}

	return {
		init: Init
	}

})();
sidebar.init();
