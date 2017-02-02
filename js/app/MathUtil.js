/*
 * Static math utility functions
 */
define(function () {

    "use strict";

    var MathUtil = function () {
        Console.log("Don't instantiate MathUtil.js. Use its methods statically");
    };


    MathUtil.clamp = function (v, min, max) {
        if (v > max) return max;
        if (v < min) return min;
        return v;
    };


    return MathUtil;
});
