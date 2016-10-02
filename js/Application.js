"use strict";


/*
 * Main application object for the L-Systems Explorer.
 * Instantiated on window.onload
 */
var Application = function () {
    var controlPanel = new ControlPanel();
    var canvas = new DrawingCanvas();

    var rewriter = new Rewriter();
    rewriter.setAxiom("F")
}


window.onload = new Application();
