"use strict";


/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value
 */
define(function (require) {


    var ProductionInput = function (element) {
        this.element = element;
    }


    ProductionInput.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element != null) {
            this.element.addEventListener(event, callbackFunction);
        }
    }


    ProductionInput.prototype.buttonDown = function() {

    }


    ProductionInput.prototype.buttonUp = function() {

    }


    return ProductionInput;
});
