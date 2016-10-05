"use strict";


/*
 * Main application object for the L-Systems Explorer.
 */
define(function (require) {


    var ControlPanel = require('app/ControlPanel');


    var Application = function () {

        var controlPanel = new ControlPanel();

        /*
        var canvas = new DrawingCanvas();

        var rewriter = new Rewriter("R");
        rewriter.addProduction("L->R+L+R");
        rewriter.addProduction("R->L-R-L");
        rewriter.derive(9);
    */
        //console.log(rewriter.words.toString().replace(/,/g, ""));
    }


    return Application;

});


