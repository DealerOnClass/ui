//
//
//  Remove items in workbench on clicking "x"
$(document).on("click", ".sortable-remove", function() {
    $(this).parent('.sortable').remove();
});
//  Remove all items in workbench on clicking "clear all"
function ClearPreviewAndWorkbench() {
    $('#query__creation__workbench').empty();
    $('#query__creation__preview').empty();
};
//  Remove all preview items in query creation modal
$("#query_modal .sortable-finished").on("click", function () {
    $("#query__creation__preview").empty();
    $(this).removeClass("sortable-is-enabled");
});
//
$(".sortable-finished").on("click", function() {
    $("[data-type='parameter']").removeClass("sortable-is-enabled");
    $("[data-type='operator']").removeClass("sortable-is-enabled");
    $("[data-type='value']").removeClass("sortable-is-enabled");
    $("[data-type='joiner']").removeClass("sortable-is-enabled");
});
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
//  1.) Launch Contextual Modal
function OpenModal(elem) {

    //  config
    var this__type  = elem.getAttribute("data-type");
    var this__tab__link = "a[href='#" + this__type + "_tab']";
    var query__modal = "#query_modal";

    if (this__type != "b_joiner") {
        $(query__modal).modal('show');
        $(this__tab__link).click();
    }

    if (this__type == "group") {
        $(query__modal + " .nav-tabs a[href='#parameter_tab']").click();
    }
}
//
//
//  2.) Cycle through Query Builder based on current data-type
$("#query_modal attr[data-type]").on("click", function () {

    //  config
    var this__elem = $(this);
    var this__type = this__elem.attr("data-type");
    var this__accepts = this__elem.attr("data-accepts");
    var query__modal = "#query_modal";
    var query__workbench = "#query__creation__workbench";
    var query__preview = "#query__creation__preview";

    //  reset
    $(query__workbench + " .sortable-base").remove();

    //  open appropriate tabs
    if (this__type == "parameter") {
        $(query__modal + " .nav-tabs a[href='#operator_tab']").click();

        //  Highlight next match
        accepts = this__accepts.split(',');
        $.each( accepts, function(index, value) {
            $(query__modal + " #operator_tab [data-id='" + value + "']").addClass("sortable-is-enabled");
        });

        //  Update Preview
        if ( $("#query__creation__preview [data-type='parameter']").length != 0 ) {
            $("#query__creation__preview [data-type='parameter']").replaceWith(this__elem);
        } else {
            this__elem.clone().appendTo(query__preview);
        }
    }
    if (this__type == "operator") {
        $(query__modal + " .nav-tabs a[href='#value_tab']").click();
        $(query__modal + " [data-type='operator']").removeClass("sortable-is-enabled");
        $(query__workbench + " [data-type='operator']").removeClass("sortable-is-enabled");
        $(query__modal + " [data-type='value']").addClass("sortable-is-enabled");

        //  Update Preview
        if ( $("#query__creation__preview [data-type='operator']").length != 0 ) {
            $("#query__creation__preview [data-type='operator']").replaceWith(this__elem);
        } else {
            this__elem.clone().appendTo(query__preview);
        }
    }
    if (this__type == "value") {
        $(query__modal + " .nav-tabs a[href='#joiner_tab']").click();
        $(query__modal + " [data-type='value']").removeClass("sortable-is-enabled");
        $(query__workbench + " [data-type='value']").removeClass("sortable-is-enabled");
        $(query__modal + " .sortable-finished").addClass("sortable-is-enabled");

        //  Update Preview
        if ( $("#query__creation__preview [data-type='value']").length != 0 ) {
            $("#query__creation__preview [data-type='value']").replaceWith(this__elem);
        } else {
            this__elem.clone().appendTo(query__preview);
        }
    }
});
//  3.) Populate workbench with preview items
$("#query_modal").on('hide.bs.modal', function () {
    UpdateWorkbench("#query__creation__preview", "#query__creation__workbench");

    //  Remove enabled states
    $("[data-type='parameter']").removeClass("sortable-is-enabled");
    $("[data-type='operator']").removeClass("sortable-is-enabled");
    $("[data-type='value']").removeClass("sortable-is-enabled");
    $("[data-type='joiner']").removeClass("sortable-is-enabled");
});
function UpdateWorkbench(origin, destination) {
    //  create group
    $(origin).children().wrapAll("<div class='btn btn-default sortable clearfix' data-type='nested'></div>");
    //  update workbench
    $(origin).children().appendTo(destination);
}
//
//
//  DISCLAIMER: SEVER REFACTOR NEEDED
//
//
//  4.) Make Group
$(".sortable-groupem").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    if ( $("#query__creation__workbench .sortable-lock").length != 0 ) {
        $("#query__creation__workbench .sortable-lock").remove();
    } else {
        $("#query__creation__workbench").children().prepend("<a onclick='PrepareToLockTag(this);' class='btn btn-default sortable-lock top'><i class='fa fa-circle-o'></i></a>");
    }
});
function PrepareToLockTag(elem) {
    var icon = $(elem).children(".fa");
    if ( icon.hasClass("fa-circle-o") ) {
        icon.removeClass("fa-circle-o").addClass("fa-circle");
    } else {
        icon.removeClass("fa-circle").addClass("fa-circle-o");
    }

    CountLocked();
};
function CountLocked() {
    var locked = $("#query__creation__workbench .fa-circle").length;
    $(".sortable-lockem .count").text(locked);
    if ( locked >= 2 ) {
        ShowLocker();   // stupid i know whatever
        CancelLocker();
    } else {
        ShowGrouper();
    }
};
function ShowLocker() {     //  ShowAction(actionType)
    if ( $(".sortable-lockem").length == 0 ) {
        $(".sortable-groupem").addClass("hidden").after("<a onclick='LockTags()' class='btn btn-default sortable-lockem'><i class='fa fa-lock'></i> Lock <span class='count'>2</span></a>");
    }
};
function CancelLocker() {   //  ShowCancelAction(actionType)
    if ( $(".sortable-cancellockem").length == 0 ) {
        $(".sortable-groupem").addClass("hidden");
        $(".sortable-remove-all").after("<a onclick='CancelLockTags()' class='btn btn-default sortable-cancellockem'>Cancel</a>").remove();
    }
};
function LockTags() {       //  DoAction(actionType)
    $(".sortable-groupem").removeClass("active");
    $("#query__creation__workbench .fa-circle").parent().parent().wrapAll("<div class='btn btn-default sortable clearfix' data-type='nested'></div>");
    $(".sortable-cancellockem").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    ShowGrouper();
};
function CancelLockTags() { //  CancelDoAction(actionType)
    $(".sortable-groupem").removeClass("active");
    $(".sortable-cancellockem").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    ShowGrouper();
};
function ShowGrouper() {
    $(".sortable-lockem").remove();
    $(".sortable-groupem").removeClass("hidden");
};
//  5.) Un Group
$(".sortable-ungroupem").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    if ( $("#query__creation__workbench .sortable-lock").length != 0 ) {
        $("#query__creation__workbench .sortable-lock").remove();
    } else {
        $("#query__creation__workbench > [data-type='nested']").prepend("<a onclick='PrepareToUnLockTag(this);' class='btn btn-default sortable-lock top'><i class='fa fa-circle-o'></i></a>");
    }
});
function PrepareToUnLockTag(elem) {
    var icon = $(elem).children(".fa");
    if ( icon.hasClass("fa-circle-o") ) {
        icon.removeClass("fa-circle-o").addClass("fa-circle");
    } else {
        icon.removeClass("fa-circle").addClass("fa-circle-o");
    }

    CountUnLocked();
};
function CountUnLocked() {
    var unlocked = $("#query__creation__workbench .fa-circle").length;
    $(".sortable-unlockem .count").text(unlocked);
    if ( unlocked >= 1 ) {
        ShowUnLocker();   // stupid i know whatever
        CancelUnLocker();
    } else {
        ShowUnGrouper();
    }
};
function ShowUnLocker() {
    if ( $(".sortable-unlockem").length == 0 ) {
        $(".sortable-ungroupem").addClass("hidden").after("<a onclick='UnLockTags()' class='btn btn-default sortable-unlockem'><i class='fa fa-unlock'></i> UnLock <span class='count'>1</span></a>");
    }
};
function CancelUnLocker() {
    if ( $(".sortable-cancelunlockem").length == 0 ) {
        $(".sortable-ungroupem").addClass("hidden");
        $(".sortable-remove-all").after("<a onclick='CancelUnLockTags()' class='btn btn-default sortable-cancelunlockem'>Cancel</a>").remove();
    }
};
function UnLockTags() {
    $(".sortable-ungroupem").removeClass("active");
    $("#query__creation__workbench .fa-circle").parent().unwrap();
    $(".sortable-cancelunlockem").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    ShowUnGrouper();
};
function CancelUnLockTags() {
    $(".sortable-ungroupem").removeClass("active");
    $(".sortable-cancelunlockem").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    ShowUnGrouper();
};
function ShowUnGrouper() {
    $(".sortable-unlockem").remove();
    $(".sortable-ungroupem").removeClass("hidden");
};
//  6.) Delete Groups
$(".sortable-removegroup").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    if ( $("#query__creation__workbench .sortable-lock").length != 0 ) {
        $("#query__creation__workbench .sortable-lock").remove();
    } else {
        //  selected had ">"
        $("#query__creation__workbench [data-type='nested']").prepend("<a onclick='PrepareToDeleteGroup(this);' class='btn btn-default sortable-lock top'><i class='fa fa-circle-o'></i></a>");
        $("#query__creation__workbench [data-type='b_joiner']").prepend("<a onclick='PrepareToDeleteGroup(this);' class='btn btn-default sortable-lock top'><i class='fa fa-circle-o'></i></a>");
    }
});
function PrepareToDeleteGroup(elem) {
    var icon = $(elem).children(".fa");
    if ( icon.hasClass("fa-circle-o") ) {
        icon.removeClass("fa-circle-o").addClass("fa-circle");
    } else {
        icon.removeClass("fa-circle").addClass("fa-circle-o");
    }

    CountCanDeleteGroup();
};
function CountCanDeleteGroup() {
    var deletableGroups = $("#query__creation__workbench .fa-circle").length;
    $(".sortable-groupdeleter .count").text(deletableGroups);
    if ( deletableGroups >= 1 ) {
        ShowDeleter();   // stupid i know whatever
        CancelDeleter();
    } else {
        HideDeleter();
    }
};
function ShowDeleter() {
    if ( $(".sortable-groupdeleter").length == 0 ) {
        $(".sortable-removegroup").addClass("hidden").after("<a onclick='DeleteGroup()' class='btn btn-default sortable-groupdeleter'><i class='fa fa-times'></i> Remove <span class='count'>1</span></a>");
    }
};
function CancelDeleter() {
    if ( $(".sortable-cancelgroupdeleter").length == 0 ) {
        $(".sortable-removegroup").addClass("hidden");
        $(".sortable-remove-all").after("<a onclick='CancelDeleteGroup()' class='btn btn-default sortable-cancelgroupdeleter'>Cancel</a>").remove();
    }
};
function DeleteGroup() {
    $(".sortable-removegroup").removeClass("active");
    $("#query__creation__workbench .fa-circle").parent().parent().remove();
    $(".sortable-cancelgroupdeleter").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    HideDeleter();
};
function CancelDeleteGroup() {
    $(".sortable-removegroup").removeClass("active");
    $(".sortable-cancelgroupdeleter").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    HideDeleter();
};
function HideDeleter() {
    $(".sortable-groupdeleter").remove();
    $(".sortable-removegroup").removeClass("hidden");
};
//  7.) Edit Group
$(".sortable-editgroup").on("click", function () {
    $(this).toggleClass("active").siblings().removeClass("active");
    if ( $("#query__creation__workbench .sortable-lock").length != 0 ) {
        $("#query__creation__workbench .sortable-lock").remove();
    } else {
        $("#query__creation__workbench [data-type='nested']").prepend("<a onclick='PrepareToEditGroup(this);' class='btn btn-default sortable-lock top'><i class='fa fa-circle-o'></i></a>");
    }
});
function PrepareToEditGroup(elem) {
    var icon = $(elem).children(".fa");
    if ( icon.hasClass("fa-circle-o") ) {
        icon.removeClass("fa-circle-o").addClass("fa-circle");
    } else {
        icon.removeClass("fa-circle").addClass("fa-circle-o");
    }

    CountCanEditGroup();
};
function CountCanEditGroup() {
    var deletableGroups = $("#query__creation__workbench .fa-circle").length;
    $(".sortable-groupdeleter .count").text(deletableGroups);
    if ( deletableGroups >= 1 ) {
        ShowEditor();   // stupid i know whatever
        CancelShowEditor();
    } else {
        HideEditor();
    }
};
function ShowEditor() {
    if ( $(".sortable-groupeditor").length == 0 ) {
        $(".sortable-editgroup").addClass("hidden").after("<a onclick='EditGroup()' class='btn btn-default sortable-groupeditor'><i class='fa fa-pencil'></i> Edit <span class='count'>1</span></a>");
    }
};
function CancelShowEditor() {
    if ( $(".sortable-cancelgroupeditor").length == 0 ) {
        $(".sortable-editgroup").addClass("hidden");
        $(".sortable-remove-all").after("<a onclick='CancelEditor()' class='btn btn-default sortable-cancelgroupeditor'>Cancel</a>").remove();
    }
};
function EditGroup() {
    $(".sortable-editgroup").removeClass("active");

    var editableGroup = $("#query__creation__workbench .fa-circle").parent().parent().html();
    $("#query__creation__preview").append(editableGroup);
    $("#query__creation__preview .sortable-lock").remove();

    $("#query__creation__workbench .fa-circle").parent().parent().remove();

    $("#query_modal").modal('show');
    $("#query_modal .nav-tabs a[href='#parameter_tab']").click();

    $(".sortable-cancelgroupeditor").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    HideEditor();
};
function CancelEditor() {
    $(".sortable-editgroup").removeClass("active");
    $(".sortable-cancelgroupeditor").after("<a class='btn btn-default sortable-remove-all' onclick='ClearPreviewAndWorkbench()'>Clear</a>").remove();
    $("#query__creation__workbench .sortable-lock").remove();
    HideEditor();
};
function HideEditor() {
    $(".sortable-groupeditor").remove();
    $(".sortable-editgroup").removeClass("hidden");
};
//  //
//  //
//  //  Cancel Button Functionality
//  function ShowCancel() {
//      $(".sortable-remove-all").addClass("hidden");
//      $(".sortable-remove-all").after("<a onclick='CancelAction()' class='btn btn-default sortable-cancel-all'>Cancel</a>");
//  }
//  function HideCancel() {
//      $(".sortable-remove-all").removeClass("hidden");
//  }
//
//
//  Sortable Setup
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

    //  Sortable(s) for Step3 of Pricing Template Creation
    Sortable.create(byId('query__creation__toolbox'), {
        group: {
            name: "query__creation__step3",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('query__creation__workbench'), {
        group: {
            name: "query__creation__step3",
            pull: false,
            put: true
        },
        animation: animation__speed,
        // On added item, launch modal
        onAdd: function (e) {
            var itemEl = e.item;
            OpenModal(itemEl);
        },
    });
    Sortable.create(byId('query__nested__demo'), {
        group: {
            name: "query__creation__step3",
            pull: false,
            put: false
        },
        sort: true,
        animation: animation__speed,
    });
})();



