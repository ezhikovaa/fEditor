define([

], function() {
    var template =
        "<span class=\"tool-bar\"><a class=\"f-tool-button\"><span class=\"f-icon f-i-maximize\"></span></a></span>";
    return {

        element: null,

        options: {
            name: "Minimize-Maximize Bar."
        },

        add: function(element, options) {
            var ctx = this;
            $.extend(ctx.options, options ? options : {});
            console.dir(ctx.options);
            ctx.element = $(template).appendTo($(element));
            ctx._bindEvents();
        },

        _bindEvents: function() {
            var ctx = this, ns = ctx.options.name;
            $("a", ctx.element).bind("click." + ns, function(e) {
                var btn = $(e.target).closest("a.f-tool-button", ctx.element);
                if (btn.hasClass("activate")) {
                    ctx._minimize();
                } else {
                    ctx._maximize();
                }
                btn.toggleClass("activate");
            });
        },

        _minimize: function() {
            var ctx = this,
                element = $(ctx.element).parent().parent(),
                options = ctx.options,
                sourceView = $(".editor-source", element),
                editorView = $("div.editor-view", element),
                h1 = 60, h2 = 20;
            element.removeClass("maximize");
            element.css("width", options.width + "px");
            editorView.css("height", (options.height - h1 - h2) + "px");
            sourceView.css("height", (options.height - h1 - h2 - 10) + "px");
            sourceView.css("width", options.width - 10 + "px");
        },

        _maximize: function() {
            var ctx = this,
                element = $(ctx.element).parent().parent(),
                sourceView = $(".editor-source", element),
                editorView = $("div.editor-view", element);
            element.css("width", "");
            element.addClass("maximize");
            sourceView.css("width", "99.5%");
            editorView.css("height", "");
            sourceView.css("height", "");
        }
    };
});