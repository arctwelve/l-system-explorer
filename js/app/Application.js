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

        var controlPanel = new ControlPanel(this);
        this.canvas = new DrawingCanvas();

        var rewriter = new Rewriter("X");
        rewriter.addProduction("X->F[+X][-X]FX");
        rewriter.addProduction("F->FF");
        //rewriter.derive(7);
    }


    Application.prototype.generate =  function() {
        this.canvas.render();
    }


    return Application;
});
