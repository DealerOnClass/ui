//
//  bootstrap.js
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

//  //
//  //  nav.js
//  //  Initialize body
//  pageBody.classList.add("mobile-nav-is-closed", "desktop-nav-is-open");
//  //  Initialize backdrop
//  var offcanvasBackdrop = document.createElement("div");
//  offcanvasBackdrop.classList.add("offcanvas-backdrop","fade","invisible");
//  insertAfter(offcanvasBackdrop, offcanvasNav);
//
//  slide.js
var slideOver = document.querySelector("#js-slide-over");

if ( slideOver != null ) {
    var slideWrapr = document.querySelector("#js-slide-wrapper");
    var slideTable = document.querySelector("#js-slide-table");
};

//  //
//  //  sticky.js
//  $(document).ready(function() {
//      var stickyOffset = $(".oncanvas-nav").height();
//      var otherOffset = $("#js-slide-table-head").height();
//
//      $("#something").stick_in_parent({
//          offset_top: stickyOffset
//      });
//
//      initStickyTable(".table-sticky", ".table-sticky-wrapper");
//      $(".slide-over-item-visible").css({
//          "margin-bottom": otherOffset * -1
//      });
//  });

//
//  scrollbar.js
$(function() {
    $(".offcanvas-nav").perfectScrollbar();
});
