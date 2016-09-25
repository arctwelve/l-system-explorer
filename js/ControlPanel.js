"use strict";


/*
 * Control panel object. Persists on the left side in open or
 * closed drawer state.
 */
var ControlPanel = function () {

    this.isOpen = true;

    this.panel = document.getElementById("control-panel")
    this.toggleTab = document.getElementById("control-panel-toggle-tab");

    this.toggleTab.addEventListener("click", this.toggleControls.bind(this));
}


/*
 * Event handler for the toggle tab click. Slides the panel
 * drawer in or out. Animation is handled by CSS.
 */
ControlPanel.prototype.toggleControls = function () {

    if (this.isOpen) {
        this.panel.style.left = "-400px";
        this.isOpen = false;
    } else {
        this.panel.style.left = "0px";
        this.isOpen = true;
    }
}

