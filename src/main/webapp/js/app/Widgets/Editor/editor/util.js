define([
    "jquery"
], function ($) {
    return {

        getElementStyle: function (a) {
            var sheets = $("iframe.editor-view")[0].contentWindow.document.styleSheets, o = {};
            for (var i in sheets) {
                var rules = sheets[i].rules || sheets[i].cssRules;
                for (var r in rules) {
                    if (a.is(rules[r].selectorText)) {
                        o = $.extend(o, this._css2json(rules[r].style), css2json(a.attr('style')));
                    }
                }
            }
            return o;
        },

        _css2json: function (css) {
            var s = {};
            if (!css) return s;
            if (css instanceof CSSStyleDeclaration) {
                for (var i in css) {
                    if ((css[i]).toLowerCase) {
                        var st = css[i].split("-"),
                            o = st[0];
                        for (j = 1; j < st.length; j++) {
                            o = o + st[j].charAt(0).toUpperCase() + st[j].substr(1);
                        }
                        s[(css[i]).toLowerCase()] = (css[o]);
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
        },

        convertImgToBase64: function (url, callback, outputFormat) {
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'),
                img = new Image;
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback.call(this, dataURL);
                canvas = null;
            };
            img.src = url;

//        convertImgToBase64('img/ornament.jpg', function (base64Img) {
//            console.log(base64Img);
//        }, "image/png");
        }
    };
});