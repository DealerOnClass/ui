//  //  Slide
//  var slideOver = document.querySelector("#js-slide-over");
//
//  if ( slideOver != null ) {
//      var slideWrapr = document.querySelector("#js-slide-wrapper");
//      var slideTable = document.querySelector("#js-slide-table");
//  };

function SlideOpen(el) {
    var TR = el.parentNode.parentNode;
    //  disable all toggles
    disableToggle(".slide-over-toggle");
    //  set wrapper state
    slideWrapr.classList.add("slid-over");
    //  initialize tr
    initTR(TR);
    //  scroll up if greater than 7 previous items
        //  var siblings = prevAll(TR).length;
        //  if (siblings > 7) { $("html, body").animate({ scrollTop: 0 }, 500); };
        $("html, body").animate({ scrollTop: 0 }, 500);
    //  store scroll position
    $("body").attr("data-scroll", $(this).scrollTop());
    //  animate tr
    setTimeout(function() {
        $("#js-table-clone").addClass("is-animated");
    }, 250)
    //  fade out table
    slideTable.classList.remove("in");
    //  slide over
    pageBody.classList.add("slide-is-active");
    setTimeout(function() {
        slideOver.classList.remove("slide-over-is-hidden");
        slideOver.classList.add("slide-over-is-visible");
        //  enable all toggles
        enableToggle(".slide-over-toggle");
    }, 500)
};

function SlideClose(el) {
    //  disable all toggles
    disableToggle(".slide-over-toggle");
    //  get table
    var destroy = document.querySelector("#js-table-clone");
    //  slide over
    pageBody.classList.remove("slide-is-active");
    slideOver.classList.remove("slide-over-is-visible");
    slideOver.classList.add("slide-over-is-hidden");
    //  reset toggle
    resetToggle("#js-tr-clone .slide-over-toggle");
    //  reset scroll position
    $("html, body").animate({ scrollTop: $("body").attr("data-scroll") }, 500);
    //  animate table
    setTimeout(function() {
        destroy.classList.remove("is-animated");
        destroy.classList.add("is-initial");
    }, 250)
    //  fade in table
    setTimeout(function() {
        slideTable.classList.add("in");
    }, 500)
    //
    setTimeout(function() {
        //  fade out tr
        $("#js-tbody-clone").removeClass("in");
        //  fade in slide
        slideWrapr.classList.remove("slid-over");
        //  destroy tr
        $(destroy).remove();
        //  enable all toggles
        enableToggle(".slide-over-toggle");
    }, 750)
};

function initTR(el) {
    //  get distance to parent container
    //  minus height of table head
    var distanceToParent = el.offsetTop;
    //  init TD
    initTD(el);
    //  create clone
    clone = el.cloneNode(true);
    //  place clone
    $(slideOver).before(clone);
    //  refresh TD
    resetTD(el)

        //  set self state
        el.classList.add("bg-main", "last-visited");
        $(".last-visited").not(el).removeClass("bg-main");

        //  //  set self state && remember last
        //  el.classList.add("bg-main", "last-visited");
        //  el.classList.remove("text-success");
        //  $(".last-visited").not(el).removeClass("bg-main").addClass("text-success");

    //  set clone id
    clone.setAttribute("id", "js-tr-clone");
    //  wrap clone
    var existingTableClasses = $("#js-slide-table > .table").attr("class");
    $("#js-tr-clone").wrap("<table id='js-table-clone' class='" + existingTableClasses + " table-clone'><tbody id='js-tbody-clone' class='fade in'>")
    //  init toggle
    initToggle("#js-tr-clone .slide-over-toggle");
    //  get negative margin for "illusion"
    var marginBottom = $("#js-table-clone").height();
    //  set initial position
    $("#js-table-clone").css({
        "margin-bottom": marginBottom * -1,
        "transform": "translateY(" + distanceToParent + "px)"
    });
}

function initTD(el) {
    console.log(el);
    var tds = el.children;
    forEach(tds, function (index, td) {
        td.style.width = td.offsetWidth + "px";
    });
}

function resetTD(el) {
    var tds = el.children;
    forEach(tds, function (index, td) {
        td.removeAttribute("style");
    });
}

function initToggle(el) {
    $(el).attr("onclick", "SlideClose(this)")
    $(el).find(".fa").removeClass("fa-chevron-right").addClass("fa-remove");
}

function resetToggle(el) {
    $(el).find(".fa").removeClass("fa-remove").addClass("fa-chevron-right");
}

function disableToggle(el) {
    $(el).attr("disabled","disabled");
}

function enableToggle(el) {
    $(el).removeAttr("disabled");
}

function prevAll(element) {
    var result = [];

    while (element = element.previousElementSibling)
        result.push(element);
    return result;
}
