/*
 * Configuration object for an L-System. Ducktyping encapsulation for setters and getters.
 */
define(function (require) {

    "use strict";

    var Configuration = function () {

        this.startX = 0;
        this.startY = 0;
        this.startAngle = 0;

        this.angle = 0;
        this.iterations = 0;
        this.segLength = 0;
    };


    /*
     * Starting position and angle of the cursor. Angle is automatically conversted to radians.
     */
    Configuration.prototype.setStart = function (x, y, a) {
        this.startX = x;
        this.startY = y;
        this.startAngle = a * Math.PI / 180;
    };


    /*
     * Angle used to specify right or left turns of the cursor (+ or -). Angle is converted to
     * radians.
     */
    Configuration.prototype.setAngle = function (angleInteger, angleDecimal) {
        var a = parseFloat(angleInteger + "." + angleDecimal);
        this.angle = a * Math.PI / 180;
    };


    return Configuration;
});
