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
    //console.log($(this).parent().parent().next(".sortable-workbench").attr("id"));
    $(this).parent().parent().next(".sortable-workbench").empty();
    //  Replace with function
    $(".btn[data-type='operator']").removeClass("sortable-is-enabled");
    $(".btn[data-type='parameter']").removeClass("sortable-is-enabled");
    $(".btn[data-type='value']").removeClass("sortable-is-enabled");
    $(".btn[data-type='s_joiner']").removeClass("sortable-is-enabled");
    $(".btn[data-type='b_joiner']").removeClass("sortable-is-enabled");
    $(".btn[data-type='combined']").removeClass("sortable-is-enabled");
});
//
//
//
//
//  Check possible tags
function CheckPossibleTags(el) {
    //  Config
    var toggleClass = "sortable-is-enabled";
    var toolboxClass = ".sortable-toolbox";

    //  Reset Tag ** refactor... i kno
    $(".sortable-finished").on("click", function() {
        //  Replace with function
        $(".btn[data-type='operator']").removeClass(toggleClass);
        $(".btn[data-type='parameter']").removeClass(toggleClass);
        $(".btn[data-type='value']").removeClass(toggleClass);
        $(".btn[data-type='s_joiner']").removeClass(toggleClass);
        $(".btn[data-type='b_joiner']").removeClass(toggleClass);
        $(".btn[data-type='combined']").removeClass(toggleClass);
    });

    //  Replace with function
    $(".btn[data-type='operator']").removeClass(toggleClass);
    $(".btn[data-type='parameter']").removeClass(toggleClass);
    $(".btn[data-type='value']").removeClass(toggleClass);
    $(".btn[data-type='s_joiner']").removeClass(toggleClass);
    $(".btn[data-type='b_joiner']").removeClass(toggleClass);
    $(".btn[data-type='combined']").removeClass(toggleClass);

    //  Get this data-type
    var this__type = $(el).data("type");

    //  Display next possible element for this data-type
    if (this__type == "parameter") {
        var this__accepts = $(el).data("accepts");
        $.each( this__accepts, function(i, val) {
            $(toolboxClass + " .btn[data-type='operator'][data-id='" + val + "']").addClass(toggleClass);
        });
    }

    if (this__type == "s_joiner" || this__type == "b_joiner") {
        $(toolboxClass + " .btn[data-type='parameter']").addClass(toggleClass);
    }

    if (this__type == "operator") {
        $(toolboxClass + " .btn[data-type='value']").addClass(toggleClass);
    }

    if (this__type == "value") {
        $(toolboxClass + " .btn[data-type='s_joiner']").addClass(toggleClass);
    }
}
//
//
//
//
//  Combine Tags    ** used when group-workbench existed
//  function CombineTags(el) {
//      var this__elem       = $(el);
//      var this__elem__data = $(el).attr('data-type');
//      var this__elem__text = $(el).children('.sortable-text').text();
//      var prev__elem       = $(el).prev();
//      var prev__elem__icon = $(el).children('.sortable-action-item');
//
//      //  Debug
//      //  console.log("You just dropped in " + this__elem__text + " which is a " + this__elem__data);
//      //
//      //  Wrap this data type
//      this__elem.children('.sortable-text').wrapInner("<span class='" + this__elem__data + "'>");
//      //  Append data type
//      prev__elem.children('.sortable-text').append(" <span class='" + this__elem__data + "'>" + this__elem__text + "</span>");
//      //  Create new data type
//      prev__elem.attr('data-type', 'combined');
//      prev__elem__icon.before('<a class="sortable-action-item sortable-edit"><i class="fa fa-pencil fa-sm"></i></a>');
//      //  If only one exists don't remove it
//      if ( this__elem.siblings().length != 0 ) {
//          this__elem.remove();
//      }
//  }
//
//
//
//
//  Make Lockable tags
function AddLockable(el) {
    var this__elem       = $(el);
    var this__siblings   = this__elem.siblings().length;
    var this__elem__lock = $(el).find(".sortable-lock");
    var prev__elem       = this__elem.prevUntil("[data-type='combined']");
    var next__elem       = this__elem.next();

    if ( this__siblings != 0 ) {
        if ( this__elem.attr("data-type") != "b_joiner" && this__elem.prev().attr("data-type") != "combined" ) {
            if (this__elem__lock != null ) {
                this__elem.append("<a onclick='LockTags(this)' class='sortable-lock btn btn-default'><i class='fa fa-unlock-alt'></i></a>");
            }
            prev__elem.children(".sortable-lock").remove();
        }
    }
}
//  Lock Tags
function LockTags(el) {
    var this__elem          = $(el);
    var this__elem__text    = $(el).parent().find(".sortable-text").text();
    var prev__elems         = $(el).parent().prevUntil("[data-type='b_joiner']");
    //var prev__elems         = $(el).parent().prevUntil("[data-type='combined']");

    //  Modify text
    prev__elems.each( function (index, element) {
        $(this).parent().find(".sortable-text").prepend(" ");
    });
    var prev__elems__text = prev__elems.find(".sortable-text").text();

    //  Create New Elem
    prev__elems.last().attr("data-type","combined");
    prev__elems.last().find(".sortable-text").text(prev__elems__text + " " + this__elem__text);
    prev__elems.last().nextAll().remove();

    $(".sortable-toolbox .btn[data-type='b_joiner']").addClass("sortable-is-enabled");

    //  Add Unlock
    prev__elems.last().append("<a onclick='UnLockTags(this)' class='sortable-lock btn btn-default'><i class='fa fa-lock'></i></a>");

    //  Replace with function
    $(".btn[data-type='operator']").removeClass("sortable-is-enabled");
    $(".btn[data-type='parameter']").removeClass("sortable-is-enabled");
    $(".btn[data-type='value']").removeClass("sortable-is-enabled");
    $(".btn[data-type='s_joiner']").removeClass("sortable-is-enabled");
};
//  UnLock Tags
function UnLockTags(el) {
    var this__elem = $(el);
    console.log("Unlock " + this__elem);
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

    //  Sortable(s) for DealerOn Query Language
    Sortable.create(byId('querylang__toolbox-operator'), {
        group: {
            name: "querylang",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('querylang__toolbox-parameter'), {
        group: {
            name: "querylang",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('querylang__query-workbench'), {
        group: {
            name: "querylang",
            pull: true,
            put: true
        },
        animation: animation__speed,
        // On added item, launch modal
        onAdd: function (e) {
            var itemEl = e.item;
            CheckPossibleTags(itemEl);
            AddLockable(itemEl);
        },
    });
    //
    //
    //
    //
    //    ** used when group-workbench existed
    //  Sortable.create(byId('querylang__group-workbench'), {
    //      group: {
    //          name: "querylang",
    //          pull: true,
    //          put: true
    //      },
    //      animation: animation__speed,
    //      // On added item, launch modal
    //      onAdd: function (e) {
    //          var itemEl = e.item;
    //          CheckPossibleTags(itemEl);
    //          CombineTags(itemEl);
    //      },
    //  });
})();
