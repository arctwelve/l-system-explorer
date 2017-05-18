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

        // background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

        this.a = 0;
        this.dist = 0;

        this.len = 0;
        this.wcount = 0;
        this.words = null;

        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
    };


    DrawingCanvas.prototype.resizeCanvas = function () {
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;
    };


    /*
     * Renders the given L-System in discrete steps instead of all at once. Angles are in radians.
     */
    DrawingCanvas.prototype.stepRender = function (words, config) {

        this.a = config.angle;
        this.dist = config.segLength;

        this.words = words;
        this.len = words.length;

        var px = config.startX;
        var py = config.startY;
        var rad = config.startAngle;

        var c = null;
        var stack = [];

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.stepAnimate(px, py, rad);
    };


    /*
     * The requestAnimationFrame loop function for stepRender(...)
     */
    DrawingCanvas.prototype.stepAnimate = function (px, py, rad) {

        var w = this.words[this.wcount];

        switch (w) {
            case 'R':
            case 'L': // edge rewriting
            case 'F':
            case 'X': // node rewriting
            case 'Y':
                this.ctx.beginPath();
                this.ctx.moveTo(px, py);
                px = px + this.dist * Math.cos(rad);
                py = py + this.dist * Math.sin(rad);
                this.ctx.lineTo(px, py);
                this.ctx.stroke();
                break;
            case 'f':
                px = px + this.dist * Math.cos(rad);
                py = py + this.dist * Math.sin(rad);
                this.ctx.moveTo(px, py);
                break;
            case '-':
                rad += this.a;
                break;
            case '+':
                rad -= this.a;
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
                console.log("unknown command: " + w);
        }

        if (++this.wcount >= this.len) return;
        window.requestAnimationFrame(this.stepAnimate.bind(this, px, py, rad));
    };


    /*
     * Renders the given L-System in a single step. Angles are in radians.
     */
    DrawingCanvas.prototype.render = function (words, config) {

        var a = config.angle;
        var dist = config.segLength;

        var px = config.startX;
        var py = config.startY;
        var rad = config.startAngle;

        var c = null;
        var stack = [];

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
                    console.log("unknown command: " + w);
            }
        }
        this.ctx.stroke();
    };

    return DrawingCanvas;
});
