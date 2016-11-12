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
        this.openPosX = "-400px";

        this.panel = document.getElementById("control-panel");
        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControlPanel.bind(this));

        this.generateBtn = new PushButton("btn-generate", "GENERATE");
        this.generateBtn.addEventListener("click", function () {
            app.generate();
        });

        this.stepSwitch = new SlidingSwitch("step-switch");
        this.axiomField = document.getElementById("input-axiom");
        this.productionList = new ProductionInput("prod-input");
    };


    /*
     * Data model for the App by way of the controllers on the panel. This is actual real MVC for a
     * change. Model data Includes the axiom, 1 to 4, production fields, the step switch state and
     * more TBD
     */
    ControlPanel.prototype.getData = function () {
        var dataObj = {};
        dataObj.axiom = this.axiomField.value;
        dataObj.productions = this.getProductions();
        dataObj.isShowingSteps = this.stepSwitch.showSteps;

        return dataObj;
    };


    /*
     * Returns the value of the production fields as an array, errors and collapsing unused fields
     */
    ControlPanel.prototype.getProductions = function () {
        return this.productionList.getValues();
    };


    /*
     * Handler for the toggle tab click. Slides the panel drawer in / out. Animation is CSS
     */
    ControlPanel.prototype.toggleControlPanel = function () {

        if (this.isOpen) {
            this.panel.style.left = this.openPosX;
            this.isOpen = false;
        } else {
            this.panel.style.left = "0";
            this.isOpen = true;
        }
    };

    return ControlPanel;
});
