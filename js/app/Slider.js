/*
 * A horizontal slider with output value field and label
 */
define(function () {

    "use strict";

    var Slider = function (elementID) {

        this.sliderOffsetX = 46;
        this.element = document.getElementById(elementID);
        this.elementBtn = this.element.getElementsByClassName("small-slider-knob")[0];
        this.elementBtn.addEventListener("mousedown", this.knobMouseDown.bind(this));
    };


    /*
     * Handler for mousedown on the slider knob (thumb). Document level event are nested inside
     * to keep their scope limited
     */
    Slider.prototype.knobMouseDown = function(e) {

        document.onmouseup = this.knobMouseUp.bind(this);
        document.onmousemove = this.knobMouseMove.bind(this);
        this.elementBtn.onmouseup = this.knobMouseUp.bind(this);

        this.elementBtn.ondragstart = function() {
            return false;
        };
    };


    Slider.prototype.knobMouseMove = function(e) {
        this.elementBtn.style.left = e.clientX - this.sliderOffsetX + 'px';
    };


    Slider.prototype.knobMouseUp = function(e) {
        document.onmousemove = null;
        this.elementBtn.onmouseup = null;
    };


    return Slider;
});

























/*
document.getElementById('ball2').onmousedown = function() {
  this.style.position = 'absolute'

  var self = this

  document.onmousemove = function(e) {
    e = e || event
    fixPageXY(e)

    self.style.left = e.pageX-25+'px'
    self.style.top = e.pageY-25+'px'
  }
  this.onmouseup = function() {
    document.onmousemove = null
  }
}

document.getElementById('ball2').ondragstart = function() { return false }
*/
