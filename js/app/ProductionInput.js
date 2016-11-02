"use strict";


/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 */
define(function (require) {


    var ProductionInput = function (elementId) {

        this.element = document.getElementById(elementId);
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.buttonDown.bind(this));
    }


    ProductionInput.prototype.buttonDown = function() {
        // determine the type of button (add or remove)
        console.log(this.element.className)
    }


    return ProductionInput;
});
