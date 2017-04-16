/*
 * Drawing canvas object. Takes up entire window, including space underneath control panel. Object
 * is a wrapper for the html canvas. Render method takes a completed string of parsed
 * productions (aka 'words') and draws it onto the canvas.
 */
define(function (require) {

    "use strict";

    var Cursor = require('app/Cursor');

    var DrawingCanvas = function () {

        this.container = document.getElementById("drawing-canvas-container");
        this.cvs = document.getElementById("drawing-canvas");
        this.ctx = this.cvs.getContext("2d");

        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
    };


    DrawingCanvas.prototype.resizeCanvas = function () {
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;
    };


    /*
     * Renders the given L-System
     */
    DrawingCanvas.prototype.render = function (words, iterations, angle, dist) {

        console.log(iterations, angle, dist, words.length);

        var rad = 0;
        var c = null;
        var a = angle * Math.PI / 180;
        var px = window.innerWidth / 2;
        var py = window.innerHeight / 2;

        // background
        this.ctx.fillStyle = 'rgba(0, 51, 102, 1)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.moveTo(px, py);

        var len = words.length;
        for (var i = 0; i < len; i++) {

            var w = words[i];

            switch (w) {
                case 'R':
                case 'L': // edge rewriting
                case 'F':
                case 'X': // node rewriting
                case 'Y':
                    px = px + dist * Math.cos(rad);
                    py = py + dist * Math.sin(rad);
                    this.ctx.lineTo(px, py);
                    break;
                case 'f':
                    px = px + dist * Math.cos(rad);
                    py = py + dist * Math.sin(rad);
                    this.ctx.moveTo(px, py);
                    break;
                case '-':
                    rad += a;
                    break;
                case '+':
                    rad -= a;
                    break;
                case '[':
                    c = new Cursor(px, py, rad);
                    stack.push(c);
                    break;
                case ']':
                    c = stack.pop();
                    px = c.px;
                    py = c.py;
                    rad = c.rad;
                    this.ctx.moveTo(px, py);
                    break;
                default:
                    trace("unknown command: " + instr);

            }
        }

        this.ctx.stroke();

    };

    return DrawingCanvas;
});
