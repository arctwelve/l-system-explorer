/*
 * A decorator for the Slider class. Adds a small additional slider below the passed parent Slider,
 * allowing the user to move a single precision decimal value to the parent Slider's value.
 *
 * An interesting study in the fine line between inheritance vs composition. This could just as
 * easily extend Slider instead being a composite Decorator. As a decorator, a lot of the interface
 * of Slider methods needs to be "passed through" -- sometimes easily, but with JavaScript's
 * clunky event handling, the parent Slider class needs some tweaking to know which Slider is
 * active.
 *
 */
define(function () {

    "use strict";

    var SliderDecimalDecorator = function (parentSlider) {

        this.OFFSET_X = 46;
        this.HI_BOUND_X = 251;

        this.parentSlider = parentSlider;
        this.elementBtn = parentSlider.element.getElementsByClassName("slider-decimal-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));

        // pass-through value setter to parentSlider
        Object.defineProperty(SliderDecimalDecorator.prototype, 'value', {
            set: function (v) {
                this.parentSlider.value = v;
            }
        });
    };


    /*
     * Handler for mousedown on the decimal knob (thumb). Document level events are nested inside
     * to keep their scope limited. Single function assignment to event is preferable for
     * nullability in the knobMouseUp handler.
     */
    SliderDecimalDecorator.prototype.knobMouseDown = function(e) {

        this.parentSlider.knobMouseDown(e, this.elementBtn);

        /*
        document.onmouseup = this.knobMouseUp.bind(this);
        document.onmousemove = this.knobMouseMove.bind(this);

        this.elementBtn.onmouseup = this.knobMouseUp.bind(this);
        this.elementBtn.ondragstart = function() {
            return false;
        };
        */
    };



    /*
     * Event handler for both the movement of the Decimal slider knob as well as deriving its
     * value from  the min, max and step parameters. Method first clamps the slider knob to its
     * track, then derives the specific min and max adjusted value.
     */
    SliderDecimalDecorator.prototype.knobMouseMove = function(e) {
        console.log("dec " + this.elementBtn);
        this.parentSlider.knobMouseMove(e, this.elementBtn);
    };



    /*
     * Clears mouse events on the slider knob and document.
     */
    SliderDecimalDecorator.prototype.knobMouseUp = function(e) {
        this.parentSlider.knobMouseUp(e);
    };


    /*
     * Utility method to keep values in a range
     */
    SliderDecimalDecorator.prototype.range = function(v, min, max) {
        return this.parentSlider.range(v, min, max);
    };

    return SliderDecimalDecorator;
});
