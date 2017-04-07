/*
 * Control panel object. Persists on the left side in open or closed drawer state. Acts as parent
 * object to GUI components in the panel.
 */
define(function (require) {

    "use strict";

    var Slider = require('app/Slider');
    var Rewriter = require('app/Rewriter');
    var PushButton = require('app/PushButton');
    var DecimalSlider = require('app/DecimalSlider');
    var ProductionInput = require('app/ProductionInput');


    var ControlPanel = function (app) {

        this.isOpen = false;
        this.openPosX = "-400px";

        this.panel = document.getElementById("control-panel");
        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControlPanel.bind(this));

        this.axiomField = document.getElementById("input-axiom");
        this.productionList = new ProductionInput("prod-input");

        this.sliderIteration = new Slider("iteration-slider", "ITERATIONS", 1, 20);
        this.lengthSlider = new Slider("length-slider", "SEGMENT LENGTH", 1, 100);
        this.sliderAngle = new Slider("angle-slider", "SEGMENT ANGLE", 0, 180);
        this.sliderAngleDecimal = new DecimalSlider("angle-slider-decimal", this.sliderAngle);

        this.sliderStartX = new Slider("start-x-slider", "START X", 0, 500);
        this.sliderStartY = new Slider("start-y-slider", "START Y", 0, 500);
        this.sliderStartAngle = new Slider("start-angle-slider", "START ANGLE", 0, 360);

        // temp settings
        this.axiomField.value = "F-F-F-F";
        this.productionList.numProds = 3
        this.productionList.setProduction("F->F-F+F-F-F");
        this.productionList.setProduction("F->F-F");
        this.productionList.setProduction("F->F-FG");

        this.sliderIteration.val = 4;
        this.lengthSlider.val = 5;
        this.sliderAngle.val = 90;
        this.sliderAngleDecimal.val = 0;
        this.sliderStartX.val = 500;
        this.sliderStartY.val = 500;
        this.sliderStartAngle.val = 0;

        var playButton = new PushButton("play-btn", "img/btn-thin-down.png");
        playButton.addEventListener("click", this.render.bind(this));

    };


    /*
     * Data model for the App by way of the controls on the panel. Model data Includes the
     * axiom, 1 to 4, production fields, the step switch state and more TBD
     */
    ControlPanel.prototype.getData = function () {
        var dataObj = {};
        dataObj.axiom = this.axiomField.value;
        dataObj.productions = this.productionList.getValues();
        dataObj.isShowingSteps = true;//this.stepSwitch.showSteps;

        return dataObj;
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


    ControlPanel.prototype.render = function () {
        var dataObj = this.getData();
        var r = new Rewriter(dataObj.axiom);
        r.addProduction(dataObj.productions[0]); // need to iterate here

        r.derive(this.sliderIteration.val);
        console.log(r.words);

    };

    return ControlPanel;
});
