define([
    "jquery",
    "text!./template/fEditor.html"
], function ($, template) {
    return {
        element: null,

        options: {
            name: "Fox Editor",
            width: "600px",
            height: "450px"
        },

        create: function (target, options) {
            var ctx = this, element = ctx.element;
            element = $(template).replaceAll(target);
            element.css("width", ctx.options.width);
            var h1 = element.find("div.control-panel").height(), h2 = element.find("div.panel").height();
            element.find("div.editor-view").css("height", (parseInt(ctx.options.height) - h1 - h2) + "px");
            var frame = $("iframe.editor-view").attr("src", "/js/app/Widgets/Editor/template/Frame.html");
            console.dir(frame);
            $("iframe.editor-view").contents().find("body").keyup(function () {
                var doc = $("iframe.editor-view")[0].contentWindow.document;
                console.log(1);
                var b = $("iframe.editor-view").contents().find("body")[0];
                if (b.childNodes.length == 1 && b.firstChild.localName == "br") {
                    b.innerHTML = "<p></p>";
                    var root = $(b).find("p")[0];
                    var rng = doc.createRange();
                    rng.selectNodeContents(root);
//                console.dir(rng);
                    var sel = frame[0].contentWindow.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(rng);
                }
            })
        }
    };
});