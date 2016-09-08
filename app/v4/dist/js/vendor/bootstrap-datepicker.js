!function(e){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],e);else if("object"==typeof exports)e(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";e(jQuery,moment)}}(function(e,t){"use strict";if(!t)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var a=function(a,n){var r,i,o,d,s,l,p,c={},u=!0,f=!1,m=!1,h=0,y=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],b=["days","months","years","decades"],w=["top","bottom","auto"],g=["left","right","auto"],v=["default","top","bottom"],k={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},C={},D=function(){return void 0!==t.tz&&void 0!==n.timeZone&&null!==n.timeZone&&""!==n.timeZone},x=function(e){var a;return a=void 0===e||null===e?t():D()?t.tz(e,l,n.useStrict,n.timeZone):t(e,l,n.useStrict),D()&&a.tz(n.timeZone),a},T=function(e){if("string"!=typeof e||e.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(e){case"y":return-1!==s.indexOf("Y");case"M":return-1!==s.indexOf("M");case"d":return-1!==s.toLowerCase().indexOf("d");case"h":case"H":return-1!==s.toLowerCase().indexOf("h");case"m":return-1!==s.indexOf("m");case"s":return-1!==s.indexOf("s");default:return!1}},M=function(){return T("h")||T("m")||T("s")},S=function(){return T("y")||T("M")||T("d")},O=function(){var t=e("<thead>").append(e("<tr>").append(e("<th>").addClass("prev").attr("data-action","previous").append(e("<span>").addClass(n.icons.previous))).append(e("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",n.calendarWeeks?"6":"5")).append(e("<th>").addClass("next").attr("data-action","next").append(e("<span>").addClass(n.icons.next)))),a=e("<tbody>").append(e("<tr>").append(e("<td>").attr("colspan",n.calendarWeeks?"8":"7")));return[e("<div>").addClass("datepicker-days").append(e("<table>").addClass("table-condensed").append(t).append(e("<tbody>"))),e("<div>").addClass("datepicker-months").append(e("<table>").addClass("table-condensed").append(t.clone()).append(a.clone())),e("<div>").addClass("datepicker-years").append(e("<table>").addClass("table-condensed").append(t.clone()).append(a.clone())),e("<div>").addClass("datepicker-decades").append(e("<table>").addClass("table-condensed").append(t.clone()).append(a.clone()))]},P=function(){var t=e("<tr>"),a=e("<tr>"),r=e("<tr>");return T("h")&&(t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(e("<span>").addClass(n.icons.up)))),a.append(e("<td>").append(e("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:n.tooltips.pickHour}).attr("data-action","showHours"))),r.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(e("<span>").addClass(n.icons.down))))),T("m")&&(T("h")&&(t.append(e("<td>").addClass("separator")),a.append(e("<td>").addClass("separator").html(":")),r.append(e("<td>").addClass("separator"))),t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(e("<span>").addClass(n.icons.up)))),a.append(e("<td>").append(e("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:n.tooltips.pickMinute}).attr("data-action","showMinutes"))),r.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(e("<span>").addClass(n.icons.down))))),T("s")&&(T("m")&&(t.append(e("<td>").addClass("separator")),a.append(e("<td>").addClass("separator").html(":")),r.append(e("<td>").addClass("separator"))),t.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(e("<span>").addClass(n.icons.up)))),a.append(e("<td>").append(e("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:n.tooltips.pickSecond}).attr("data-action","showSeconds"))),r.append(e("<td>").append(e("<a>").attr({href:"#",tabindex:"-1",title:n.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(e("<span>").addClass(n.icons.down))))),d||(t.append(e("<td>").addClass("separator")),a.append(e("<td>").append(e("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:n.tooltips.togglePeriod}))),r.append(e("<td>").addClass("separator"))),e("<div>").addClass("timepicker-picker").append(e("<table>").addClass("table-condensed").append([t,a,r]))},E=function(){var t=e("<div>").addClass("timepicker-hours").append(e("<table>").addClass("table-condensed")),a=e("<div>").addClass("timepicker-minutes").append(e("<table>").addClass("table-condensed")),n=e("<div>").addClass("timepicker-seconds").append(e("<table>").addClass("table-condensed")),r=[P()];return T("h")&&r.push(t),T("m")&&r.push(a),T("s")&&r.push(n),r},H=function(){var t=[];return n.showTodayButton&&t.push(e("<td>").append(e("<a>").attr({"data-action":"today",title:n.tooltips.today}).append(e("<span>").addClass(n.icons.today)))),!n.sideBySide&&S()&&M()&&t.push(e("<td>").append(e("<a>").attr({"data-action":"togglePicker",title:n.tooltips.selectTime}).append(e("<span>").addClass(n.icons.time)))),n.showClear&&t.push(e("<td>").append(e("<a>").attr({"data-action":"clear",title:n.tooltips.clear}).append(e("<span>").addClass(n.icons.clear)))),n.showClose&&t.push(e("<td>").append(e("<a>").attr({"data-action":"close",title:n.tooltips.close}).append(e("<span>").addClass(n.icons.close)))),e("<table>").addClass("table-condensed").append(e("<tbody>").append(e("<tr>").append(t)))},I=function(){var t=e("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),a=e("<div>").addClass("datepicker").append(O()),r=e("<div>").addClass("timepicker").append(E()),i=e("<ul>").addClass("list-unstyled"),o=e("<li>").addClass("picker-switch"+(n.collapse?" accordion-toggle":"")).append(H());return n.inline&&t.removeClass("dropdown-menu"),d&&t.addClass("usetwentyfour"),T("s")&&!d&&t.addClass("wider"),n.sideBySide&&S()&&M()?(t.addClass("timepicker-sbs"),"top"===n.toolbarPlacement&&t.append(o),t.append(e("<div>").addClass("row").append(a.addClass("col-md-6")).append(r.addClass("col-md-6"))),"bottom"===n.toolbarPlacement&&t.append(o),t):("top"===n.toolbarPlacement&&i.append(o),S()&&i.append(e("<li>").addClass(n.collapse&&M()?"collapse in":"").append(a)),"default"===n.toolbarPlacement&&i.append(o),M()&&i.append(e("<li>").addClass(n.collapse&&S()?"collapse":"").append(r)),"bottom"===n.toolbarPlacement&&i.append(o),t.append(i))},Y=function(){var t,r={};return t=a.is("input")||n.inline?a.data():a.find("input").data(),t.dateOptions&&t.dateOptions instanceof Object&&(r=e.extend(!0,r,t.dateOptions)),e.each(n,function(e){var a="date"+e.charAt(0).toUpperCase()+e.slice(1);void 0!==t[a]&&(r[e]=t[a])}),r},q=function(){var t,r=(f||a).position(),i=(f||a).offset(),o=n.widgetPositioning.vertical,d=n.widgetPositioning.horizontal;if(n.widgetParent)t=n.widgetParent.append(m);else if(a.is("input"))t=a.after(m).parent();else{if(n.inline)return void(t=a.append(m));t=a,a.children().first().after(m)}if("auto"===o&&(o=i.top+1.5*m.height()>=e(window).height()+e(window).scrollTop()&&m.height()+a.outerHeight()<i.top?"top":"bottom"),"auto"===d&&(d=t.width()<i.left+m.outerWidth()/2&&i.left+m.outerWidth()>e(window).width()?"right":"left"),"top"===o?m.addClass("top").removeClass("bottom"):m.addClass("bottom").removeClass("top"),"right"===d?m.addClass("pull-right"):m.removeClass("pull-right"),"relative"!==t.css("position")&&(t=t.parents().filter(function(){return"relative"===e(this).css("position")}).first()),0===t.length)throw new Error("datetimepicker component should be placed within a relative positioned container");m.css({top:"top"===o?"auto":r.top+a.outerHeight(),bottom:"top"===o?t.outerHeight()-(t===a?0:r.top):"auto",left:"left"===d?t===a?0:r.left:"auto",right:"left"===d?"auto":t.outerWidth()-a.outerWidth()-(t===a?0:r.left)})},B=function(e){"dp.change"===e.type&&(e.date&&e.date.isSame(e.oldDate)||!e.date&&!e.oldDate)||a.trigger(e)},j=function(e){"y"===e&&(e="YYYY"),B({type:"dp.update",change:e,viewDate:i.clone()})},A=function(e){m&&(e&&(p=Math.max(h,Math.min(3,p+e))),m.find(".datepicker > div").hide().filter(".datepicker-"+y[p].clsName).show())},F=function(){var t=e("<tr>"),a=i.clone().startOf("w").startOf("d");for(n.calendarWeeks===!0&&t.append(e("<th>").addClass("cw").text("#"));a.isBefore(i.clone().endOf("w"));)t.append(e("<th>").addClass("dow").text(a.format("dd"))),a.add(1,"d");m.find(".datepicker-days thead").append(t)},L=function(e){return n.disabledDates[e.format("YYYY-MM-DD")]===!0},W=function(e){return n.enabledDates[e.format("YYYY-MM-DD")]===!0},z=function(e){return n.disabledHours[e.format("H")]===!0},N=function(e){return n.enabledHours[e.format("H")]===!0},V=function(t,a){if(!t.isValid())return!1;if(n.disabledDates&&"d"===a&&L(t))return!1;if(n.enabledDates&&"d"===a&&!W(t))return!1;if(n.minDate&&t.isBefore(n.minDate,a))return!1;if(n.maxDate&&t.isAfter(n.maxDate,a))return!1;if(n.daysOfWeekDisabled&&"d"===a&&-1!==n.daysOfWeekDisabled.indexOf(t.day()))return!1;if(n.disabledHours&&("h"===a||"m"===a||"s"===a)&&z(t))return!1;if(n.enabledHours&&("h"===a||"m"===a||"s"===a)&&!N(t))return!1;if(n.disabledTimeIntervals&&("h"===a||"m"===a||"s"===a)){var r=!1;if(e.each(n.disabledTimeIntervals,function(){return t.isBetween(this[0],this[1])?(r=!0,!1):void 0}),r)return!1}return!0},Z=function(){for(var t=[],a=i.clone().startOf("y").startOf("d");a.isSame(i,"y");)t.push(e("<span>").attr("data-action","selectMonth").addClass("month").text(a.format("MMM"))),a.add(1,"M");m.find(".datepicker-months td").empty().append(t)},R=function(){var t=m.find(".datepicker-months"),a=t.find("th"),o=t.find("tbody").find("span");a.eq(0).find("span").attr("title",n.tooltips.prevYear),a.eq(1).attr("title",n.tooltips.selectYear),a.eq(2).find("span").attr("title",n.tooltips.nextYear),t.find(".disabled").removeClass("disabled"),V(i.clone().subtract(1,"y"),"y")||a.eq(0).addClass("disabled"),a.eq(1).text(i.year()),V(i.clone().add(1,"y"),"y")||a.eq(2).addClass("disabled"),o.removeClass("active"),r.isSame(i,"y")&&!u&&o.eq(r.month()).addClass("active"),o.each(function(t){V(i.clone().month(t),"M")||e(this).addClass("disabled")})},Q=function(){var e=m.find(".datepicker-years"),t=e.find("th"),a=i.clone().subtract(5,"y"),o=i.clone().add(6,"y"),d="";for(t.eq(0).find("span").attr("title",n.tooltips.prevDecade),t.eq(1).attr("title",n.tooltips.selectDecade),t.eq(2).find("span").attr("title",n.tooltips.nextDecade),e.find(".disabled").removeClass("disabled"),n.minDate&&n.minDate.isAfter(a,"y")&&t.eq(0).addClass("disabled"),t.eq(1).text(a.year()+"-"+o.year()),n.maxDate&&n.maxDate.isBefore(o,"y")&&t.eq(2).addClass("disabled");!a.isAfter(o,"y");)d+='<span data-action="selectYear" class="year'+(a.isSame(r,"y")&&!u?" active":"")+(V(a,"y")?"":" disabled")+'">'+a.year()+"</span>",a.add(1,"y");e.find("td").html(d)},U=function(){var e,a=m.find(".datepicker-decades"),o=a.find("th"),d=t({y:i.year()-i.year()%100-1}),s=d.clone().add(100,"y"),l=d.clone(),p=!1,c=!1,u="";for(o.eq(0).find("span").attr("title",n.tooltips.prevCentury),o.eq(2).find("span").attr("title",n.tooltips.nextCentury),a.find(".disabled").removeClass("disabled"),(d.isSame(t({y:1900}))||n.minDate&&n.minDate.isAfter(d,"y"))&&o.eq(0).addClass("disabled"),o.eq(1).text(d.year()+"-"+s.year()),(d.isSame(t({y:2e3}))||n.maxDate&&n.maxDate.isBefore(s,"y"))&&o.eq(2).addClass("disabled");!d.isAfter(s,"y");)e=d.year()+12,p=n.minDate&&n.minDate.isAfter(d,"y")&&n.minDate.year()<=e,c=n.maxDate&&n.maxDate.isAfter(d,"y")&&n.maxDate.year()<=e,u+='<span data-action="selectDecade" class="decade'+(r.isAfter(d)&&r.year()<=e?" active":"")+(V(d,"y")||p||c?"":" disabled")+'" data-selection="'+(d.year()+6)+'">'+(d.year()+1)+" - "+(d.year()+12)+"</span>",d.add(12,"y");u+="<span></span><span></span><span></span>",a.find("td").html(u),o.eq(1).text(l.year()+1+"-"+d.year())},G=function(){var t,a,o,d,s=m.find(".datepicker-days"),l=s.find("th"),p=[];if(S()){for(l.eq(0).find("span").attr("title",n.tooltips.prevMonth),l.eq(1).attr("title",n.tooltips.selectMonth),l.eq(2).find("span").attr("title",n.tooltips.nextMonth),s.find(".disabled").removeClass("disabled"),l.eq(1).text(i.format(n.dayViewHeaderFormat)),V(i.clone().subtract(1,"M"),"M")||l.eq(0).addClass("disabled"),V(i.clone().add(1,"M"),"M")||l.eq(2).addClass("disabled"),t=i.clone().startOf("M").startOf("w").startOf("d"),d=0;42>d;d++)0===t.weekday()&&(a=e("<tr>"),n.calendarWeeks&&a.append('<td class="cw">'+t.week()+"</td>"),p.push(a)),o="",t.isBefore(i,"M")&&(o+=" old"),t.isAfter(i,"M")&&(o+=" new"),t.isSame(r,"d")&&!u&&(o+=" active"),V(t,"d")||(o+=" disabled"),t.isSame(x(),"d")&&(o+=" today"),0!==t.day()&&6!==t.day()||(o+=" weekend"),a.append('<td data-action="selectDay" data-day="'+t.format("L")+'" class="day'+o+'">'+t.date()+"</td>"),t.add(1,"d");s.find("tbody").empty().append(p),R(),Q(),U()}},J=function(){var t=m.find(".timepicker-hours table"),a=i.clone().startOf("d"),n=[],r=e("<tr>");for(i.hour()>11&&!d&&a.hour(12);a.isSame(i,"d")&&(d||i.hour()<12&&a.hour()<12||i.hour()>11);)a.hour()%4===0&&(r=e("<tr>"),n.push(r)),r.append('<td data-action="selectHour" class="hour'+(V(a,"h")?"":" disabled")+'">'+a.format(d?"HH":"hh")+"</td>"),a.add(1,"h");t.empty().append(n)},K=function(){for(var t=m.find(".timepicker-minutes table"),a=i.clone().startOf("h"),r=[],o=e("<tr>"),d=1===n.stepping?5:n.stepping;i.isSame(a,"h");)a.minute()%(4*d)===0&&(o=e("<tr>"),r.push(o)),o.append('<td data-action="selectMinute" class="minute'+(V(a,"m")?"":" disabled")+'">'+a.format("mm")+"</td>"),a.add(d,"m");t.empty().append(r)},X=function(){for(var t=m.find(".timepicker-seconds table"),a=i.clone().startOf("m"),n=[],r=e("<tr>");i.isSame(a,"m");)a.second()%20===0&&(r=e("<tr>"),n.push(r)),r.append('<td data-action="selectSecond" class="second'+(V(a,"s")?"":" disabled")+'">'+a.format("ss")+"</td>"),a.add(5,"s");t.empty().append(n)},$=function(){var e,t,a=m.find(".timepicker span[data-time-component]");d||(e=m.find(".timepicker [data-action=togglePeriod]"),t=r.clone().add(r.hours()>=12?-12:12,"h"),e.text(r.format("A")),V(t,"h")?e.removeClass("disabled"):e.addClass("disabled")),a.filter("[data-time-component=hours]").text(r.format(d?"HH":"hh")),a.filter("[data-time-component=minutes]").text(r.format("mm")),a.filter("[data-time-component=seconds]").text(r.format("ss")),J(),K(),X()},_=function(){m&&(G(),$())},ee=function(e){var t=u?null:r;return e?(e=e.clone().locale(n.locale),D()&&e.tz(n.timeZone),1!==n.stepping&&e.minutes(Math.round(e.minutes()/n.stepping)*n.stepping).seconds(0),void(V(e)?(r=e,o.val(r.format(s)),a.data("date",r.format(s)),u=!1,_(),B({type:"dp.change",date:r.clone(),oldDate:t})):(n.keepInvalid?B({type:"dp.change",date:e,oldDate:t}):o.val(u?"":r.format(s)),B({type:"dp.error",date:e,oldDate:t})))):(u=!0,o.val(""),a.data("date",""),B({type:"dp.change",date:!1,oldDate:t}),void _())},te=function(){var t=!1;return m?(m.find(".collapse").each(function(){var a=e(this).data("collapse");return!a||!a.transitioning||(t=!0,!1)}),t?c:(f&&f.hasClass("btn")&&f.toggleClass("active"),m.hide(),e(window).off("resize",q),m.off("click","[data-action]"),m.off("mousedown",!1),m.remove(),m=!1,B({type:"dp.hide",date:r.clone()}),o.blur(),p=0,i=r.clone(),c)):c},ae=function(){ee(null)},ne=function(e){return void 0===n.parseInputDate?t.isMoment(e)||(e=x(e)):e=n.parseInputDate(e),e},re={next:function(){var e=y[p].navFnc;i.add(y[p].navStep,e),G(),j(e)},previous:function(){var e=y[p].navFnc;i.subtract(y[p].navStep,e),G(),j(e)},pickerSwitch:function(){A(1)},selectMonth:function(t){var a=e(t.target).closest("tbody").find("span").index(e(t.target));i.month(a),p===h?(ee(r.clone().year(i.year()).month(i.month())),n.inline||te()):(A(-1),G()),j("M")},selectYear:function(t){var a=parseInt(e(t.target).text(),10)||0;i.year(a),p===h?(ee(r.clone().year(i.year())),n.inline||te()):(A(-1),G()),j("YYYY")},selectDecade:function(t){var a=parseInt(e(t.target).data("selection"),10)||0;i.year(a),p===h?(ee(r.clone().year(i.year())),n.inline||te()):(A(-1),G()),j("YYYY")},selectDay:function(t){var a=i.clone();e(t.target).is(".old")&&a.subtract(1,"M"),e(t.target).is(".new")&&a.add(1,"M"),ee(a.date(parseInt(e(t.target).text(),10))),M()||n.keepOpen||n.inline||te()},incrementHours:function(){var e=r.clone().add(1,"h");V(e,"h")&&ee(e)},incrementMinutes:function(){var e=r.clone().add(n.stepping,"m");V(e,"m")&&ee(e)},incrementSeconds:function(){var e=r.clone().add(1,"s");V(e,"s")&&ee(e)},decrementHours:function(){var e=r.clone().subtract(1,"h");V(e,"h")&&ee(e)},decrementMinutes:function(){var e=r.clone().subtract(n.stepping,"m");V(e,"m")&&ee(e)},decrementSeconds:function(){var e=r.clone().subtract(1,"s");V(e,"s")&&ee(e)},togglePeriod:function(){ee(r.clone().add(r.hours()>=12?-12:12,"h"))},togglePicker:function(t){var a,r=e(t.target),i=r.closest("ul"),o=i.find(".in"),d=i.find(".collapse:not(.in)");if(o&&o.length){if(a=o.data("collapse"),a&&a.transitioning)return;o.collapse?(o.collapse("hide"),d.collapse("show")):(o.removeClass("in"),d.addClass("in")),r.is("span")?r.toggleClass(n.icons.time+" "+n.icons.date):r.find("span").toggleClass(n.icons.time+" "+n.icons.date)}},showPicker:function(){m.find(".timepicker > div:not(.timepicker-picker)").hide(),m.find(".timepicker .timepicker-picker").show()},showHours:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-hours").show()},showMinutes:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){m.find(".timepicker .timepicker-picker").hide(),m.find(".timepicker .timepicker-seconds").show()},selectHour:function(t){var a=parseInt(e(t.target).text(),10);d||(r.hours()>=12?12!==a&&(a+=12):12===a&&(a=0)),ee(r.clone().hours(a)),re.showPicker.call(c)},selectMinute:function(t){ee(r.clone().minutes(parseInt(e(t.target).text(),10))),re.showPicker.call(c)},selectSecond:function(t){ee(r.clone().seconds(parseInt(e(t.target).text(),10))),re.showPicker.call(c)},clear:ae,today:function(){var e=x();V(e,"d")&&ee(e)},close:te},ie=function(t){return!e(t.currentTarget).is(".disabled")&&(re[e(t.currentTarget).data("action")].apply(c,arguments),!1)},oe=function(){var t,a={year:function(e){return e.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(e){return e.date(1).hours(0).seconds(0).minutes(0)},day:function(e){return e.hours(0).seconds(0).minutes(0)},hour:function(e){return e.seconds(0).minutes(0)},minute:function(e){return e.seconds(0)}};return o.prop("disabled")||!n.ignoreReadonly&&o.prop("readonly")||m?c:(void 0!==o.val()&&0!==o.val().trim().length?ee(ne(o.val().trim())):u&&n.useCurrent&&(n.inline||o.is("input")&&0===o.val().trim().length)&&(t=x(),"string"==typeof n.useCurrent&&(t=a[n.useCurrent](t)),ee(t)),m=I(),F(),Z(),m.find(".timepicker-hours").hide(),m.find(".timepicker-minutes").hide(),m.find(".timepicker-seconds").hide(),_(),A(),e(window).on("resize",q),m.on("click","[data-action]",ie),m.on("mousedown",!1),f&&f.hasClass("btn")&&f.toggleClass("active"),q(),m.show(),n.focusOnShow&&!o.is(":focus")&&o.focus(),B({type:"dp.show"}),c)},de=function(){return m?te():oe()},se=function(e){var t,a,r,i,o=null,d=[],s={},l=e.which,p="p";C[l]=p;for(t in C)C.hasOwnProperty(t)&&C[t]===p&&(d.push(t),parseInt(t,10)!==l&&(s[t]=!0));for(t in n.keyBinds)if(n.keyBinds.hasOwnProperty(t)&&"function"==typeof n.keyBinds[t]&&(r=t.split(" "),r.length===d.length&&k[l]===r[r.length-1])){for(i=!0,a=r.length-2;a>=0;a--)if(!(k[r[a]]in s)){i=!1;break}if(i){o=n.keyBinds[t];break}}o&&(o.call(c,m),e.stopPropagation(),e.preventDefault())},le=function(e){C[e.which]="r",e.stopPropagation(),e.preventDefault()},pe=function(t){var a=e(t.target).val().trim(),n=a?ne(a):null;return ee(n),t.stopImmediatePropagation(),!1},ce=function(){o.on({change:pe,blur:n.debug?"":te,keydown:se,keyup:le,focus:n.allowInputToggle?oe:""}),a.is("input")?o.on({focus:oe}):f&&(f.on("click",de),f.on("mousedown",!1))},ue=function(){o.off({change:pe,blur:blur,keydown:se,keyup:le,focus:n.allowInputToggle?te:""}),a.is("input")?o.off({focus:oe}):f&&(f.off("click",de),f.off("mousedown",!1))},fe=function(t){var a={};return e.each(t,function(){var e=ne(this);e.isValid()&&(a[e.format("YYYY-MM-DD")]=!0)}),!!Object.keys(a).length&&a},me=function(t){var a={};return e.each(t,function(){a[this]=!0}),!!Object.keys(a).length&&a},he=function(){var e=n.format||"L LT";s=e.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(e){var t=r.localeData().longDateFormat(e)||e;return t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(e){return r.localeData().longDateFormat(e)||e})}),l=n.extraFormats?n.extraFormats.slice():[],l.indexOf(e)<0&&l.indexOf(s)<0&&l.push(s),d=s.toLowerCase().indexOf("a")<1&&s.replace(/\[.*?\]/g,"").indexOf("h")<1,T("y")&&(h=2),T("M")&&(h=1),T("d")&&(h=0),p=Math.max(h,p),u||ee(r)};if(c.destroy=function(){te(),ue(),a.removeData("DateTimePicker"),a.removeData("date")},c.toggle=de,c.show=oe,c.hide=te,c.disable=function(){return te(),f&&f.hasClass("btn")&&f.addClass("disabled"),o.prop("disabled",!0),c},c.enable=function(){return f&&f.hasClass("btn")&&f.removeClass("disabled"),o.prop("disabled",!1),c},c.ignoreReadonly=function(e){if(0===arguments.length)return n.ignoreReadonly;if("boolean"!=typeof e)throw new TypeError("ignoreReadonly () expects a boolean parameter");return n.ignoreReadonly=e,c},c.options=function(t){if(0===arguments.length)return e.extend(!0,{},n);if(!(t instanceof Object))throw new TypeError("options() options parameter should be an object");return e.extend(!0,n,t),e.each(n,function(e,t){if(void 0===c[e])throw new TypeError("option "+e+" is not recognized!");c[e](t)}),c},c.date=function(e){if(0===arguments.length)return u?null:r.clone();if(!(null===e||"string"==typeof e||t.isMoment(e)||e instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return ee(null===e?null:ne(e)),c},c.format=function(e){if(0===arguments.length)return n.format;if("string"!=typeof e&&("boolean"!=typeof e||e!==!1))throw new TypeError("format() expects a string or boolean:false parameter "+e);return n.format=e,s&&he(),c},c.timeZone=function(e){if(0===arguments.length)return n.timeZone;if("string"!=typeof e)throw new TypeError("newZone() expects a string parameter");return n.timeZone=e,c},c.dayViewHeaderFormat=function(e){if(0===arguments.length)return n.dayViewHeaderFormat;if("string"!=typeof e)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return n.dayViewHeaderFormat=e,c},c.extraFormats=function(e){if(0===arguments.length)return n.extraFormats;if(e!==!1&&!(e instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return n.extraFormats=e,l&&he(),c},c.disabledDates=function(t){if(0===arguments.length)return n.disabledDates?e.extend({},n.disabledDates):n.disabledDates;if(!t)return n.disabledDates=!1,_(),c;if(!(t instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return n.disabledDates=fe(t),n.enabledDates=!1,_(),c},c.enabledDates=function(t){if(0===arguments.length)return n.enabledDates?e.extend({},n.enabledDates):n.enabledDates;if(!t)return n.enabledDates=!1,_(),c;if(!(t instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return n.enabledDates=fe(t),n.disabledDates=!1,_(),c},c.daysOfWeekDisabled=function(e){if(0===arguments.length)return n.daysOfWeekDisabled.splice(0);if("boolean"==typeof e&&!e)return n.daysOfWeekDisabled=!1,_(),c;if(!(e instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(n.daysOfWeekDisabled=e.reduce(function(e,t){return t=parseInt(t,10),t>6||0>t||isNaN(t)?e:(-1===e.indexOf(t)&&e.push(t),e)},[]).sort(),n.useCurrent&&!n.keepInvalid){for(var t=0;!V(r,"d");){if(r.add(1,"d"),7===t)throw"Tried 7 times to find a valid date";t++}ee(r)}return _(),c},c.maxDate=function(e){if(0===arguments.length)return n.maxDate?n.maxDate.clone():n.maxDate;if("boolean"==typeof e&&e===!1)return n.maxDate=!1,_(),c;"string"==typeof e&&("now"!==e&&"moment"!==e||(e=x()));var t=ne(e);if(!t.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+e);if(n.minDate&&t.isBefore(n.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+t.format(s));return n.maxDate=t,n.useCurrent&&!n.keepInvalid&&r.isAfter(e)&&ee(n.maxDate),i.isAfter(t)&&(i=t.clone().subtract(n.stepping,"m")),_(),c},c.minDate=function(e){if(0===arguments.length)return n.minDate?n.minDate.clone():n.minDate;if("boolean"==typeof e&&e===!1)return n.minDate=!1,_(),c;"string"==typeof e&&("now"!==e&&"moment"!==e||(e=x()));var t=ne(e);if(!t.isValid())throw new TypeError("minDate() Could not parse date parameter: "+e);if(n.maxDate&&t.isAfter(n.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+t.format(s));return n.minDate=t,n.useCurrent&&!n.keepInvalid&&r.isBefore(e)&&ee(n.minDate),i.isBefore(t)&&(i=t.clone().add(n.stepping,"m")),_(),c},c.defaultDate=function(e){if(0===arguments.length)return n.defaultDate?n.defaultDate.clone():n.defaultDate;if(!e)return n.defaultDate=!1,c;"string"==typeof e&&(e="now"===e||"moment"===e?x():x(e));var t=ne(e);if(!t.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+e);if(!V(t))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return n.defaultDate=t,(n.defaultDate&&n.inline||""===o.val().trim())&&ee(n.defaultDate),c},c.locale=function(e){if(0===arguments.length)return n.locale;if(!t.localeData(e))throw new TypeError("locale() locale "+e+" is not loaded from moment locales!");return n.locale=e,r.locale(n.locale),i.locale(n.locale),s&&he(),m&&(te(),oe()),c},c.stepping=function(e){return 0===arguments.length?n.stepping:(e=parseInt(e,10),(isNaN(e)||1>e)&&(e=1),n.stepping=e,c)},c.useCurrent=function(e){var t=["year","month","day","hour","minute"];if(0===arguments.length)return n.useCurrent;if("boolean"!=typeof e&&"string"!=typeof e)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof e&&-1===t.indexOf(e.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of "+t.join(", "));return n.useCurrent=e,c},c.collapse=function(e){if(0===arguments.length)return n.collapse;if("boolean"!=typeof e)throw new TypeError("collapse() expects a boolean parameter");return n.collapse===e?c:(n.collapse=e,m&&(te(),oe()),c)},c.icons=function(t){if(0===arguments.length)return e.extend({},n.icons);if(!(t instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return e.extend(n.icons,t),m&&(te(),oe()),c},c.tooltips=function(t){if(0===arguments.length)return e.extend({},n.tooltips);if(!(t instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");return e.extend(n.tooltips,t),m&&(te(),oe()),c},c.useStrict=function(e){if(0===arguments.length)return n.useStrict;if("boolean"!=typeof e)throw new TypeError("useStrict() expects a boolean parameter");return n.useStrict=e,c},c.sideBySide=function(e){if(0===arguments.length)return n.sideBySide;if("boolean"!=typeof e)throw new TypeError("sideBySide() expects a boolean parameter");return n.sideBySide=e,m&&(te(),oe()),c},c.viewMode=function(e){if(0===arguments.length)return n.viewMode;if("string"!=typeof e)throw new TypeError("viewMode() expects a string parameter");if(-1===b.indexOf(e))throw new TypeError("viewMode() parameter must be one of ("+b.join(", ")+") value");return n.viewMode=e,p=Math.max(b.indexOf(e),h),A(),c},c.toolbarPlacement=function(e){if(0===arguments.length)return n.toolbarPlacement;if("string"!=typeof e)throw new TypeError("toolbarPlacement() expects a string parameter");if(-1===v.indexOf(e))throw new TypeError("toolbarPlacement() parameter must be one of ("+v.join(", ")+") value");return n.toolbarPlacement=e,m&&(te(),oe()),c},c.widgetPositioning=function(t){if(0===arguments.length)return e.extend({},n.widgetPositioning);if("[object Object]"!=={}.toString.call(t))throw new TypeError("widgetPositioning() expects an object variable");if(t.horizontal){if("string"!=typeof t.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(t.horizontal=t.horizontal.toLowerCase(),-1===g.indexOf(t.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+g.join(", ")+")");n.widgetPositioning.horizontal=t.horizontal}if(t.vertical){if("string"!=typeof t.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(t.vertical=t.vertical.toLowerCase(),-1===w.indexOf(t.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+w.join(", ")+")");n.widgetPositioning.vertical=t.vertical}return _(),c},c.calendarWeeks=function(e){if(0===arguments.length)return n.calendarWeeks;if("boolean"!=typeof e)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return n.calendarWeeks=e,_(),c},c.showTodayButton=function(e){if(0===arguments.length)return n.showTodayButton;if("boolean"!=typeof e)throw new TypeError("showTodayButton() expects a boolean parameter");return n.showTodayButton=e,m&&(te(),oe()),c},c.showClear=function(e){if(0===arguments.length)return n.showClear;if("boolean"!=typeof e)throw new TypeError("showClear() expects a boolean parameter");return n.showClear=e,m&&(te(),oe()),c},c.widgetParent=function(t){if(0===arguments.length)return n.widgetParent;if("string"==typeof t&&(t=e(t)),null!==t&&"string"!=typeof t&&!(t instanceof e))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return n.widgetParent=t,m&&(te(),oe()),c},c.keepOpen=function(e){if(0===arguments.length)return n.keepOpen;if("boolean"!=typeof e)throw new TypeError("keepOpen() expects a boolean parameter");return n.keepOpen=e,c},c.focusOnShow=function(e){if(0===arguments.length)return n.focusOnShow;if("boolean"!=typeof e)throw new TypeError("focusOnShow() expects a boolean parameter");return n.focusOnShow=e,c},c.inline=function(e){if(0===arguments.length)return n.inline;if("boolean"!=typeof e)throw new TypeError("inline() expects a boolean parameter");return n.inline=e,c},c.clear=function(){return ae(),c},c.keyBinds=function(e){return 0===arguments.length?n.keyBinds:(n.keyBinds=e,c)},c.getMoment=function(e){return x(e)},c.debug=function(e){if("boolean"!=typeof e)throw new TypeError("debug() expects a boolean parameter");return n.debug=e,c},c.allowInputToggle=function(e){if(0===arguments.length)return n.allowInputToggle;if("boolean"!=typeof e)throw new TypeError("allowInputToggle() expects a boolean parameter");return n.allowInputToggle=e,c},c.showClose=function(e){if(0===arguments.length)return n.showClose;if("boolean"!=typeof e)throw new TypeError("showClose() expects a boolean parameter");return n.showClose=e,c},c.keepInvalid=function(e){if(0===arguments.length)return n.keepInvalid;if("boolean"!=typeof e)throw new TypeError("keepInvalid() expects a boolean parameter");return n.keepInvalid=e,c},c.datepickerInput=function(e){if(0===arguments.length)return n.datepickerInput;if("string"!=typeof e)throw new TypeError("datepickerInput() expects a string parameter");
return n.datepickerInput=e,c},c.parseInputDate=function(e){if(0===arguments.length)return n.parseInputDate;if("function"!=typeof e)throw new TypeError("parseInputDate() sholud be as function");return n.parseInputDate=e,c},c.disabledTimeIntervals=function(t){if(0===arguments.length)return n.disabledTimeIntervals?e.extend({},n.disabledTimeIntervals):n.disabledTimeIntervals;if(!t)return n.disabledTimeIntervals=!1,_(),c;if(!(t instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return n.disabledTimeIntervals=t,_(),c},c.disabledHours=function(t){if(0===arguments.length)return n.disabledHours?e.extend({},n.disabledHours):n.disabledHours;if(!t)return n.disabledHours=!1,_(),c;if(!(t instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(n.disabledHours=me(t),n.enabledHours=!1,n.useCurrent&&!n.keepInvalid){for(var a=0;!V(r,"h");){if(r.add(1,"h"),24===a)throw"Tried 24 times to find a valid date";a++}ee(r)}return _(),c},c.enabledHours=function(t){if(0===arguments.length)return n.enabledHours?e.extend({},n.enabledHours):n.enabledHours;if(!t)return n.enabledHours=!1,_(),c;if(!(t instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(n.enabledHours=me(t),n.disabledHours=!1,n.useCurrent&&!n.keepInvalid){for(var a=0;!V(r,"h");){if(r.add(1,"h"),24===a)throw"Tried 24 times to find a valid date";a++}ee(r)}return _(),c},c.viewDate=function(e){if(0===arguments.length)return i.clone();if(!e)return i=r.clone(),c;if(!("string"==typeof e||t.isMoment(e)||e instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return i=ne(e),j(),c},a.is("input"))o=a;else if(o=a.find(n.datepickerInput),0===o.length)o=a.find("input");else if(!o.is("input"))throw new Error('CSS class "'+n.datepickerInput+'" cannot be applied to non input element');if(a.hasClass("input-group")&&(f=0===a.find(".datepickerbutton").length?a.find(".input-group-addon"):a.find(".datepickerbutton")),!n.inline&&!o.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return r=x(),i=r.clone(),e.extend(!0,n,Y()),c.options(n),he(),ce(),o.prop("disabled")&&c.disable(),o.is("input")&&0!==o.val().trim().length?ee(ne(o.val().trim())):n.defaultDate&&void 0===o.attr("placeholder")&&ee(n.defaultDate),n.inline&&oe(),c};e.fn.datetimepicker=function(t){t=t||{};var n,r=Array.prototype.slice.call(arguments,1),i=!0,o=["destroy","hide","show","toggle"];if("object"==typeof t)return this.each(function(){var n=e(this);n.data("DateTimePicker")||(t=e.extend(!0,{},e.fn.datetimepicker.defaults,t),n.data("DateTimePicker",a(n,t)))});if("string"==typeof t)return this.each(function(){var a=e(this),o=a.data("DateTimePicker");if(!o)throw new Error('bootstrap-datetimepicker("'+t+'") method was called on an element that is not using DateTimePicker');n=o[t].apply(o,r),i=n===o}),i||e.inArray(t,o)>-1?this:n;throw new TypeError("Invalid arguments for DateTimePicker: "+t)},e.fn.datetimepicker.defaults={timeZone:"",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:t.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-chevron-up",down:"fa fa-chevron-down",previous:"fa fa-chevron-left",next:"fa fa-chevron-right",today:"fa fa-screenshot",clear:"fa fa-trash",close:"fa fa-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")?this.date(t.clone().subtract(7,"d")):this.date(t.clone().add(this.stepping(),"m"))}},down:function(e){if(!e)return void this.show();var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")?this.date(t.clone().add(7,"d")):this.date(t.clone().subtract(this.stepping(),"m"))},"control up":function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")?this.date(t.clone().subtract(1,"y")):this.date(t.clone().add(1,"h"))}},"control down":function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")?this.date(t.clone().add(1,"y")):this.date(t.clone().subtract(1,"h"))}},left:function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")&&this.date(t.clone().subtract(1,"d"))}},right:function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")&&this.date(t.clone().add(1,"d"))}},pageUp:function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")&&this.date(t.clone().subtract(1,"M"))}},pageDown:function(e){if(e){var t=this.date()||this.getMoment();e.find(".datepicker").is(":visible")&&this.date(t.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(e){e.find(".timepicker").is(":visible")&&e.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(this.getMoment())},"delete":function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1},"undefined"!=typeof module&&(module.exports=e.fn.datetimepicker)});