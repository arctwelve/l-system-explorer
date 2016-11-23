/*
 * Object represents a rectangular horizontal switch
 */
define(function () {

    "use strict";

    var Switch = function (elementID) {

        this.showSteps =  true;

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.firstElementChild;
        this.element.addEventListener("click", this.toggleSwitchState.bind(this));
    };


    /*
     * Allows external methods to act as handlers for events on the switch
     */
    Switch.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element !== null) {
            this.element.addEventListener(event, callbackFunction);
        }
    };


    /*
     * Event handler for the toggling the switch click. Animation is CSS
     */
    Switch.prototype.toggleSwitchState = function () {

        if (this.showSteps) {
            this.elementBtn.style.left = "121px";
            this.showSteps = false;
        } else {
            this.elementBtn.style.left = "2px";
            this.showSteps = true;
        }
    };


    return Switch;
});
