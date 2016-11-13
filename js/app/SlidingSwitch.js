/*
 * Object represents a sliding rectangular switch
 */
define(function () {

    "use strict";

    var SlidingSwitch = function (elementID) {

        this.showSteps =  true;

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.firstElementChild;
        this.element.addEventListener("click", this.toggleSwitchState.bind(this));
    };


    /*
     * Allows external methods to act as handlers for events on the switch
     */
    SlidingSwitch.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element !== null) {
            this.element.addEventListener(event, callbackFunction);
        }
    };


    /*
     * Event handler for the toggling the switch click. Animation is CSS
     */
    SlidingSwitch.prototype.toggleSwitchState = function () {

        if (this.showSteps) {
            this.elementBtn.style.left = "121px";
            this.showSteps = false;
        } else {
            this.elementBtn.style.left = "2px";
            this.showSteps = true;
        }
    };


    return SlidingSwitch;
});
