"use strict";


/*
 * Object represents a push button. It doesn't have an on/off toggle state
 */
define(function (require) {


    var TemplateLoader = require('app/TemplateLoader');


    var PushButton = function (parentContainer, templateName) {

        var loader = new TemplateLoader(parentContainer, templateName);

    }


    return PushButton;
});
