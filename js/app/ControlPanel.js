/*
 * Control panel object. Persists on the left side in open or closed drawer state.
 */
define(function (require) {

    "use strict";

    var PushButton = require('app/PushButton');
    var SlidingSwitch = require('app/SlidingSwitch');
    var ProductionInput = require('app/ProductionInput');


    var ControlPanel = function (app) {

        this.isOpen = true;
        this.panel = document.getElementById("control-panel");
        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControlPanel.bind(this));

        this.generateBtn = new PushButton("btn-generate", "GENERATE");
        this.generateBtn.addEventListener("click", function () {
            app.generate();
        });

        this.pinput = new ProductionInput("prod-input");
        this.axiomField = document.getElementById("input-axiom");
        this.stepSwitch = new SlidingSwitch("step-switch");
    };


    /*
     * Getter and setter for the axiom value
     */
    Object.defineProperty(ControlPanel.prototype, 'axiom', {
        get: function () {
            return this.axiomField.value;
        },
        set: function (val) {
            this.axiomField.value = val;
        }
    });


    /*
     * Retrieves the data from the control panel. That includes the axiom,
     * 1 to 4 production fields, the step switch state and any other data
     * represented by the choices of the user in the control panel
     */
    ControlPanel.prototype.getData = function () {
        var dataObj = {};
        dataObj.axiom = this.axiom;

        return dataObj;
    };


    /*
     * Handler for the toggle tab click. Slides the panel drawer in / out. Animation is CSS
     */
    ControlPanel.prototype.toggleControlPanel = function () {

        if (this.isOpen) {
            this.panel.style.left = "-400px";
            this.isOpen = false;
        } else {
            this.panel.style.left = "0";
            this.isOpen = true;
        }
    };

    return ControlPanel;
});
