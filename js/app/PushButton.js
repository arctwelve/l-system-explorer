/*
 * Object represents a rectangular push button
 */
define(function () {

    "use strict";

    var PushButton = function (element, labelText) {

        this.element = document.getElementById(element);
        this.element.addEventListener("mouseup", this.buttonUp.bind(this));
        this.element.addEventListener("mouseout", this.buttonUp.bind(this));
        this.element.addEventListener("mousedown", this.buttonDown.bind(this));

        this.upImagePath = "img/btn-rect.png";
        this.downImagePath = "img/btn-rect-down.png";

        this.image = this.element.getElementsByTagName("img")[0];
        this.label = this.element.getElementsByClassName("btn-rect-label")[0];
        this.label.innerHTML = labelText;
    };


    PushButton.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element !== null) {
            this.element.addEventListener(event, callbackFunction);
        }
    };


    PushButton.prototype.buttonDown = function() {
        this.image.src = this.downImagePath;
    };


    PushButton.prototype.buttonUp = function() {
        this.image.src = this.upImagePath;
    };


    return PushButton;
});
