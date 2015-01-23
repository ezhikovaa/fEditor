define([
    "./config",
    "./editor/util",
    "./toolbar/sourceBar",
    "./toolbar/minMaxBar",
    "text!./template/fEditor.html"
], function(config, util, sourceBar, minMaxBar, template) {

    function insertP(window, text) {
        var doc = window.document, b = $(doc).find("body")[0], pos = text ? 1 : 0, t = text ? text : "";
        b.innerHTML = "<p>" + t + "</p>";
        var root = $(b).find("p")[0],
            rng = doc.createRange(),
            sel = window.getSelection();
        rng.setStart(root, pos);
        rng.setEnd(root, pos);
        sel.removeAllRanges();
        sel.addRange(rng);
    }

    return {
        element: null,

        editorView: null,

        sourceView: null,

        options: {
            name: "Fox Editor",
            width: "600",
            currentView: "Editor",
            height: "350"
        },

        config: function(prop) {
            var h = prop.baseURL.charAt(prop.baseURL.length - 1) === "/" ? "" : "/";
            config.baseURL = prop.baseURL + h;
        },

        create: function(target, options) {
            var ctx = this;
            $.extend(ctx.options, options);
            ctx._addStyle();
            ctx._render(target);
            ctx._bindFrameEvents();
            ctx._createBars();
        },

        _bindFrameEvents: function() {
            var ctx = this, frame = $("iframe.editor-view", ctx.element);
            frame.load(function() {
                var body = $(frame.contents()).find("body"), window = frame[0].contentWindow;
                body.attr("contenteditable", "true");
                body.parent().css("height", "100%");
                body.parent().css("cursor", "text");
                insertP(window);
                body.find("p").append("<br>");
                body.bind("keydown", function(e) {
                    if (e.keyCode == 9) {
                        e.preventDefault();
                    }
                });
                body.bind("keyup", function(e) {
                    console.log(!body[0].firstChild.localName);
                    if (body[0].hasChildNodes() && !body[0].firstChild.localName) {
                        insertP(window, body[0].innerHTML);
                    }
                });
            });
        },

        _render: function(target) {
            var ctx = this,
                element = ctx.element = $(template).replaceAll(target),
                options = ctx.options,
                h1 = 60, h2 = 20;
            ctx.sourceView = $(".editor-source", element);
            ctx.editorView = $("div.editor-view", element);
            ctx.element.css("width", options.width + "px");
            console.log($("div.control-panel", element).height());
            ctx.editorView.css("height", (options.height - h1 - h2) + "px");
            ctx.sourceView.css("height", (options.height - h1 - h2 - 10) + "px");
            ctx.sourceView.css("width", options.width - 10 + "px");
        },

        _addStyle: function() {
            var head = $("head"), options = this.options;
            $("<link href=\"" + config.baseURL + "Editor/css/icons.css\" rel=\"stylesheet\">").appendTo(head);
            $("<link href=\"" + config.baseURL + "Editor/css/" + options.style
                + ".css\" rel=\"stylesheet\">").appendTo(head);
        },

        _createBars: function() {
            var ctx = this, cp = $(ctx.element).find(".control-panel");
            minMaxBar.add(cp, {
                width: ctx.options.width,
                height: ctx.options.height
            });
            console.dir(ctx.options);
            sourceBar.add(cp, {
                    isEditor: true,
                    source: $(ctx.sourceView),
                    editor: $(ctx.editorView)
                }
            );

        }
    };
});