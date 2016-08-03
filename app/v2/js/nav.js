//  Nav
var pageBody           = document.querySelector("body");
var offcanvasBody      = document.querySelector(".offcanvas-body");
var offcanvasNav       = document.querySelector(".offcanvas-nav");
var navbarNavToggle    = document.querySelector("#navbar-nav-toggle");
var sidebarNavToggle   = document.querySelector("#sidebar-nav-toggle");

//  Initialize body
pageBody.classList.add("mobile-nav-is-closed", "desktop-nav-is-open");

//  Initialize backdrop
var offcanvasBackdrop = document.createElement("div");
offcanvasBackdrop.classList.add("offcanvas-backdrop","fade","invisible");
insertAfter(offcanvasBackdrop, offcanvasNav);

//  http://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//  Toggle offcanvas menu
navbarNavToggle.addEventListener("click", function() {
    navbarNavToggle.disabled = true;
    if ( pageBody.classList.contains("mobile-nav-is-closed") ) {
        pageBody.classList.add("mobile-nav-is-open");
        pageBody.classList.remove("mobile-nav-is-closed");
        offcanvasBackdrop.classList.add("in");
        offcanvasBackdrop.classList.remove("invisible");
    } else if ( pageBody.classList.contains("mobile-nav-is-open") ) {
        pageBody.classList.add("mobile-nav-is-closed");
        pageBody.classList.remove("mobile-nav-is-open");
        offcanvasBackdrop.classList.remove("in");
        setTimeout(function() {
            offcanvasBackdrop.classList.add("invisible");
        }, 200)
    }
    navbarNavToggle.disabled = false;
});

sidebarNavToggle.addEventListener("click", function() {
    if ( pageBody.classList.contains("desktop-nav-is-closed") ) {
        sidebarNavToggle.setAttribute("disabled", true);
        pageBody.classList.add("desktop-nav-is-open");
        pageBody.classList.remove("desktop-nav-is-closed");
        setTimeout(function() {
            sidebarNavToggle.removeAttribute("disabled");
        }, 200)
    } else if ( pageBody.classList.contains("desktop-nav-is-open") ) {
        sidebarNavToggle.setAttribute("disabled", true);
        pageBody.classList.add("desktop-nav-is-closed");
        pageBody.classList.remove("desktop-nav-is-open");
        setTimeout(function() {
            sidebarNavToggle.removeAttribute("disabled");
        }, 200)
    }
});

offcanvasBackdrop.addEventListener("click", function() {
    navbarNavToggle.click();
});

