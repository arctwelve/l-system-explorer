"use strict";


var FPSUtility =  function () {
    this.fps = 0;
    this.lastTime = new Date().getMilliseconds();
}


FPSUtility.prototype.getFPS = function (time) {
    this.fps = 1000 / (time - this.lastTime);
    this.lastTime = time;

    return Math.floor(this.fps);
}
