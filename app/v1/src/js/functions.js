//
//  Enable Tooltips && Popovers for demo
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

//  Easing
$("#navbar-main .navbar-sidebar-wrapper a[href^='#ui__']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').stop().animate({
        scrollTop: $(hash).offset().top
    }, 1500, 'easeInOutExpo', function() {
        window.location.hash = hash;
    });
});
//-------------------------------------
//      $("#toTop").on('click', function(e) {
//          e.preventDefault();
//          var hash = this.hash;
//          $('html, body').stop().animate({
//              scrollTop: $(hash).offset().top
//          }, 1500, 'easeInOutExpo', function() {
//              window.location.hash = hash;
//          });
//      });
//-------------------------------------

//
//
//  Thank you Cody House ** start
//  https://codyhouse.co/demo/back-to-top/index.html
// browser window scroll (in pixels) after which the "back to top" link is shown
//-------------------------------------
//      var offset = 300,
//          //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
//          offset_opacity = 1200,
//          //duration of the top scrolling animation (in ms)
//          scroll_top_duration = 700,
//          //grab the "back to top" link
//          $back_to_top = $('#toTop');
//-------------------------------------

//hide or show the "back to top" link
//-------------------------------------
//      $(window).scroll(function(){
//          ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('in') : $back_to_top.removeClass('in');
//          if( $(this).scrollTop() > offset_opacity ) {
//              $back_to_top.addClass('fade');
//          }
//      });
//-------------------------------------
//  Thank you Cody House ** end

////////////////////////////////////////
//
//  Panel Wizard
//
//  Step through panel wizard
$("[data-toggle='panel-wizard__next']").on("click", function() {
    $(this).closest(".panel-collapse").collapse('hide');
    $(this).closest(".panel.panel-wizard").next(".panel").children(".panel-collapse").collapse('show');
});
$("[data-toggle='panel-wizard__prev']").on("click", function() {
    $(this).closest(".panel-collapse").collapse('hide');
    $(this).closest(".panel.panel-wizard").prev(".panel").children(".panel-collapse").collapse('show');
});
$("[data-toggle='panel-wizard__done']").on("click", function() {
    $(this).closest(".panel-collapse").collapse('hide');
});
//  Set icon default && active state if open
$(document).ready( function() {
    $(".panel-wizard .panel-collapse.in").prev(".panel-heading").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    $(".panel-wizard .panel-collapse.in").prev(".panel-heading").addClass("current");
});
//  Toggle accordion icon && active state
$(".panel-wizard").on("show.bs.collapse", function() {
    $(this).find(".panel-heading .fa").removeClass("fa-plus").addClass("fa-minus");
    $(this).find(".panel-heading").addClass("current");
});
$(".panel-wizard").on("hide.bs.collapse", function() {
    $(this).find(".panel-heading .fa").removeClass("fa-minus").addClass("fa-plus");
    $(this).find(".panel-heading").removeClass("current");
});
////////////////////////////////////////
//
//  Offcanvas Magic
//
$(document).ready( function() {
    UpdateDimensions();
});

$(window).resize( function() {
    UpdateDimensions();
});

function UpdateDimensions() {
    var navHeight        = $('[oncanvas-nav]').height();
    var navWidth         = $('#offcanvas-nav').width();
    var windowHeight     = $(window).height();
    var windowWidth      = $(window).width();
    var adjustedHeight   = windowHeight - navHeight;
    var adjustedWidth    = windowWidth - navWidth;
    $('[offcanvas-set-height="window"]').css("height", windowHeight);
    $('[offcanvas-set-height="oncanvas-nav"]').css("height", adjustedHeight);
    $('[offcanvas-set-width="sidebar"]').css("width", adjustedWidth);
    $('[offcanvas-set-width="window"]').css("width", windowWidth);
    $('[offcanvas-set-width="offcanvas-nav"]').css("width", windowWidth * .80);
    $('[offcanvas-set-top="oncanvas-nav"]').css("top", navHeight);

    var logoWidth        = $('#navbar-sidebar-link').outerWidth();
    var searchWidth      = $('#navbar-search-link').outerWidth();
    var profileWidth     = $('#navbar-profile-link').outerWidth();
    var calculatedWidth  = ( windowWidth ) - ( logoWidth + searchWidth + profileWidth );
    $('#navbar-search-form-input').css("width", calculatedWidth);
};
////////////////////////////////////////
//
//  Search Bar
$('#navbar-search-form').on('shown.bs.collapse', function() {
    $('#navbar-search-form-input').focus();
});
$('#navbar-search-form').on('show.bs.collapse', function() {
    $('#navbar-search-link').toggleClass("active");
});
$('#navbar-search-form').on('hide.bs.collapse', function() {
    $('#navbar-search-link').toggleClass("active");
});
$('#navbar-search-form-input').focusout( function() {
    $('#navbar-search-form').collapse('hide');
});
////////////////////////////////////////
//
//  Sidebar Collapse Function
//
$('#navbar-sidebar').on('show.bs.collapse', function(e) {
    if (e.target == this) {
        if ( $("#navbar-sidebar-nested").hasClass("was-open") ) {
            $("#navbar-sidebar-nested").collapse("show").removeClass("was-open");
        };
        $("#offcanvas-backdrop").removeClass("invisible");
        $("#offcanvas-backdrop").addClass("in");
        updateMagicTable(350);
    };
});
$('#navbar-sidebar').on('hide.bs.collapse', function(e) {
    if (e.target == this) {
        if ( $("#navbar-sidebar-nested").hasClass("in") ) {
            $("#navbar-sidebar-nested").addClass("was-open").collapse("hide");
        };
        $("#offcanvas-backdrop").removeClass("in");
    };
});
$('#navbar-sidebar').on('hidden.bs.collapse', function(e) {
    if (e.target == this) {
        $("#offcanvas-backdrop").addClass("invisible");
        updateMagicTable(350);
    };
});
$('#offcanvas-backdrop').on('click', function() {
    $('#navbar-sidebar').collapse('hide');
});
////////////////////////////////////////
//
//  Notify Animation Control
//
$('[data-disable="notify"]').on('click', function() {
    $(this).find(".notify-icon-alert").remove();
});
////////////////////////////////////////
//
//  Navbar Website Toggle
//
//  Desktop
$('#navbar-sidebar-nested').on('show.bs.collapse', function(e) {
    if (e.target == this) {
        $("#offcanvas-inner-wrapper").removeClass("force-auto-width");
        $("#navbar-sidebar-nested-icon").removeClass("fa-angle-right").addClass("fa-angle-left");
        //  //
        //  $("#offcanvas-nested-backdrop").removeClass("invisible");
        //  $("#offcanvas-nested-backdrop").addClass("in");
    };
});
$('#navbar-sidebar-nested').on('hide.bs.collapse', function(e) {
    if (e.target == this) {
        $("#navbar-sidebar-nested-icon").removeClass("fa-angle-left").addClass("fa-angle-right");
        //  //
        //  $("#offcanvas-nested-backdrop").removeClass("in");
    };
});
$('#navbar-sidebar-nested').on('hidden.bs.collapse', function(e) {
    if (e.target == this) {
        $("#offcanvas-inner-wrapper").addClass("force-auto-width");
        //  //
        //  $("#offcanvas-nested-backdrop").addClass("invisible");
    };
});
//
//  Mobile
$('#navbar-sidebar-collapse').on('show.bs.collapse', function() {
    $("#navbar-sidebar-collapse-icon").removeClass("fa-angle-down").addClass("fa-angle-up");
});
$('#navbar-sidebar-collapse').on('hide.bs.collapse', function() {
    $("#navbar-sidebar-collapse-icon").removeClass("fa-angle-up").addClass("fa-angle-down");
});
//  //
//  //  Backdrop
//  $('#offcanvas-nested-backdrop').on('click', function() {
//      $('#navbar-nested-sidebar').collapse('hide');
//  });
////////////////////////////////////////
//
//  Navbar Profile Toggle
//
$('#navbar-profile').on('show.bs.collapse', function() {
    $("#navbar-profile-backdrop").removeClass("invisible");
    $("#navbar-profile-backdrop").addClass("in");
});
$('#navbar-profile').on('hide.bs.collapse', function() {
    $("#navbar-profile-backdrop").removeClass("in");
});
$('#navbar-profile').on('hidden.bs.collapse', function() {
    $("#navbar-profile-backdrop").addClass("invisible");
});
$('#navbar-profile-backdrop').on('click', function() {
    $('#navbar-profile').collapse('hide');
});
////////////////////////////////////////
//
//  Table Magic
//
$(document).ready( function() {
    createMagicTable("[table-magic='inactive']", ".offcanvas-body");
    updateMagicTable(200);
});

$(window).resize( function() {
    updateMagicTable(0);
});

$('.offcanvas-inner').scroll( function() {
    var tabletostick = $('.table-magic-wrapper');
    var tablefromtop = $('[table-magic="inactive"]').offset().top;
    var navheight = $('[oncanvas-nav]').height();

    if ( tablefromtop <= navheight ) {
        tabletostick.removeClass("invisible").css("top", 0);
    } else {
        tabletostick.addClass("invisible");
    }
});

function createMagicTable(tableToMagicalize, dest) {
    var clone = $(tableToMagicalize).clone();

    clone.children("tbody").remove();
    clone.prependTo(dest).wrap("<div class='table-magic-wrapper invisible'>").attr("table-magic","active");
};

function updateMagicTable(delay) {

    var delay = delay;

    setTimeout( function() {

        var active__table          = $('[table-magic="active"]');
        var active__table__th      = active__table.children("thead").children("tr").children("th");

        var inactive__table        = $('[table-magic="inactive"]');
        var inactive__table__th    = inactive__table.children("tbody").children("tr").children("td");

        active__table__th.each( function(index) {
            $(this).css("width", inactive__table__th.eq(index).width());
        });

    }, delay );

};

////////////////////////////////////
//
//  $('thingIswipeon...').swipe( {
//      swipeRight:function() {
//          // do something..
//      },
//      threshold: 0,
//      allowPageScroll: "vertical"
//  });
//  $('#offcanvas-nav').swipe( {
//      swipeLeft:function() {
//          $('#carousel').carousel('prev');
//      },
//      threshold: 0,
//      allowPageScroll: "vertical"
//  });

////////////////////////////////////////
//
//  Table Magic
//
