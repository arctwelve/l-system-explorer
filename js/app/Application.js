"use strict";


/*
 * Main application object for the L-Systems Explorer.
 *
 * TODO: 'ignored' words = symbols that don't get drawn if they are specificed (i.e., defaults)
 */
define(function (require) {


    var ControlPanel =  require('app/ControlPanel');
    var DrawingCanvas = require('app/DrawingCanvas');
    var Rewriter =      require('app/Rewriter');


    var Application = function () {

        var controlPanel = new ControlPanel();
        var canvas = new DrawingCanvas();

        var rewriter = new Rewriter("X");
        rewriter.addProduction("X->F[+X][-X]FX");
        rewriter.addProduction("F->FF");
        rewriter.derive(7);

        console.log(rewriter.words.toString().replace(/,/g, ""));
    }

    // return reference so the object can be instantiated after required as a module
    return Application;
});
