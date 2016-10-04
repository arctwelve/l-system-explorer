"use strict";


/*
 * Main application object for the L-Systems Explorer.
 * Instantiated on window.onload
 */
var Application = function () {
    var controlPanel = new ControlPanel();
    var canvas = new DrawingCanvas();

    this.elemDiv = document.createElement('div');
    this.elemDiv.style.cssText = 'position:absolute;top:80px;left:35px;font-family:"Source Sans Pro";font-size:18px;color:white';
    document.body.appendChild(this.elemDiv);
    this.elemDiv.textContent = "";

    var rewriter = new Rewriter("R");
    rewriter.addProduction("L->R+L+R");
    rewriter.addProduction("R->L-R-L");
    rewriter.steps = 2;

    rewriter.derive(this);
}


window.onload = new Application();

/*
axiom: R
production: L->R+L+R
production: R->L-R-L

/*
R
L-R-L
R+L+R-L-R-L-R+L+R

R+L+R-L-R-L-R+L+R

*/


//R+L+R-L-R-L-R+L+R

//R+L+R-R-R+L+RL-L-R-L-L
