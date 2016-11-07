/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 *
 * TODO: Add animation when removing field
 *
 */
define(function () {

    "use strict";

    var MAX_FIELDS = 4;

    var ProductionInput = function (elementClassName) {

        this.fieldCount = 1;
        this.className = elementClassName;

        this.element = document.getElementsByClassName(this.className)[0];
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.cloneElement.bind(this));
    };


    /*
     * Event handler for "add" button clicks. Creates a cloned field and appends it to the DOM
     */
    ProductionInput.prototype.cloneElement = function(e) {

        if (e.target.tagName !== 'I' || this.fieldCount >= MAX_FIELDS) return;

        var clone = this.element.cloneNode(true);
        clone.getElementsByClassName("button-label")[0].innerHTML = "remove";
        clone.addEventListener("click", this.removeElement.bind(this));

        clone.position = this.fieldCount;
        this.element.parentElement.appendChild(clone);
        this.space = this.getVerticalSpacing();
        clone.style.top = this.space + "px";

        this.fieldCount++;
    };


    /*
     * Event handler for "remove" buttons - removes field from the DOM and decrements field count.
     * Also adjusts remaining fields: this wouldn't be necessary with relative positioning but
     * we'd lose the css animation.
     */
    ProductionInput.prototype.removeElement = function(e) {

        if (e.target.tagName !== 'I') return;

        var clone = e.target.parentElement.parentElement;
        var container = clone.parentElement;
        clone.style.top = this.top;

        clone.addEventListener('transitionend', function() {
            container.removeChild(clone);
        });

        this.fieldCount--;
    };


    /*
     * Helper method for enabling animation
     */
    ProductionInput.prototype.getVerticalSpacing = function() {
        this.top = window.getComputedStyle(this.element).top;
        var height = window.getComputedStyle(this.element).height;
        var result = parseInt(this.top, 10) + (parseInt(height, 10) * this.fieldCount);

        return result;
    };


    return ProductionInput;
});
