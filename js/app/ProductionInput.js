/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 */
define(function () {

    "use strict";

    var ProductionInput = function (elementClassName) {

        this.maxSlots = 4;
        this.slotSpaceY = 46;

        this.numSlots = 1;
        this.isClickLock = false;
        this.btnClass = "prod-btn";
        this.className = elementClassName;

        this.element = document.getElementsByClassName(this.className)[0];
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.addInputSlot.bind(this));
    };


    /*
     * Event handler for "add" button clicks. Creates a clone input slot and appends it to the DOM.
     * The right-side button on the new clone slot is changed to a remove (-) button, visually and
     * functionally.
     */
    ProductionInput.prototype.addInputSlot = function (e) {

        if (e.target.tagName !== 'I' || this.numSlots >= this.maxSlots || this.isClickLock) return;

        this.isClickLock = true;

        var slots = document.getElementsByClassName(this.className);
        var lastSlot = slots[slots.length - 1];
        var slotClone = lastSlot.cloneNode(true);

        slotClone.firstElementChild.value = "";
        lastSlot.parentElement.appendChild(slotClone);
        this.setZIndexPositions(slots);

        var slotCloneY = parseInt(window.getComputedStyle(slotClone).top, 10);
        slotClone.style.top = slotCloneY + this.slotSpaceY + "px";

        var cloneButton = slotClone.getElementsByClassName(this.btnClass)[0];
        cloneButton.firstElementChild.innerHTML = "remove";

        slotClone.addEventListener('transitionend', (function () {
            this.isClickLock = false;
        }).bind(this));

        cloneButton.addEventListener("click", this.removeInputSlot.bind(this));
        this.numSlots++;
    };


    /*
     * Handler for the remove (-) button click. Removes the selected input slot and moves up any
     * siblings below it.
     */
    ProductionInput.prototype.removeInputSlot = function (e) {

        if (this.isClickLock) return;
        this.isClickLock = true;

        var targetBtn = e.target.parentElement;
        var slots = document.getElementsByClassName(this.className);
        var targetSlot = targetBtn.parentElement;

        if (targetBtn.className.indexOf(this.btnClass) === -1) {
            this.isClickLock = false;
            return;
        }

        // move up slots below the target
        var targetSlotIndex = this.getElementIndex(targetSlot);
        for (var j = targetSlotIndex; j < slots.length; j++) {
            var slot = slots[j];
            var slotY = parseInt(window.getComputedStyle(slot).top, 10);
            slot.style.top = (slotY - this.slotSpaceY) + "px";
        }

         // remove the target and unblock clicks after the animation
        targetSlot.addEventListener('transitionend', function () {
            if (this.parentElement) this.parentElement.removeChild(this);
            this.isClickLock = false;
        });

        this.setZIndexPositions(slots);
        this.numSlots--;
    };


    /*
     * Method retrieves the production data as an array of strings.
     */
    ProductionInput.prototype.getValues = function () {

        var values = [];
        var slots = document.getElementsByClassName(this.className);

        for (var i = 0; i < slots.length; i++) {
            var slotValue = slots[i].firstElementChild.value;
            if (slotValue !== "") values.push(slotValue);
        }

        if (values.length) this.hideOrphans();
        return values;
    };


    /*
     * Removes any empty slots when the productions are gathered as data. Replaces first slot
     * with any data from a slot below, so the fields have the most economy visually
     */
    ProductionInput.prototype.hideOrphans = function () {

        var slots = document.getElementsByClassName(this.className);

        var firstSlot = slots[0].firstElementChild;
        if (firstSlot.value === "") {
            for (var i = 1; i < slots.length; i++) {
                var currSlot = slots[i].firstElementChild;
                if (currSlot.value !== "") {
                    firstSlot.value = currSlot.value;
                    currSlot.value = "";
                    break;
                }
            }
        }
        this.intervalID = setInterval(this.clearEmptySlots.bind(this), 50);
    };


    /*
     * Does the actual removal of empty slots by triggering the click event. setInterval is used
     * for delay is between clicks for correct behavior
     */
    ProductionInput.prototype.clearEmptySlots = function () {

        var slots = document.getElementsByClassName(this.className);

        var isEmptySlots = false;
        for (var n = 1; n < slots.length; n++) {
            var slotValue = slots[n].firstElementChild.value;
            if (slotValue === "") {
                isEmptySlots = true;
                var cloneButton = slots[n].getElementsByClassName(this.btnClass)[0];
                cloneButton.firstElementChild.click();
            }
        }
        if (! isEmptySlots) clearInterval(this.intervalID);
    };


    /*
     * Helper method to get the index of an element within a group of ordered siblings
     */
    ProductionInput.prototype.getElementIndex = function (el) {
        for (var i = 0; el = el.previousElementSibling; i++); // jshint ignore:line
        return (i - 1);
    };


    /*
     * Helper method to set the z indices of the input slots. This causes a moving slot to
     * slide out, or slide in, from underneath the slot above it.
     */
    ProductionInput.prototype.setZIndexPositions = function (slotList) {
        for (var i = 0; i < slotList.length; i++) {
            if (slotList[i]) slotList[i].style.zIndex = (slotList.length - i).toString();
        }
    };


    return ProductionInput;
});
