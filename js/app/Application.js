/*
 * Main application object for the L-Systems Explorer
 */
define(function (require) {

    "use strict";

    var ControlPanel =  require('app/ControlPanel');
    var DrawingCanvas = require('app/DrawingCanvas');
    var Rewriter =      require('app/Rewriter');
    var MessageBubble = require('app/MessageBubble');


    var Application = function () {
        this.intervalID = window.setInterval(this.testState.bind(this), 500);
    };


    /*
     * Init method is called once the document readystate is complete.
     */
    Application.prototype.init =  function() {
        this.canvas = new DrawingCanvas();
        this.drawingCanvas = new DrawingCanvas();
        this.controlPanel = new ControlPanel(this);

        this.controlPanel.toggleControlPanel();
        document.getElementById("drawing-canvas-container").style.visibility = "visible";
    };


    Application.prototype.testState =  function() {
        if (document.readyState === "complete") {
            this.init();
            clearInterval(this.intervalID);
        }
    };


    return Application;
});
