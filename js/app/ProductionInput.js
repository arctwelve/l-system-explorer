"use strict";


/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 */
define(function (require) {


    var ProductionInput = function (elementId) {

        this.element = document.getElementById(elementId);
        this.elementBtn = this.element.getElementsByTagName("img")[0];
        this.elementBtn.addEventListener("click", this.buttonClick.bind(this));
    }


    ProductionInput.prototype.buttonClick = function() {
        // determine the type of button (add or remove)

    }


    return ProductionInput;
});
