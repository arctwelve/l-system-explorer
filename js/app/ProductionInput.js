"use strict";


/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 *
 * TODO: Add animation when removing field
 *
 */
define(function () {


    var MAX_FIELDS = 4;


    var ProductionInput = function (elementClassName) {

        this.fieldCount = 1;
        this.element = document.getElementsByClassName(elementClassName)[0];

        this.initAnimation("fadeInDown");
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.cloneElement.bind(this));
    }


    /*
     * Event handler for "add" button clicks. Creates a cloned field and prepends it to the DOM
     */
    ProductionInput.prototype.cloneElement = function(e) {

        if (e.target.tagName !== 'I' || this.fieldCount >= MAX_FIELDS) return;

        this.enableAnimation();

        var clone = this.element.cloneNode(true);
        clone.getElementsByClassName("button-label")[0].innerHTML = "remove";
        clone.addEventListener("click", this.removeElement.bind(this));

        this.element.parentElement.appendChild(clone);
        this.fieldCount++
    }


    /*
     * Event handler for "remove" buttons - removes field from the DOM and decrements field count
     */
    ProductionInput.prototype.removeElement = function(e) {

        if (e.target.tagName !== 'I') return;

        var elem = e.target.parentElement.parentElement;
        elem.parentElement.removeChild(elem);
        this.fieldCount--;
    }


    /*
     * Helper method for initializing animation
     */
    ProductionInput.prototype.initAnimation = function(animationStyle) {
        this.element.className += " " + animationStyle;
    }


    /*
     * Helper method for enabling animation
     */
    ProductionInput.prototype.enableAnimation = function() {
        if (this.element.className.indexOf("animated") === -1) {
            this.element.className += " animated"
        }
    }


    return ProductionInput;
});
