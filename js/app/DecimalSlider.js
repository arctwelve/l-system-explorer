/*
 * An add-on slider that controls single precision decimal values to the whole number value
 */
define(function () {


    "use strict";


    var DecimalSlider = function (parentSliderObj) {

        // consts for the range and offset of the slider knob
        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        this.min = 0.0;
        this.max = 0.9;

        this.element = parentSliderObj.element;
        this.elementBtn = this.element.getElementsByClassName("slider-decimal-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        this.decimalValue = 0.0;
        parentSliderObj.setDecimcalSlider(this);
    };


    /*
     * Handler for mousedown on the slider knob (thumb). Document level events are nested inside
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
     * Event handler for both the movement of the decimal slider knob. The values are always from
     * 0.0 to 0.9
     */
    DecimalSlider.prototype.knobMouseMove = function (e) {

        var mouseX = e.clientX - this.OFFSET_X;
        mouseX = this.range(mouseX, 0, this.HI_BOUND_X);
        this.elementBtn.style.left = mouseX + 'px';

        var coef = (this.max - this.min) / this.HI_BOUND_X;
        var decValue = (mouseX * coef) + this.min;

        this.decimalValue = this.round(decValue, 1);
    };


    /*
     * Clears mouse events on the slider knob and document.
     */
    DecimalSlider.prototype.knobMouseUp = function (e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
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
     * Replaces toFixed(...) found here: http://www.jacklmoore.com/notes/rounding-in-javascript/
     */
    DecimalSlider.prototype.round = function (value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    };

    return DecimalSlider;
});









/*
 * 'Method used by the 'value' setter instead of directly. Sets both the slider knob
 * and the value field. Also used for initializing the slider to a value from a saved
 * configuration or other external changes.
 */
/*
DecimalSlider.prototype.setSliderToValue = function (v) {

    var coef = this.HI_BOUND_X / (this.max - this.min);
    var mouseX = (v - this.min) * coef;

    this.elementBtn.style.left = mouseX + 'px';
    this.valueField.value = v;
};
*/



/*
 * Utility to initialize decimalSlider.value property and its getter and setter
 */
/*
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
*/
