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
        this.className = elementClassName;

        this.element = document.getElementsByClassName(this.className)[0];
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.cloneInputSlot.bind(this));
    };


    /*
     * Event handler for "add" button clicks. Creates a clone input slot and appends it to the DOM.
     * The right-side button on the new clone slot is changed to a remove button, visually and
     * functionally.
     */
    ProductionInput.prototype.cloneInputSlot = function (e) {

        if (e.target.tagName !== 'I' || this.numSlots >= this.maxSlots || this.isClickLock) return;

        this.isClickLock = true;

        var slots = document.getElementsByClassName(this.className);
        var lastSlot = slots[slots.length - 1];
        var slotClone = lastSlot.cloneNode(true);
        lastSlot.parentElement.appendChild(slotClone);

        var slotCloneY = parseInt(window.getComputedStyle(slotClone).top, 10);
        slotClone.style.top = slotCloneY + this.slotSpaceY + "px";

        var cloneButton = slotClone.getElementsByClassName("prod-btn")[0];
        cloneButton.firstElementChild.innerHTML = "remove";

        slotClone.addEventListener('transitionend', (function() {
            this.isClickLock = false;
        }).bind(this));

        cloneButton.addEventListener("click", this.removeInputSlot.bind(this));
        this.numSlots++;
    };


    /*
     * Removes the selected input slot and moves up any siblings below it
     */
    ProductionInput.prototype.removeInputSlot = function (e) {

        if (this.isClickLock) return;
        this.isClickLock = true;

        var targetBtn = e.target.parentElement;
        var slots = document.getElementsByClassName(this.className);

        if (targetBtn.className.indexOf("prod-btn") === -1) {
            this.isClickLock = false;
            return;
        }

        // move the target to the location of the first slot, before it's removed
        var firstSlot = slots[0];
        var targetSlot = targetBtn.parentElement;
        var firstSlotY = parseInt(window.getComputedStyle(firstSlot).top, 10);
        targetSlot.style.top = firstSlotY + "px";

        // after the transition animation is complete, remove the target and unblock clicks
        targetSlot.addEventListener('transitionend', function() {
            if (this.parentElement) this.parentElement.removeChild(this);
            this.isClickLock = false;
        });

        // move up slots below the target
        var targetSlotIndex = this.getElementIndex(targetSlot);
        for (var j = targetSlotIndex; j < slots.length; j++) {
            var slot = slots[j];
            var slotY = parseInt(window.getComputedStyle(slot).top, 10);
            slot.style.top = (slotY - this.slotSpaceY) + "px";
        }

        // fix z indices
        for (var i = 0; i < slots.length; i++) {
            if (slots[i]) slots[i].style.zIndex = (slots.length - i).toString();
        }

        this.numSlots--;
    };


    /*
     * Helper method to get the index of an element within a group of ordered siblings
     */
    ProductionInput.prototype.getElementIndex = function(el) {
        for (var i = 0; el = el.previousElementSibling; i++);  // jshint ignore:line
        return (i - 1);
    };


    return ProductionInput;
});
