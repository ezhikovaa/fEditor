define([
    "jquery",
    "text!./template/fEditor.html"
], function($, template) {
    $(".main-container").append(template);
});