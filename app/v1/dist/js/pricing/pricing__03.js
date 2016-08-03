//
//
//
//
//  Remove items in workbench on clicking "x"
$(document).on("click", ".sortable-remove", function() {
    $(this).parent('.sortable').remove();
});
//  Remove all items in workbench on clicking "clear all"
$(".sortable-remove-all").on("click", function() {
    $(this).parent().next('.sortable-workbench').empty();
    $("#pricing__template__creation__step3__preview").empty();
});
//
//
//
//
//  Toggle active state in "Associated States"
$(".active-toggle .btn").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active")
    } else {
        $(this).addClass("active");
    }
});
//  Remove active statess in "associated stated" when clicking "clear"
$(".sortable-remove-all").on("click", function() {
    $(this).parent().parent().next('.btn-tags').children().removeClass("active");
});
//  Enable all active statess in "associated stated" when clicking "Select all"
$(".sortable-select-all").on("click", function() {
    $(this).parent().parent().next('.btn-tags').children().addClass("active");
});
//
//
//
//
//  Change Text
$("[data-change='text']").on("input", function() {
    updateText($(this));
    UpdatePreview();
});
//  Change Text
$("[data-change='value']").on("input", function() {
    updateValue($(this));
    UpdatePreview();
});
//  Change Sizes
$("[data-change='size']").on("change", function() {
    updateSize($(this));
    UpdatePreview();
});
//  Change Style
$("[data-change='style']").on("change", function() {
    updateStyle($(this));
    UpdatePreview();
});
//
//
//
//
//  Update Workbench on Modal Load
$(".modal").on('show.bs.modal', function(e) {
    //  config
    var this__type = $(this).attr("id");
    var this__type = "#" + this__type.replace("_modal", '');
    //  update workbench text
    var this__title = $(this__type + "_text").val();
    $(".sortable-workbench " + this__type + " .sortable-text-label").text(this__title);
    //  update workbench style
    var this__style = $(this__type + "_preview").attr("class");
    $(".sortable-workbench " + this__type + " .sortable-text-label").addClass(this__style);
});
//  Update Text
function updateText(el) {
    //  config
    var this__type = getType(el);
    var this__title = el.val();
    //  update preview
    $(this__type + "_preview").text(this__title);
    //  update workbench
    $(".sortable-workbench " + this__type + " .sortable-text-label").text(this__title);
}
//  Update Value
function updateValue(el) {
    //  config
    var this__type = getType(el);
    var this__title = el.val();
    //  update preview
    $(this__type + "_preview_value").text(this__title);
    //  update workbench
    $(".sortable-workbench " + this__type + " .sortable-text-value").text(this__title);
}
//  Update Size
function updateSize(el) {
    //  config
    var this__type = getType(el);
    var this__size = el.val();
    //  update preview
    $(this__type + "_preview").attr("data-size", this__size);
}
//  Update Style
function updateStyle(el) {
    //  config
    var this__type = el.attr("data-parent");
    var this__style = el.attr("id");
    var this__style = this__style.replace(this__type + "_", '');
    var this__type = "#" + this__type;
    //  if checked, update preview and workbench
    if (el.prop("checked")) {
        $(this__type + "_preview").addClass("is-" + this__style);
        $(".sortable-workbench " + this__type + " .sortable-text-label").addClass("is-" + this__style);
    } else {
        $(this__type + "_preview").removeClass("is-" + this__style);
        $(".sortable-workbench " + this__type + " .sortable-text-label").removeClass("is-" + this__style);
    };
}
//  Gets config data for this element
function getType(el) {
    var this__attr = "_" + $(el).attr("data-change");
    var this__type = $(el).attr("id");
    var this__type = "#" + this__type.replace(this__attr,'');
    return this__type;
}
//  Update Preview
function UpdatePreview() {
    //  config
    var preview    = $("#pricing__template__creation__step3__preview");
    var workbench  = $("#pricing__template__creation__step3__workbench");
    //  update preview html
    preview.html(workbench.html());
}



(function () {
    'use strict';

    var byId = function (id) { return document.getElementById(id); },

        loadScripts = function (desc, callback) {
        var deps = [], key, idx = 0;

        for (key in desc) {
            deps.push(key);
        }

        (function _next() {
            var pid,
            name = deps[idx],
                script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = desc[deps[idx]];

            pid = setInterval(function () {
                if (window[name]) {
                    clearTimeout(pid);

                    deps[idx++] = window[name];

                    if (deps[idx]) {
                        _next();
                    } else {
                        callback.apply(null, deps);
                    }
                }
            }, 30);

            document.getElementsByTagName('head')[0].appendChild(script);

        })()
    },

    console = window.console;


    if (!console.log) {
        console.log = function () {
            alert([].join.apply(arguments, ' '));
        };
    }

    //  Global Animation Speed
    var animation__speed = 300;

    //  Sortable(s) for Step2 of Pricing Template Creation
    Sortable.create(byId('pricing__template__creation__step2__toolbox'), {
        group: {
            name: "pricing__template__creation__step2",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('pricing__template__creation__step2__workbench'), {
        group: {
            name: "pricing__template__creation__step2",
            pull: false,
            put: true
        },
        animation: animation__speed,
    });

    //  Sortable(s) for Step3 of Pricing Template Creation
    Sortable.create(byId('pricing__template__creation__step3__toolbox'), {
        group: {
            name: "pricing__template__creation__step3",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('pricing__template__creation__step3__workbench'), {
        group: {
            name: "pricing__template__creation__step3",
            pull: false,
            put: true
        },
        animation: animation__speed,
        // On added item, launch modal
        onAdd: function (e) {
            var itemEl = e.item;
            var itemID = itemEl.getAttribute("id");
            var itemModal = "#" + itemID + "_modal";
            $(itemModal).modal('show');
            UpdatePreview();
        },
        onUpdate: function (e) {
            UpdatePreview();
        },
    });
})();



