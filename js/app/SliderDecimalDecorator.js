/*
 * A decorator for the Slider class. Adds a small additional slider below the passed parent Slider,
 * allowing the user to move a single precision decimal value to the parent Slider's value.
 */
define(function () {

    "use strict";

    var SliderDecimalDecorator = function (sliderParentObj) {

        this.sliderParentObj = sliderParentObj;


        Object.defineProperty(SliderDecimalDecorator.prototype, 'value', {
            set: function (v) {
                this.sliderParentObj.value = v;
            }
        });
    };

    return SliderDecimalDecorator;
});
