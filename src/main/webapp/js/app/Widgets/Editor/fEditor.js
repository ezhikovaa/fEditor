define([
    "jquery",
    "./config",
    "./editor/util",
    "text!./template/fEditor.html"
], function ($, config, util, template) {

    function insertP(window) {
        var doc = window.document, b = $(doc).find("body")[0];
        b.innerHTML = "<p></p>";
        var root = $(b).find("p")[0],
            rng = doc.createRange(),
            sel = window.getSelection();
        rng.selectNodeContents(root);
        sel.removeAllRanges();
        sel.addRange(rng);
    }

    return {
        element: null,

        options: {
            name: "Fox Editor",
            width: "600px",
            height: "350px"
        },

        config: function (prop) {
            var h = prop.baseURL.charAt(prop.baseURL.length - 1) === "/" ? "" : "/";
            config.baseURL = prop.baseURL + h;
        },

        create: function (target, options) {
            util.convertImgToBase64('js/app/Widgets/Editor/img/minimize.png', function (base64Img) {
                console.log(base64Img);
            }, "image/png");

            var ctx = this, element = ctx.element;
            $("<link href=\"" + config.baseURL + "Editor/css/icons.css\" rel=\"stylesheet\">").appendTo($("head"));
            $("<link href=\"" + config.baseURL + "Editor/css/" + options.style
                + ".css\" rel=\"stylesheet\">").appendTo($("head"));
            element = $(template).replaceAll(target);
            element.css("width", ctx.options.width);
            var h1 = element.find("div.control-panel").height(), h2 = element.find("div.panel").height();
            element.find("div.editor-view").css("height", (parseInt(ctx.options.height) - h1 - h2) + "px");
            var frame = $("iframe.editor-view", element);//.attr("src", config.baseURL + "Editor/template/Frame.html");
            frame.load(function () {
                var body = $(frame.contents()).find("body"), window = frame[0].contentWindow;
                body.attr("contenteditable", "true");
                insertP(window);
                body.find("p").append("<br>");
                body.bind("keydown", function (e) {
                    if (e.keyCode == 9) {
                        e.preventDefault();
                    }
                });
                body.bind("keyup", function (e) {
//                    console.dir(e);
                    if (body[0].childNodes.length == 1 &&
                        (!body[0].firstChild.localName || body[0].firstChild.localName == "br")) {
                        insertP(window);
                    }
                });
            });

        }
    };
});