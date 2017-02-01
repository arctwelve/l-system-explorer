/*
 * A horizontal slider with output value field and label. Element could be an input range, but
 * this allows more flexibility for custom GUI items. min and max parameters specify the lowest
 * and highest values of the slider.
 */
define(function () {

    "use strict";

    var Slider = function (elementID, label, min, max) {

        // consts for the range and offset of the slider knob
        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        this.decimal = 0;
        this.hasDecimal = false;

        this.min = min;
        this.coefX = (max - min) / this.HI_BOUND_X;
        this.invCoefX = this.HI_BOUND_X / (max - min);

        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("small-slider-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        this.labelElement = this.element.firstElementChild;
        this.labelElement.textContent = label;

        this.valueField = this.element.getElementsByClassName("small-slider-input-text")[0];
        this.initGetSetValue();
    };


    /*
     * Handler for mousedown on the slider knob (thumb). Document level events are nested inside
     * to keep their scope limited. Single function assignment to event is preferable for
     * nullability in the knobMouseUp handler.
     */
    Slider.prototype.knobMouseDown = function (e) {

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
    Slider.prototype.knobMouseMove = function (e) {

        var mouseX = e.clientX - this.OFFSET_X;
        mouseX = this.clamp(mouseX, 0, this.HI_BOUND_X);

        var adjValue = Math.floor((mouseX * this.coefX) + this.min);
        this.sliderVal = (this.hasDecimal) ? adjValue + "." + this.decimal : adjValue;
        this.setGUIToValue(this.sliderVal);
    };


    /*
     * Clears mouse events on the slider knob and document.
     */
    Slider.prototype.knobMouseUp = function (e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    /*
     * 'Method used by the 'value' setter instead of directly. Sets both the slider knob
     * and the value field. Also used for initializing the slider to a value from a saved
     * configuration or other external changes.
     */
    Slider.prototype.setGUIToValue = function (v) {

        var mouseX = (v - this.min) * this.invCoefX;
        this.elementBtn.style.left = mouseX + 'px';
        this.valueField.value = (this.decimal === 0) ? Math.floor(v) : v;
    };


    /*
     * Keeps given value between a range of min and max
     */
    Slider.prototype.clamp = function (v, min, max) {
        if (v > max) return max;
        if (v < min) return min;
        return v;
    };


    /*
     * Utility to initialize slider.value property and its getter and setter
     */
    Slider.prototype.initGetSetValue = function () {
        this.sliderVal = 0;
        Object.defineProperty(Slider.prototype, 'value', {
            configurable: true,

            get: function () {
                return this.sliderVal;
            },
            set: function (v) {
                this.sliderVal = v;
                this.setGUIToValue(v);
            }
        });
    };


    /*
     * Sets an optional single precision decimal value and updates gui field for decimal value
     */
    Slider.prototype.setDecimal = function (d) {

        this.decimal = d;
        this.hasDecimal = true;

        this.sliderVal = Math.floor(this.value) + "." + this.decimal;
        this.valueField.value = (this.decimal === 0) ? Math.floor(this.sliderVal) : this.sliderVal;
    };


    return Slider;
});
