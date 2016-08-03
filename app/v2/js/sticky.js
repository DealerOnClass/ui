// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'auto'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                newWidth = $(s.getWidthFrom).width() || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        var o = $.extend({}, defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(wrapper);

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          stickyElement.addEventListener('DOMNodeInserted', function() {
            methods.setWrapperHeight(stickyElement);
          }, false);
          stickyElement.addEventListener('DOMNodeRemoved', function() {
            methods.setWrapperHeight(stickyElement);
          }, false);
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));

// Generated by CoffeeScript 1.9.2

//      /**
//      @license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
//       */
//
//      (function() {
//        var $, win;
//
//        $ = this.jQuery || window.jQuery;
//
//        win = $(window);
//
//        $.fn.stick_in_parent = function(opts) {
//          var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
//          if (opts == null) {
//            opts = {};
//          }
//          sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
//          if (offset_top == null) {
//            offset_top = 0;
//          }
//          if (parent_selector == null) {
//            parent_selector = void 0;
//          }
//          if (inner_scrolling == null) {
//            inner_scrolling = true;
//          }
//          if (sticky_class == null) {
//            sticky_class = "is_stuck";
//          }
//          doc = $(document);
//          if (enable_bottoming == null) {
//            enable_bottoming = true;
//          }
//          fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
//            var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
//            if (elm.data("sticky_kit")) {
//              return;
//            }
//            elm.data("sticky_kit", true);
//            last_scroll_height = doc.height();
//            parent = elm.parent();
//            if (parent_selector != null) {
//              parent = parent.closest(parent_selector);
//            }
//            if (!parent.length) {
//              throw "failed to find stick parent";
//            }
//            fixed = false;
//            bottomed = false;
//            spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
//            if (spacer) {
//              spacer.css('position', elm.css('position'));
//            }
//            recalc = function() {
//              var border_top, padding_top, restore;
//              if (detached) {
//                return;
//              }
//              last_scroll_height = doc.height();
//              border_top = parseInt(parent.css("border-top-width"), 10);
//              padding_top = parseInt(parent.css("padding-top"), 10);
//              padding_bottom = parseInt(parent.css("padding-bottom"), 10);
//              parent_top = parent.offset().top + border_top + padding_top;
//              parent_height = parent.height();
//              if (fixed) {
//                fixed = false;
//                bottomed = false;
//                if (manual_spacer == null) {
//                  elm.insertAfter(spacer);
//                  spacer.detach();
//                }
//                elm.css({
//                  position: "",
//                  top: "",
//                  width: "",
//                  bottom: ""
//                }).removeClass(sticky_class);
//                restore = true;
//              }
//              top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
//              height = elm.outerHeight(true);
//              el_float = elm.css("float");
//              if (spacer) {
//                spacer.css({
//                  width: elm.outerWidth(true),
//                  height: height,
//                  display: elm.css("display"),
//                  "vertical-align": elm.css("vertical-align"),
//                  "float": el_float
//                });
//              }
//              if (restore) {
//                return tick();
//              }
//            };
//            recalc();
//            if (height === parent_height) {
//              return;
//            }
//            last_pos = void 0;
//            offset = offset_top;
//            recalc_counter = recalc_every;
//            tick = function() {
//              var css, delta, recalced, scroll, will_bottom, win_height;
//              if (detached) {
//                return;
//              }
//              recalced = false;
//              if (recalc_counter != null) {
//                recalc_counter -= 1;
//                if (recalc_counter <= 0) {
//                  recalc_counter = recalc_every;
//                  recalc();
//                  recalced = true;
//                }
//              }
//              if (!recalced && doc.height() !== last_scroll_height) {
//                recalc();
//                recalced = true;
//              }
//              scroll = win.scrollTop();
//              if (last_pos != null) {
//                delta = scroll - last_pos;
//              }
//              last_pos = scroll;
//              if (fixed) {
//                if (enable_bottoming) {
//                  will_bottom = scroll + height + offset > parent_height + parent_top;
//                  if (bottomed && !will_bottom) {
//                    bottomed = false;
//                    elm.css({
//                      position: "fixed",
//                      bottom: "",
//                      top: offset
//                    }).trigger("sticky_kit:unbottom");
//                  }
//                }
//                if (scroll < top) {
//                  fixed = false;
//                  offset = offset_top;
//                  if (manual_spacer == null) {
//                    if (el_float === "left" || el_float === "right") {
//                      elm.insertAfter(spacer);
//                    }
//                    spacer.detach();
//                  }
//                  css = {
//                    position: "",
//                    width: "",
//                    top: ""
//                  };
//                  elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
//                }
//                if (inner_scrolling) {
//                  win_height = win.height();
//                  if (height + offset_top > win_height) {
//                    if (!bottomed) {
//                      offset -= delta;
//                      offset = Math.max(win_height - height, offset);
//                      offset = Math.min(offset_top, offset);
//                      if (fixed) {
//                        elm.css({
//                          top: offset + "px"
//                        });
//                      }
//                    }
//                  }
//                }
//              } else {
//                if (scroll > top) {
//                  fixed = true;
//                  css = {
//                    position: "fixed",
//                    top: offset
//                  };
//                  css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
//                  elm.css(css).addClass(sticky_class);
//                  if (manual_spacer == null) {
//                    elm.after(spacer);
//                    if (el_float === "left" || el_float === "right") {
//                      spacer.append(elm);
//                    }
//                  }
//                  elm.trigger("sticky_kit:stick");
//                }
//              }
//              if (fixed && enable_bottoming) {
//                if (will_bottom == null) {
//                  will_bottom = scroll + height + offset > parent_height + parent_top;
//                }
//                if (!bottomed && will_bottom) {
//                  bottomed = true;
//                  if (parent.css("position") === "static") {
//                    parent.css({
//                      position: "relative"
//                    });
//                  }
//                  return elm.css({
//                    position: "absolute",
//                    bottom: padding_bottom,
//                    top: "auto"
//                  }).trigger("sticky_kit:bottom");
//                }
//              }
//            };
//            recalc_and_tick = function() {
//              recalc();
//              return tick();
//            };
//            detach = function() {
//              detached = true;
//              win.off("touchmove", tick);
//              win.off("scroll", tick);
//              win.off("resize", recalc_and_tick);
//              $(document.body).off("sticky_kit:recalc", recalc_and_tick);
//              elm.off("sticky_kit:detach", detach);
//              elm.removeData("sticky_kit");
//              elm.css({
//                position: "",
//                bottom: "",
//                top: "",
//                width: ""
//              });
//              parent.position("position", "");
//              if (fixed) {
//                if (manual_spacer == null) {
//                  if (el_float === "left" || el_float === "right") {
//                    elm.insertAfter(spacer);
//                  }
//                  spacer.remove();
//                }
//                return elm.removeClass(sticky_class);
//              }
//            };
//            win.on("touchmove", tick);
//            win.on("scroll", tick);
//            win.on("resize", recalc_and_tick);
//            $(document.body).on("sticky_kit:recalc", recalc_and_tick);
//            elm.on("sticky_kit:detach", detach);
//            return setTimeout(tick, 0);
//          };
//          for (i = 0, len = this.length; i < len; i++) {
//            elm = this[i];
//            fn($(elm));
//          }
//          return this;
//        };
//
//      }).call(this);

//
//  Sticky Init
$(document).ready(function() {

    customSticky(".js-navbar-sticky");
    customSticky("#something-else");
    initStickyTable(".table-sticky", ".table-sticky-wrapper");

    var anotherOffset = $("#js-slide-table-head").height();

    $("#something").css({
        "position": "relative",
        "top": anotherOffset
    });
});

function customSticky(sticky_el) {
    var self    = $(sticky_el);
    var offset  = self.attr("data-sticky-offset");
    if (offset) {
        var offsets = offset.split(",");
        var offsetTotal   = 0;

        $.each(offsets, function(index, value) {
            offsetTotal += $(value).height();
        });

        $(self).sticky({
            topSpacing: offsetTotal,
            responsiveWidth: true
        });
    } else {
        return
    }
};

function initStickyTable(table, parent) {
    var table  = document.querySelector(table);
    if (table) {
        var parent = $(parent);

        var tr     = table.getElementsByTagName("TR");
        initTD(tr[0]);

        var clone = table.cloneNode(true);
        clone.setAttribute("id", "js-chicken");
        //  $("#js-slide-wrapper").prepend(clone);
        $("#something #something-else").append(clone);

        $("#js-chicken").find("tbody").remove();
        $("#js-chicken").wrap("<div id='js-turkey'>");
    } else {
        return
    }
}
