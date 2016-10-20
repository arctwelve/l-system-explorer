"use strict";


/*
 * Object represents a push button. It doesn't have an on/off toggle state
 */
define(function (require) {


    var TemplateLoader = require('app/TemplateLoader');


    var PushButton = function (template, container) {

        var loader = new TemplateLoader("dark-btn", "darkbuttonA");
        this.domElement = null;


        // would addEventListener be better in TemplateLoader instead of using window
        window.addEventListener(loader.loadEvent, function (e) {
                 alert ("loader DomElement " + loader.domElement);
        });

    }


    return PushButton;
});
