"use strict";


/*
 * Object represents a push button.
 */
define(function (require) {


    var PushButton = function (element) {

        this.element = document.getElementById(element);
        this.element.addEventListener("mouseup", this.buttonUp.bind(this));
        this.element.addEventListener("mouseout", this.buttonUp.bind(this));
        this.element.addEventListener("mousedown", this.buttonDown.bind(this));

        this.upImagePath = "img/btn_rect.png"
        this.downImagePath = "img/btn_rect_down.png";

        this.image = this.element.getElementsByTagName("img")[0];
        this.label = this.element.getElementsByClassName("btn-rect-label")[0];
    }


    PushButton.prototype.addEventListener = function (event, callbackFunction) {
        if (this.element != null) {
            this.element.addEventListener(event, callbackFunction);
        }
    }


    PushButton.prototype.buttonDown = function() {
        this.image.src = this.downImagePath;
    }


    PushButton.prototype.buttonUp = function() {
        this.image.src = this.upImagePath;
    }


    return PushButton;
});
