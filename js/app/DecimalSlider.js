/*
 *
 */
define(function () {

    "use strict";

    var Slider = require('app/Slider');

    var DecimalSlider = function (elementID, label, min, max) {

        Slider.call(this, elementID, label, min, max);
    };


    DecimalSlider.prototype = Object.create(Slider.prototype);
    DecimalSlider.prototype.constructor = DecimalSlider;

    return Slider;

});

