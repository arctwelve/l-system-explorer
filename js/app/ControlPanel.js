/*
 * Control panel object. Persists on the left side in open or closed drawer state. Acts as parent
 * object to GUI components in the panel.
 */
define(function (require) {

    "use strict";

    var Slider = require('app/Slider');
    var Rewriter = require('app/Rewriter');
    var PushButton = require('app/PushButton');
    var Configuration = require('app/Configuration');
    var DecimalSlider = require('app/DecimalSlider');
    var ProductionInput = require('app/ProductionInput');


    var ControlPanel = function (app) {

        this.app = app;
        this.isOpen = false;
        this.openPosX = "-400px";

        this.panel = document.getElementById("control-panel");
        this.toggleTab = document.getElementById("control-panel-toggle-tab");
        this.toggleTab.addEventListener("click", this.toggleControlPanel.bind(this));

        this.axiomField = document.getElementById("input-axiom");
        this.productionList = new ProductionInput("prod-input");

        this.sliderIteration = new Slider("iteration-slider", "ITERATIONS", 1, 15);
        this.lengthSlider = new Slider("length-slider", "SEGMENT LENGTH", 1, 30);
        this.sliderAngle = new Slider("angle-slider", "SEGMENT ANGLE", 0, 180);
        this.sliderAngleDecimal = new DecimalSlider("angle-slider-decimal", this.sliderAngle);

        this.sliderStartX = new Slider("start-x-slider", "START X", 0, 1000);
        this.sliderStartY = new Slider("start-y-slider", "START Y", 0, 1000);
        this.sliderStartAngle = new Slider("start-angle-slider", "START ANGLE", 0, 360);

        this.testSetters();

        var playButton = new PushButton("play-btn", "img/btn-thin-down.png");
        playButton.addEventListener("click", this.playButtonClick.bind(this));
    };


    /*
     * Event handler when the playbutton has been clicked. Takes the settings and derives the
     * L-System words -- aka the string of instructions to draw the current system
     */
    ControlPanel.prototype.playButtonClick = function () {

        var dataObj = this.getData();
        var rewriter = new Rewriter(dataObj.axiom);

        for (var i = 0; i < dataObj.productions.length; i++) {
            rewriter.addProduction(dataObj.productions[i]);
        }

        rewriter.derive(this.sliderIteration.val);

        var config = new Configuration();
        config.setStart(this.sliderStartX.val, this.sliderStartY.val,this.sliderStartAngle.val);
        config.setAngle(this.sliderAngle.val, this.sliderAngleDecimal.val);
        config.iterations = this.sliderIteration.val;
        config.segLength = this.lengthSlider.val;

        //this.app.drawingCanvas.render(rewriter.words, config);
        this.app.drawingCanvas.stepRender(rewriter.words, config);
    };


    /*
     * Temp method to test setters. Setters will be used to read saved settings from a DB or some
     * other data store
     */
    ControlPanel.prototype.testSetters = function () {

        // test axiom setter
        this.axiomField.value = "-F";

        // test production setters
        this.productionList.setProduction("F->F+F-F-F+F");
        this.productionList.init();

        // test slider setters
        this.sliderIteration.val = 4;
        this.lengthSlider.val = 11;
        this.sliderAngle.val = 90;
        this.sliderAngleDecimal.val = 0;
        this.sliderStartX.val = 500;
        this.sliderStartY.val = 500;
        this.sliderStartAngle.val = 270;
    };


    /*
     * Gets the data model for the system by way of the controls on the panel. Model data includes
     * the axiom, 1 to 3 productions, the step switch state, number of iterations and other
     * configurations. More features like line color are TBD.
     */
    ControlPanel.prototype.getData = function () {
        var dataObj = {};
        dataObj.axiom = this.axiomField.value;
        dataObj.productions = this.productionList.getValues();
        dataObj.isShowingSteps = true; //this.stepSwitch.showSteps;

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


    return ControlPanel;
});
