/*
 * An optional decimal slider, to add single decimal precision to a parent whole number slider.
 * This is necessary because some slider ranges are too large to accomodate a pixel to decimal
 * relationship.
 */
define(function () {

    "use strict";

    var DecimalSlider = function (elementID, parentSlider) {

        // consts for the range and offset of the slider knob
        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        // could be params instead of hard coded but I'm not writing a component library (yet)
        this.min = 0;
        this.max = 1;

        this.elementBtn = document.getElementById(elementID);
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        this.initGetSetValue();
    };


    /*
     * Handler for mousedown on the slider knob. Document level events are nested inside
     * to keep their scope limited. Single function assignment to event is preferable for
     * nullability in the knobMouseUp handler.
     */
    DecimalSlider.prototype.knobMouseDown = function (e) {

        document.onmouseup = this.knobMouseUp.bind(this);
        document.onmousemove = this.knobMouseMove.bind(this);

        this.elementBtn.onmouseup = this.knobMouseUp.bind(this);
        this.elementBtn.ondragstart = function () {
            return false;
        };
    };


    /*
     * Event handler for both the movement of the slider knob as well as deriving its value from
     * the min, max and step parameters. Method first clamps the slider knob to its track, then
     * derives the specific min and max adjusted value.
     */
    DecimalSlider.prototype.knobMouseMove = function (e) {

        var mouseX = e.clientX - this.OFFSET_X;
        mouseX = this.range(mouseX, 0, this.HI_BOUND_X);
        this.elementBtn.style.left = mouseX + 'px';

        var coef = (this.max - this.min) / this.HI_BOUND_X;
        var adjValue = (mouseX * coef) + this.min;

        this.sliderVal = adjValue;
        console.log(this.sliderVal);
        //this.valueField.value = Number(adjValue + "." + this.decimalSlider.decimalValue);
    };


    /*
     * Clears mouse events on the slider knob and document.
     */
    DecimalSlider.prototype.knobMouseUp = function (e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    /*
     * 'Method used by the 'value' setter instead of directly. Sets both the slider knob
     * and the value field. Also used for initializing the slider to a value from a saved
     * configuration or other external changes.
     */
    DecimalSlider.prototype.setSliderToValue = function (v) {

        var coef = this.HI_BOUND_X / (this.max - this.min);
        var mouseX = (v - this.min) * coef;

        this.elementBtn.style.left = mouseX + 'px';
        this.valueField.value = v;
    };


    /*
     * Utility method to keep values in a range
     */
    DecimalSlider.prototype.range = function (v, min, max) {
        if (v > max) return max;
        if (v < min) return min;
        return v;
    };


    /*
     * Utility to initialize slider.value property and its getter and setter
     */
    DecimalSlider.prototype.initGetSetValue = function () {

        this.sliderVal = 0;
        Object.defineProperty(DecimalSlider.prototype, 'value', {
            configurable: true,

            get: function () {
                return this.sliderVal;
            },
            set: function (v) {
                v = this.range(v, this.min, this.max);
                this.sliderVal = v;
                this.setSliderToValue(v);
            }
        });
    };


    /*
     * Sets the passed numeric value to a given level of precision
     */
    DecimalSlider.prototype.round = function (value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


    return DecimalSlider;
});