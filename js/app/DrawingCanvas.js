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

        this.rad = 0;

        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.resizeCanvas();
    };


    DrawingCanvas.prototype.resizeCanvas = function () {
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;
    };



    /*
     *
     */
    DrawingCanvas.prototype.render = function (words, iterations, angle, dist) {

        var c = null;
        var py = 0;
        var px = 0;

        // background
        this.ctx.fillStyle = 'rgba(0, 51, 102, 0.02)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)';
        this.ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);

        var len = words.length;
        for (var i = 0; i < len; i++) {

            var w = words[i];

            switch (w) {
                // these should be default
                case 'R':
                case 'L': // edge rewriting
                case 'F':
                case 'X': // node rewriting
                case 'Y':
                    px = px + dist * Math.cos(this.rad);
                    py = py + dist * Math.sin(this.rad);
                    this.ctx.lineTo(px, py);
                    break;
                case 'f': //lowercase f
                    px = px + dist * Math.cos(this.rad);
                    py = py + dist * Math.sin(this.rad);
                    this.ctx.moveTo(px, py);
                    break;
                case '-':
                    this.rad += angle;
                    break;
                case '+':
                    this.rad -= angle;
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
                    sprite.graphics.moveTo(px, py);
                    break;
                default:
                    trace("unknown command: " + instr);

            }

            this.ctx.stroke();
            window.requestAnimationFrame(this.render.bind(this));
        }
    };

    return DrawingCanvas;
});

/*
private function renderInstruction (instr:String):void {

			var c:Cursor;

			switch(instr) {
                // these should be default
				case 'R' :
				case 'L' : // edge rewriting
				case 'F' :
                case 'X' : // node rewriting
                case 'Y' :
					px = px + d * Math.cos(rad);
					py = py + d * Math.sin(rad);
					sprite.graphics.lineTo(px, py);
					break;
				case 'S' : //lowercase f
					px = px + d * Math.cos(rad);
					py = py + d * Math.sin(rad);
					sprite.graphics.moveTo(px, py);
					break;
				case '-' :
					rad += a;
					break;
				case '+' :
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
					sprite.graphics.moveTo(px, py);
					break;
				default :
					trace("unknown command: " + instr);
			}
		}
	}

    */


/* DrawingCanvas.prototype.render = function (time) {

      this.ctx.fillStyle = 'rgba(0, 51, 102, 0.02)';
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

      this.ctx.beginPath();
      this.ctx.moveTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));
      this.ctx.lineTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));

      this.ctx.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      this.ctx.stroke();


      window.requestAnimationFrame(this.render.bind(this));
  };*/
