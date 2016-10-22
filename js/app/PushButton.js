"use strict";


/*
 * Object represents a push button.
 */
define(function (require) {


    //var TemplateLoader = require('app/TemplateLoader');


    var PushButton = function (parentContainer, templateName) {

        //this.isLoaded = true;
        //var loader = new TemplateLoader(parentContainer, templateName, this.init);
    }


    /*
     * Loaders callback method always returns one argument: the dom element that was loaded
     */
    PushButton.prototype.init = function (domElement) {
        this.element = domElement;
        //this.isLoaded = true;
    }



     PushButton.prototype.addEventListener = function (domElement) {
        this.element = domElement;
        //this.isLoaded = true;
    }



    return PushButton;
});
