//
//
//  0.) General Utilities
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
//  Remove enabled states on clicking "I'm Done" in modal or elsewhere
$(".sortable-finished").on("click", function() {
    $("[data-type='parameter']").removeClass("sortable-is-enabled");
    $("[data-type='operator']").removeClass("sortable-is-enabled");
    $("[data-type='value']").removeClass("sortable-is-enabled");
    $("[data-type='joiner']").removeClass("sortable-is-enabled");
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
//
//
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
    $(origin).children().wrapAll("<div class='btn btn-default sortable clearfix' data-type='nested'></div>");
    $(origin).children().appendTo(destination);
}
//
//
//
$("#remove_modal").on('hide.bs.modal', function () {
    $("#query__remove__preview").empty();
});
//
//
//  4.) Do Stuff For Action type
$("[data-action]").on("click", function() {
    //  Config
    var action = $(this).attr("data-action");
    var prepareActionButton = "<button onclick='PrepareAction(this,&quot;" + action + "&quot;);' class='btn btn-default sortable-lock top'><i class='fa fa-square'></i></button>";

    //  Toggle active class
    $(this).toggleClass("active");

    //  Toggle disabled state
    if ( $(this).siblings().attr("disabled") ) {
        $(this).siblings().removeAttr("disabled");
    } else {
        $(this).siblings().attr("disabled", "disabled");
    }

    //  If locks not null create locks based on action type
    if ( $("#query__creation__workbench .sortable-lock").length != 0 ) {
        $("#query__creation__workbench .sortable-lock").remove();
    } else {
        if ( action == "removegroup" ) {
            $("#query__creation__workbench [data-type='nested']").prepend(prepareActionButton);
            $("#query__creation__workbench [data-type='b_joiner']").prepend(prepareActionButton);
        } else if ( action == "editgroup" ) {
            $("#query__creation__workbench [data-type='nested']").prepend(prepareActionButton);
        } else {
            $("#query__creation__workbench").children().prepend(prepareActionButton);
        }
    }
});

function PrepareAction(elem, action) {
    var actionIcon = $(elem).children(".fa");

    if ( actionIcon.hasClass("fa-square") ) {
        actionIcon.removeClass("fa-square").addClass("fa-check-square");
    } else {
        actionIcon.removeClass("fa-check-square").addClass("fa-square");
    }

    CountPossibleActions(action);
};

function CountPossibleActions(action) {
    var locked = $("#query__creation__workbench .fa-check-square").length;

    if ( action == "editgroup" ) {
        $(".sortable-groupeditor .count").text(locked);  //  Update Secondary Action Text
    } else if (action == "removegroup" ) {
        $(".sortable-groupdeleter .count").text(locked);  //  Update Secondary Action Text
    } else {
        $(".sortable-" + action + " .count").text(locked);  //  Update Secondary Action Text
    }

    if ( action == "lockgroup" ) {
        if ( locked >= 2 ) {
            ShowAction(action);                             //  Create Secondary Action
            ShowCancelAction(action);                       //  Cancel Secondary Action
        } else {
            RestorePrimaryAction(action);                   //  Restore Primary Action
        }
    } else {
        if ( locked >= 1 ) {
            ShowAction(action);                             //  Create Secondary Action
            ShowCancelAction(action);                       //  Cancel Secondary Action
        } else {
            RestorePrimaryAction(action);                   //  Restore Primary Action
        }
    }
};

function ShowAction(action) {
    if ( action == "lockgroup" ) {
        if ( $(".sortable-lockgroup").length == 0 ) {      // Create Secondary Action Button
            $(".sortable-groupem").addClass("hidden").after("<button onclick='DoAction(this)' class='btn btn-default sortable-lockgroup' data-action='lockgroup'><i class='fa fa-lock'></i> Lock <span class='count'>2</span></button>");
        }
    } else if ( action == "unlockgroup" ) {
        if ( $(".sortable-unlockgroup").length == 0 ) {
            $(".sortable-ungroupem").addClass("hidden").after("<button onclick='DoAction(this)' class='btn btn-default sortable-unlockgroup' data-action='unlockgroup'><i class='fa fa-unlock'></i> UnLock <span class='count'>1</span></button>");
        }
    } else if ( action == "removegroup" ) {
        if ( $(".sortable-groupdeleter").length == 0 ) {
            $(".sortable-removegroup").addClass("hidden").after("<button onclick='DoAction(this)' class='btn btn-default sortable-groupdeleter' data-action='removegroup'><i class='fa fa-times'></i> Remove <span class='count'>1</span></button>");
        }
    } else if ( action == "editgroup" ) {
        if ( $(".sortable-groupeditor").length == 0 ) {
            $(".sortable-editgroup").addClass("hidden").after("<button onclick='DoAction(this)' class='btn btn-default sortable-groupeditor' data-action='editgroup'><i class='fa fa-pencil'></i> Edit <span class='count'>1</span></button>");
        }
    }
};

function ShowCancelAction(action) {
    if ( action == "lockgroup" ) {
        if ( $(".sortable-cancellockgroup").length == 0 ) {
            $(".sortable-groupem").addClass("hidden");
            $(".sortable-remove-all[data-toggle='modal']").after("<button onclick='CancelDoAction(this)' class='btn btn-default sortable-cancellockgroup' data-action='lockgroup'>Cancel</button>").remove();
        }
    } else if ( action == "unlockgroup") {
        if ( $(".sortable-cancelunlockgroup").length == 0 ) {
            $(".sortable-ungroupem").addClass("hidden");
            $(".sortable-remove-all[data-toggle='modal']").after("<button onclick='CancelDoAction(this)' class='btn btn-default sortable-cancelunlockgroup' data-action='unlockgroup'>Cancel</button>").remove();
        }
    } else if ( action == "removegroup" ) {
        if ( $(".sortable-cancelgroupdeleter").length == 0 ) {
            $(".sortable-removegroup").addClass("hidden");
            $(".sortable-remove-all[data-toggle='modal']").after("<button onclick='CancelDoAction(this)' class='btn btn-default sortable-cancelgroupdeleter' data-action='removegroup'>Cancel</button>").remove();
        }
    } else if ( action == "editgroup" ) {
        if ( $(".sortable-cancelgroupeditor").length == 0 ) {
            $(".sortable-editgroup").addClass("hidden");
            $(".sortable-remove-all[data-toggle='modal']").after("<button onclick='CancelDoAction(this)' class='btn btn-default sortable-cancelgroupeditor' data-action='editgroup'>Cancel</button>").remove();
        }
    }
};

function DoAction(elem) {
    var action = $(elem).attr("data-action");
    var actionIcon = ".fa-check-square";

    if ( action == "lockgroup" ) {
        $(".sortable-groupem").removeClass("active");
        //
        $("#query__creation__workbench " + actionIcon).parent().parent().wrapAll("<div class='btn btn-default sortable clearfix' data-type='nested'></div>");
        //
        $(".sortable-cancellockgroup").siblings().removeAttr("disabled");
        $(".sortable-cancellockgroup").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "unlockgroup" ) {
        $(".sortable-ungroupem").removeClass("active");
        //
        $("#query__creation__workbench " + actionIcon).parent().unwrap();
        //
        $(".sortable-cancelunlockgroup").siblings().removeAttr("disabled");
        $(".sortable-cancelunlockgroup").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "removegroup" ) {
        $(".sortable-removegroup").removeClass("active");
        //
        $("#query__creation__workbench " + actionIcon).parent().parent().attr("data-remove","true");
        $("#query__creation__workbench [data-remove='true']").clone().appendTo("#query__remove__preview");
        //
        $("#query__remove__preview .sortable-lock").remove();
        $("#remove_modal").modal('show');
        //
        $(".sortable-cancelgroupdeleter").siblings().removeAttr("disabled");
        $(".sortable-cancelgroupdeleter").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "editgroup" ) {
        $(".sortable-editgroup").removeClass("active");
        //
        $("#query__creation__workbench " + actionIcon).parent().parent().attr("data-edit","true");
        $("#query__creation__workbench [data-edit='true']").clone().children().appendTo("#query__creation__preview");
        //
        $("#query__creation__preview .sortable-lock").remove();
        $("#query__creation__workbench [data-edit='true']").remove();
        //
        $("#query_modal").modal('show');
        $("#query_modal .nav-tabs a[href='#parameter_tab']").click();
        //
        $(".sortable-cancelgroupeditor").siblings().removeAttr("disabled");
        $(".sortable-cancelgroupeditor").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    }

    $("#query__creation__workbench .sortable-lock").remove();
    RestorePrimaryAction(action);
};

function CancelDoAction(elem) {
    var action = $(elem).attr("data-action");

    if ( action == "lockgroup" ) {
        $(".sortable-groupem").removeClass("active");
        $(".sortable-cancellockgroup").siblings().removeAttr("disabled");
        $(".sortable-cancellockgroup").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "unlockgroup" ) {
        $(".sortable-ungroupem").removeClass("active");
        $(".sortable-cancelunlockgroup").siblings().removeAttr("disabled");
        $(".sortable-cancelunlockgroup").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "removegroup" ) {
        $(".sortable-removegroup").removeClass("active");
        $(".sortable-removegroup").siblings().removeAttr("disabled");
        $(".sortable-cancelgroupdeleter").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    } else if ( action == "editgroup" ) {
        $(".sortable-editgroup").removeClass("active");
        $(".sortable-editgroup").siblings().removeAttr("disabled");
        $(".sortable-cancelgroupeditor").after("<a href='#cancel_modal' class='btn btn-default sortable-remove-all' data-toggle='modal'>Clear</a>").remove();
    }

    $("#query__creation__workbench .sortable-lock").remove();
    RestorePrimaryAction(action);
};

function RestorePrimaryAction(action) {
    if ( action == "lockgroup" ) {
        $(".sortable-lockgroup").remove();
        $(".sortable-groupem").removeClass("hidden");
    } else if ( action == "unlockgroup" ) {
        $(".sortable-unlockgroup").remove();
        $(".sortable-ungroupem").removeClass("hidden");
    } else if ( action == "removegroup" ) {
        $(".sortable-groupdeleter").remove();
        $(".sortable-removegroup").removeClass("hidden");
    } else if ( action == "editgroup" ) {
        $(".sortable-groupeditor").remove();
        $(".sortable-editgroup").removeClass("hidden");
    }
};
//
//
//
function QueryRemove() {
    $("[data-remove='true']").remove();
}
//
//
//
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
})();



