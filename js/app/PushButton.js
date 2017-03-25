/*
 * Object represents a generic push button. Design is specified in the HTML and CSS. Class is
 * used to encapsulate behavior and downstate image
 */
define(function () {

    "use strict";

    var PushButton = function (element, downImagePath) {

        this.element = document.getElementById(element);

        this.element.addEventListener("mouseup", this.buttonUp.bind(this));
        this.element.addEventListener("mouseout", this.buttonUp.bind(this));
        this.element.addEventListener("mousedown", this.buttonDown.bind(this));

        this.image = this.element.getElementsByTagName("img")[0];
        this.upImage = this.image.src;
        this.downImage = downImagePath;
    };


    PushButton.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element !== null) {
            this.element.addEventListener(event, callbackFunction);
        }
    };


    PushButton.prototype.buttonDown = function() {
        this.image.src = this.downImage;
    };


    PushButton.prototype.buttonUp = function() {
        this.image.src = this.upImage;
    };


    return PushButton;
});
