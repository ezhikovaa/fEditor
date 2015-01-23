require.config({
    paths: {
        jquery: "../lib/jquery.min",
        "text": "../lib/text"
    },
    // disables RequireJS timeout to prevent interruption of workflow due to too slow script loading
    waitSeconds: 0
});

require([
    "Widgets/Editor/fEditor"
], function(editor) {
    editor.config({
        baseURL: "js/app/Widgets"
    });
    $(document).ready(function() {
        editor.create($("#editor"), {
            style: "Standart"
        });
    });
});