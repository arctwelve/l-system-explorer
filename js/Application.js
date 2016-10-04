"use strict";


/*
 * Main application object for the L-Systems Explorer. Instantiated on window.onload
 */
var Application = function () {
    var controlPanel = new ControlPanel();
    var canvas = new DrawingCanvas();

    var rewriter = new Rewriter("R");
    rewriter.addProduction("L->R+L+R");
    rewriter.addProduction("R->L-R-L");
    rewriter.steps = 3;

    rewriter.derive();
}


window.onload = new Application();
