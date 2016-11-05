/*
 * Control panel object. Persists on the left side in open or closed drawer state.
 */
define(function (require) {

    "use strict";

    var PushButton = require('app/PushButton');
    var ToggleButton = require('app/ToggleButton');
    var ProductionInput = require('app/ProductionInput');


    var ControlPanel = function (app) {

        this.isOpen = true;
        this.panel = document.getElementById("control-panel");

        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControlPanel.bind(this));

        this.axiomField = document.getElementById("input-axiom");
        this.prodInput = new ProductionInput("prod-input");

        this.generateBtn = new PushButton("btn-generate", "GENERATE");
        this.generateBtn.addEventListener("click", function() {
            app.generate();
        });

        this.stepToggleButton = new ToggleButton("step-toggle-button");
    };


    /*
     * Getters and setters
     */
    ControlPanel.prototype = {
        get axiom() {
            return this.axiomField.value;
        },
        set axiom(val) {
            this.axiomField.value = val;
        }
    };


    /*
     * Handler for the toggle tab click. Slides the panel drawer in / out. Animation is CSS
     */
    ControlPanel.prototype.toggleControlPanel = function () {

        if (this.isOpen) {
            this.panel.style.left = "-400px";
            this.isOpen = false;
        } else {
            this.panel.style.left = "0px";
            this.isOpen = true;
        }
    };


    return ControlPanel;
});
