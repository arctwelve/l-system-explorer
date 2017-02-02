/*
 * An optional decimal slider, to add single decimal precision to a parent whole number slider.
 * This is necessary because some slider ranges are too large to accomodate a pixel to decimal
 * relationship. DecimalSlider never touches the parent GUI elements directly - it only calls
 * the setDecimal method of its parent slider.
 */
define(function (require) {

    "use strict";

    var MathUtil = require('app/MathUtil');

    var DecimalSlider = function (elementID, parentSlider) {

        // consts for the pixel range and offset of the decimalslider knob
        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        // use integers instead of floats for accuracy
        this.min = 0;
        this.max = 9;
        this.coefX = (this.max - this.min) / this.HI_BOUND_X;
        this.invCoefX = this.HI_BOUND_X / (this.max - this.min);

        this.parentSlider = parentSlider;
        this.elementBtn = document.getElementById(elementID);
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        Object.defineProperty(DecimalSlider.prototype, 'val', {
            configurable: true,
            set: function (v) {
                this.setKnobToValue(v);
            }
        });
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
     * Event handler for the movement of the slider knob and setting the parent slider value field
     */
    DecimalSlider.prototype.knobMouseMove = function (e) {

        var mouseX = e.clientX - this.OFFSET_X;
        mouseX = MathUtil.clamp(mouseX, 0, this.HI_BOUND_X);
        this.elementBtn.style.left = mouseX + 'px';

        var adjValue = Math.floor((mouseX * this.coefX) + this.min);
        this.parentSlider.setDecimal(adjValue);
    };


    /*
     * Clears mouse events on the slider knob and document, and the stored parent slider value
     */
    DecimalSlider.prototype.knobMouseUp = function (e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    /*
     * Used directly to initialize the location of the decimal slider knob and parent decimal value
     */
    DecimalSlider.prototype.setKnobToValue = function (v) {

        v = MathUtil.clamp(v, this.min, this.max);
        this.parentSlider.setDecimal(v);

        var mouseX = (v - this.min) * this.invCoefX;
        this.elementBtn.style.left = mouseX + 'px';
    };


    return DecimalSlider;
});
