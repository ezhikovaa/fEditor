define([
    "jquery",
    "text!./template/fEditor.html"
], function($, template) {

    function getElementStyle(a) {
        var sheets = $("iframe.editor-view")[0].contentWindow.document.styleSheets, o = {};
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.is(rules[r].selectorText)) {
                    o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
                }
            }
        }
        return o;
    }

    function css2json(css) {
        var s = {};
        if (!css) return s;
        if (css instanceof CSSStyleDeclaration) {
            console.dir(css);
            for (var i in css) {
                if ((css[i]).toLowerCase) {
                    s[(css[i]).toLowerCase()] = (css[css[i]]);
                }
            }
        } else if (typeof css == "string") {
            css = css.split("; ");
            for (var i in css) {
                var l = css[i].split(": ");
                s[l[0].toLowerCase()] = (l[1]);
            }
        }
        return s;
    }

    return {
        element: null,

        options: {
            name: "Fox Editor",
            width: "600px",
            height: "450px"
        },

        create: function(target, options) {
            var ctx = this, element = ctx.element;
            element = $(template).replaceAll(target);
            element.css("width", ctx.options.width);
            var h1 = element.find("div.control-panel").height(), h2 = element.find("div.panel").height();
            element.find("div.editor-view").css("height", (parseInt(ctx.options.height) - h1 - h2) + "px");
            var frame = $("iframe.editor-view").attr("src", "/js/app/Widgets/Editor/template/Frame.html");
            $(frame).load(function() {
                $(frame.contents()).find("body").keyup(function() {
                    var doc = frame[0].contentWindow.document;
                    var b = frame.contents().find("body")[0];
                    console.log(b.innerHTML);
                    if (b.childNodes.length == 1 && (!b.firstChild.localName || b.firstChild.localName == "br")) {
                        b.innerHTML = "<p></p>";
                        var root = $(b).find("p")[0];
                        var rng = doc.createRange();
                        rng.selectNodeContents(root);
                        var sel = frame[0].contentWindow.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(rng);
                    }
                });
                $(frame.contents()).find("body").click(function() {
                    console.dir(getElementStyle($(frame.contents()).find("p")));
                });
            });

        }
    };
});