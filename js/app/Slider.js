/*
 * A horizontal slider with output value field and label. Element could be an input range, but
 * this allows more flexibility for custom GUI items. min and max parameters specify the lowest
 * and highest values of the slider. The step parament defines the increment value between
 * min and max -- range permitting
 */
define(function () {

    "use strict";

    var Slider = function (elementID, labelText, min, max, step) {

        // consts for the range and offset of the slider knob
        this.LO_BOUND_X = 1;
        this.HI_BOUND_X = 251;
        this.OFFSET_X = 46;

        this.min = min;
        this.max = max;
        this.step = step;

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("small-slider-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        this.labelElement = this.element.firstElementChild;
        this.labelElement.textContent = labelText;
        this.valueField = this.element.getElementsByClassName("small-slider-input-text")[0];

        this.sliderVal = 0;
        Object.defineProperty(Slider.prototype, 'value', {
            configurable: true,

            get: function () {
                return this.sliderVal;
            },
            set: function (v) {
                this.sliderVal = v;
            }
        });
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


    /*
     * Event handler for both the movement of the slider knob as well as deriving its value from
     * the min, max and step parameters. Method first clamps the slider knob to its track, then
     * derives the specific value.
     */
    Slider.prototype.knobMouseMove = function(e) {

        var mouseX = e.clientX - this.OFFSET_X;
        if (mouseX > this.HI_BOUND_X) mouseX = this.HI_BOUND_X;
        if (mouseX < this.LO_BOUND_X) mouseX = this.LO_BOUND_X;
        this.elementBtn.style.left = mouseX + 'px';

        this.adjustSliderValue(mouseX);
        this.valueField.value = this.value;
    };


    Slider.prototype.adjustSliderValue = function(mouseX) {
        var coef = this.max / this.HI_BOUND_X;
        var single = Math.ceil(mouseX * coef);
        this.value = single;
    };


    Slider.prototype.knobMouseUp = function(e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    return Slider;
});
