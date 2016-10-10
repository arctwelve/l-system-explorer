"use strict";


/*
 * Control panel object. Persists on the left side in open or closed drawer state.
 */
define(function () {


    var ControlPanel = function () {

        this.isOpen = true;

        this.panel = document.getElementById("control-panel");
        this.loadAssets("assets.html");

        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControls.bind(this));
    }


    /*
     * Event handler for the toggle tab click. Slides the panel drawer in / out. Animation is CSS.
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


    /*
     * Dynamically writes a hidden iframe to the document
     */
    ControlPanel.prototype.loadAssets = function (assetSrc) {

        var assetFrame = document.createElement('iframe');
        assetFrame.id = "asset-container"
        this.panel.appendChild(assetFrame);
        assetFrame.src = assetSrc;

        assetFrame.style.position = 'absolute';
        assetFrame.style.left = "500px";
        assetFrame.style.top = "100px";

        var xx = document.getElementById('asset-container').contentWindow.document.getElementById('generate-btn')
        //var innerDoc = assetFrame.contentDocument || assetFrame.contentWindow.document;
        //var dkbutton = innerDoc.getElementById("generate-btn");
        console.log(xx);
        //this.panel.adoptNode(this.darkButton);
        ///this.darkButton.style.left = "100px";
    }


    // return reference so the object can be instantiated after required as a module
    return ControlPanel;
});
