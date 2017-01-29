/*
 * An optional decimal slider, to add single decimal precision to a parent whole number slider.
 * This is necessary because some slider ranges are too large to accomodate a pixel to decimal
 * relationship. DecimalSlider never touches the parent GUI elements directly - it only sets
 * the decimal property of its parent slider.
 */
define(function () {

    "use strict";

    var DecimalSlider = function (elementID, parentSlider) {

        // consts for the range and offset of the slider knob
        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        // use integers instead of floats for accuracy
        this.min = 0;
        this.max = 9;

        this.parentSlider = parentSlider;
        this.elementBtn = document.getElementById(elementID);
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        Object.defineProperty(DecimalSlider.prototype, 'value', {
            configurable: true,

            set: function (v) {
                this.setGUIToValue(v);
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
     * Event handler for both the movement of the slider knob as well as deriving its value from
     * the min, max and step parameters. Method first clamps the slider knob to its track, then
     * derives the specific min and max adjusted value.
     */
    DecimalSlider.prototype.knobMouseMove = function (e) {

        var mouseX = e.clientX - this.OFFSET_X;
        mouseX = this.clamp(mouseX, 0, this.HI_BOUND_X);
        this.elementBtn.style.left = mouseX + 'px';

        var coef = (this.max - this.min) / this.HI_BOUND_X;
        var adjValue = (mouseX * coef) + this.min;
        adjValue = Math.floor(adjValue);

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
     * Used directly to initialize the location of the slider knob
     */
    DecimalSlider.prototype.setGUIToValue = function (v) {

        v = this.clamp(v, this.min, this.max);
        this.parentSlider.setDecimal(v);

        var coef = this.HI_BOUND_X / (this.max - this.min);
        var mouseX = (v - this.min) * coef;
        this.elementBtn.style.left = mouseX + 'px';
    };


    /*
     * Keeps given value between a range of min and max
     */
    DecimalSlider.prototype.clamp = function (v, min, max) {
        if (v > max) return max;
        if (v < min) return min;
        return v;
    };


    return DecimalSlider;
});
