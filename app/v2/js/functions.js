//  Theme Generation
function PopulateThemes() {
    var object = document.querySelector("#js-object-id");
    if ( object != null ) {
        var objectID = object.getAttribute("data-object-id");
    };
    var themes = document.querySelectorAll("#js-object-root [data-object-change]");

    /*
     *  For each theme section, wherever you find the "object-id", replace
     *  it with the current theme color. eg. "alert" becomes "alert alert-color".
     */
    forEach(themes, function (index, theme) {
        var base      = theme.querySelector("." + objectID);
        var highlight = theme.querySelector(".highlight");
        var textarea  = theme.querySelector(".object-copy__textarea");
        var color     = theme.getAttribute("data-object-change");

        var baseOldCode = base.outerHTML;
        var baseNewCode = baseOldCode.replace('class="' + objectID, 'class="' + objectID + ' ' + objectID + '-' + color);
        base.outerHTML = baseNewCode;

        var objectOldCode = highlight.innerHTML;
        var objectNewCode = objectOldCode.replace('class="' + objectID, 'class="' + objectID + ' ' + objectID + '-' + color);
        highlight.innerHTML = objectNewCode;

        var textareaOldCode = base.outerHTML;
        var textareaNewCode = textareaOldCode.replace('class="' + objectID, 'class="' + objectID + ' ' + objectID + '-' + color);
        textarea.innerHTML = textareaNewCode;
    });
}

//  Utilities
function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

//  Clipboard.Js
var copyBtns = document.querySelectorAll('.object-copy__btn');
if ( copyBtns != null ) {
    var clipboard = new Clipboard('.object-copy__btn');
};
clipboard.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});

for (var i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.classList.remove('copied');
    });
}

function showTooltip(elem) {
    elem.classList.add('copied');
}
