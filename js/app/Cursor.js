/*
 * Helper class to store cursor locations for L-Systems with branching aka bracketed OL Systems
 * (stack operations)
 */
define(function () {

    "use strict";

    var Cursor = function (px, py, rad) {

        this.px = px;
        this.py = py
        this.rad = rad;
    }

    return Cursor;
});
