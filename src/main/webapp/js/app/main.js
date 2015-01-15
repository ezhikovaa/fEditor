require.config({
    paths: {
        jquery: "../lib/jquery.min",
        "text": "../lib/text"
    },
    // disables RequireJS timeout to prevent interruption of workflow due to too slow script loading
    waitSeconds: 0
});

require([
    "jquery",
    "Widgets/Editor/fEditor"
], function($, Application) {
    $(document).ready(function() {
//        Application.init();
    });
});