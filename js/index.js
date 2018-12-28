$(document).ready(function () {
    loopDoc();
    $(selector).click(function (e) {
        e.preventDefault();
    });
    $('#container input[type="text"]').focus();

    $('#container input[type="text"]').focus(function (e) {
        e.preventDefault();
        // alert('I am focus');
        console.log('I am focus');
        console.log($(this)[0].nodeType === Node.ELEMENT_NODE);
    });
    $('a').click(function (e) {
        e.preventDefault();
        return true;
    });
});

function loopDoc() {
    for (var i = 0; i < document.childNodes.length; i++) {
        var node = document.childNodes[i];
        console.log(node.nodeType);
    }
}