/*
 * A horizontal slider with output value field and label
 */
define(function () {

    "use strict";

    var Slider = function (elementID) {

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("small-slider-knob")[0];
        this.elementBtn.addEventListener("click", this.clickBtn.bind(this));
    };


    Slider.prototype.clickBtn = function () {
        this.elementBtn.style.left = "100px";
    };



    return Slider;
});
