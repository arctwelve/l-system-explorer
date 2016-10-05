"use strict";


/*
 * Drawing canvas object. Takes up entire window, including space underneath control panel. Object
 * wraps the html canvas -- the reference to it (this.obj) is grabbed in the constructor.
 */
define(function () {


    var DrawingCanvas = function () {

        this.container = document.getElementById("drawing-canvas-container");
        this.cvs = document.getElementById("drawing-canvas");
        this.ctx = this.cvs.getContext("2d");

        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
    }


    DrawingCanvas.prototype.resizeCanvas = function () {
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;
        //this.render();
    }


    DrawingCanvas.prototype.render = function (time) {

        // render method needs a memoized set of words from the L-System Rewriter

        this.ctx.fillStyle = 'rgba(0, 51, 102, 0.02)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);


        this.ctx.beginPath();
        this.ctx.moveTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));
        this.ctx.lineTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));

        this.ctx.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this.ctx.stroke();

        window.requestAnimationFrame(this.render.bind(this));
    }


    DrawingCanvas.prototype.getRandInt = function (min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    // return reference so the object can be instantiated after required as a module
    return DrawingCanvas;
});
