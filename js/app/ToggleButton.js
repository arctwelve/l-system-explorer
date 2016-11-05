/*
 * Object represents a sliding rectangular toggle button
 */
define(function () {

    "use strict";

    var ToggleButton = function (elementID) {

        this.showSteps =  true;

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("toggle-knob")[0];

        this.element.addEventListener("click", this.toggleKnob.bind(this));
    };


    /*
     * Allows external methods to act as handlers for events on the toggle
     */
    ToggleButton.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element !== null) {
            this.element.addEventListener(event, callbackFunction);
        }
    };


    /*
     * Event handler for the toggle knob click. Animation is CSS
     */
    ToggleButton.prototype.toggleKnob = function () {

        if (this.showSteps) {
            this.elementBtn.style.left = "121px";
            this.showSteps = false;
        } else {
            this.elementBtn.style.left = "2px";
            this.showSteps = true;
        }
    };

    return ToggleButton;
});
