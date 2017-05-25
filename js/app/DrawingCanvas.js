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

        this.setBackground(34, 33, 44, 1);
        this.setStrokeStyle(255, 255, 255, 1);

        this.reqID = null;
        this.isStep = false;

        this.a = 0;
        this.rad = 0;

        this.px = 0;
        this.py = 0;
        this.dist = 0;

        this.wlen = 0;
        this.widx = 0;
        this.words = null;
        this.cstack = [];

        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
    };


    /*
     * Renders the given L-System in a single step. Angles are in radians.
     */
    DrawingCanvas.prototype.renderAll = function (words, config) {

        this.initPath(false, words, config);
        for (var i = 0; i < this.wlen; i++) this.processWord(words[i]);
        this.ctx.stroke();
    };


    /*
     * Renders the given L-System in discrete steps instead of all at once. Angles are in radians.
     */
    DrawingCanvas.prototype.renderSteps = function (words, config) {

        this.initPath(true, words, config);
        this.stepAnimateLoop();
    };


    /*
     * The requestAnimationFrame loop function for stepRender(...)
     */
    DrawingCanvas.prototype.stepAnimateLoop = function () {

        this.processWord(this.words[this.widx]);
        if (++this.widx >= this.wlen) return;
        this.reqID = window.requestAnimationFrame(this.stepAnimateLoop.bind(this));
    };


    /*
     * Handles the actual rules for each case of a particular word
     */
    DrawingCanvas.prototype.processWord = function (w) {
        switch (w) {
            case 'R':
            case 'L': // edge rewriting
            case 'F':
            case 'X': // node rewriting
            case 'Y':
                if (this.isStep) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.px, this.py);
                }
                this.px = this.px + this.dist * Math.cos(this.rad);
                this.py = this.py + this.dist * Math.sin(this.rad);
                this.ctx.lineTo(this.px, this.py);
                if (this.isStep) this.ctx.stroke();
                break;
            case 'f':
                this.px = this.px + this.dist * Math.cos(this.rad);
                this.py = this.py + this.dist * Math.sin(this.rad);
                this.ctx.moveTo(this.px, this.py);
                break;
            case '-':
                this.rad += this.a;
                break;
            case '+':
                this.rad -= this.a;
                break;
            case '[':
                c = new Cursor(this.px, this.py, this.rad);
                stack.push(c);
                break;
            case ']':
                c = stack.pop();
                this.px = c.px;
                this.py = c.py;
                this.rad = c.rad;
                this.ctx.moveTo(this.px, this.py);
                break;
            default:
                console.log("unknown command: " + w);
        }
    };


    /*
     * Clears and initializes the path for both step and instant drawing
     */
    DrawingCanvas.prototype.initPath = function (isStep, words, config) {
        this.reset();
        this.isStep = isStep;
        this.configMembers(words, config);
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.moveTo(this.px, this.py);
    };


    /*
     * Clears any drawing, stops any iterative processses like requestAnimationFrame and resets
     * word array index
     */
    DrawingCanvas.prototype.reset = function () {
        window.cancelAnimationFrame(this.reqID);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
        this.widx = 0;
    };


    /*
     * Sets the background. Will erase any existing drawing.
     */
    DrawingCanvas.prototype.setBackground = function (r, g, b, a) {
        this.background = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        console.log(this.background);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    };


    /*
     * Sets the color and opacity of the path. Keeps the interface the same as setBackground(...)
     */
    DrawingCanvas.prototype.setStrokeStyle = function (r, g, b, a) {
        this.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    };


    /*
     * Resets the canvas on user resize
     */
    DrawingCanvas.prototype.resizeCanvas = function () {
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;

        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    };


    /*
     * Sets all class members from the passed words array and config object
     */
    DrawingCanvas.prototype.configMembers = function (words, config) {

        this.words = words;
        this.wlen = words.length;

        this.px = config.startX;
        this.py = config.startY;

        this.a = config.angle;
        this.dist = config.segLength;
        this.rad = config.startAngle;
    };

    return DrawingCanvas;
});
