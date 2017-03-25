/*
 * Drawing canvas object. Takes up entire window, including space underneath control panel. Object
 * wraps the html canvas -- the reference to it (this.obj) is grabbed in the constructor.
 */
define(function () {

    "use strict";

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
        //this.render();
    };


    DrawingCanvas.prototype.render = function (time) {

        this.ctx.fillStyle = 'rgba(0, 51, 102, 0.02)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

        this.ctx.beginPath();
        this.ctx.moveTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));
        this.ctx.lineTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));

        this.ctx.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this.ctx.stroke();


        window.requestAnimationFrame(this.render.bind(this));
    };


      DrawingCanvas.prototype.renderInstruction = function (instr) {

        this.ctx.fillStyle = 'rgba(0, 51, 102, 0.02)';
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

        this.ctx.beginPath();
        ///this.ctx.moveTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));
        this.ctx.lineTo(this.getRandInt(1, 2000), this.getRandInt(1, 2000));

        this.ctx.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this.ctx.stroke();


        var c:Cursor;

        switch(instr) {
            // these should be default
            case 'R' :
            case 'L' : // edge rewriting
            case 'F' :
            case 'X' : // node rewriting
            case 'Y' :
                px = px + d * Math.cos(this.rad);
                py = py + d * Math.sin(this.rad);
                this.ctx.lineTo(px, py);
                break;
            case 'f' : //lowercase f
                px = px + d * Math.cos(this.rad);
                py = py + d * Math.sin(this.rad);
                this.ctx.moveTo(px, py);
                break;
            case '-' :
                this.rad += a;
                break;
            case '+' :
                this.rad -= a;
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

        window.requestAnimationFrame(this.render.bind(this));
    };


    DrawingCanvas.prototype.getRandInt = function (min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };


    // return reference so the object can be instantiated after required as a module
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
