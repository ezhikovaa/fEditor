define([
    "text!./SourceBar.html"
], function(template) {
    return {

        parent: null,

        element: null,

        options: {
            isEditor: true,
            source: null,
            editor: null,
            name: "ToggleSourceBar"
        },

        toggleView: function() {
            var ctx = this, options = ctx.options,
                source = options.source, editor = options.editor, display = "display",
                b = $($(options.editor).find("iframe.editor-view").contents()).find("body");
            if (options.isEditor) {
                source.css(display, "block").val(ctx._prepareHTML(b[0].childNodes, 0));
                editor.css(display, "none");
                //                options.source.val(ctx._prepareHTML(b[0].childNodes));
                b.attr("contenteditable", "false");
            } else {
                source.css(display, "none");
                editor.css(display, "block");
                b.html(source.val().replace(/\n/g, "").replace(/\t/g, ""));
                b.attr("contenteditable", "true");
            }
            options.isEditor = !options.isEditor;
        },

        add: function(element, options) {
            var ctx = this;
            $.extend(ctx.options, options);
            ctx.parent = element;
            ctx.element = $(template).appendTo($(ctx.parent));
            $("a.source-button", ctx.element).bind("click." + options.name, function(e) {
                $(e.target).closest("a.f-tool-button", ctx.element).toggleClass("activate");
                ctx.toggleView();
            });
        },

        _prepareHTML: function(col, index) {
            var ctx = this, html = "", size = col.length, n = "\n";
            for (var i = 0; i < size; i++) {
                html += ctx._prepareChild($(col[i]), index);
                if ($(col).parent()[0].localName == "body" && (i + 1 < size)) {
                    html = html + n + n;
                } else if ((i + 1 < size)) {
                    html += n;
                }
            }
            return html;
        },

        _prepareChild: function(elem, count) {
            var ctx = this, html = elem[0].outerHTML, c = ++count, n = "\n";
            if (!html && elem.text() == "\n") {
                html = "";
            } else if (!html) {
                html = elem.text();
            }
            if (elem.children().length > 0) {
                html = ctx._getTab(c) + html.replace(elem[0].innerHTML, n +
                    ctx._prepareHTML(elem[0].childNodes, c) + n + ctx._getTab(c));
            } else {
                html = ctx._getTab(c) + html;
            }
            return html;
        },
        _getTab: function(index) {
            var tab = "";
            for (var i = 1; i < index; i++)
                tab += "\t";
            return tab;
        }
    };
});