/*
 * Main application object for the L-Systems Explorer.
 *
 * TODO: 'ignored' words = symbols that don't get drawn if they are specificed (i.e., defaults)
 */
define(function (require) {

    "use strict";

    var ControlPanel =  require('app/ControlPanel');
    var DrawingCanvas = require('app/DrawingCanvas');
    var Rewriter =      require('app/Rewriter');


    var Application = function () {

        this.intervalID = window.setInterval(this.testState.bind(this), 500);


        //var rewriter = new Rewriter("X");
        //rewriter.addProduction("X->F[+X][-X]FX");
        //rewriter.addProduction("F->FF");
        //rewriter.derive(7);
    };


    Application.prototype.init =  function() {
        this.canvas = new DrawingCanvas();
        this.controlPanel = new ControlPanel(this);

        this.controlPanel.toggleControlPanel();
        document.getElementById("drawing-canvas-container").style.visibility = "visible";
    };


    Application.prototype.generate =  function() {
        var panelData =  this.controlPanel.getData();
        console.log(panelData);
    };


    Application.prototype.validateInput =  function() {
        //
    };


    Application.prototype.testState =  function() {
        if (document.readyState === "complete") {
            this.init();
            clearInterval(this.intervalID);
        }
    };


    return Application;
});
