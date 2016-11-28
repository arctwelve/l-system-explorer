/*
 * A horizontal slider with output value field and label. Element could be an input range, but
 * this allows more flexibility for custom GUI items
 */
define(function () {

    "use strict";

    var Slider = function (elementID, labelText) {

        this.minX = 2;
        this.maxX = 251;

        this.sliderOffsetX = 46;
        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("small-slider-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        this.labelElement = this.element.firstElementChild;
        this.labelElement.textContent = labelText;
    };


    /*
     * Handler for mousedown on the slider knob (thumb). Document level events are nested inside
     * to keep their scope limited. Single function assignment to event is preferable for
     * nullability in the knobMouseUp handler.
     */
    Slider.prototype.knobMouseDown = function(e) {

        document.onmouseup = this.knobMouseUp.bind(this);
        document.onmousemove = this.knobMouseMove.bind(this);

        this.elementBtn.onmouseup = this.knobMouseUp.bind(this);
        this.elementBtn.ondragstart = function() {
            return false;
        };
    };


    Slider.prototype.knobMouseMove = function(e) {

        this.elementBtn.style.left = e.clientX - this.sliderOffsetX + 'px';
        var posX = parseInt(this.elementBtn.style.left, 10);

        if (posX > this.maxX) {
            this.elementBtn.style.left = this.maxX + "px";
        } else if (posX < this.minX) {
            this.elementBtn.style.left = this.minX + "px";
        }
    };


    Slider.prototype.knobMouseUp = function(e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    return Slider;
});
