/*
 * An input field with an add or remove button at the end. Allows user to enter an l-system
 * production value. Handles it's own siblings, adding or removing them.
 */
define(function () {

    "use strict";

    var ProductionInput = function (elementClassName) {

        this.maxSlots = 4;
        this.slotSpaceY = 46;

        this.fieldCount = 1;
        this.isClickLock = false;
        this.className = elementClassName;

        this.element = document.getElementsByClassName(this.className)[0];
        this.elementBtn = this.element.getElementsByClassName("prod-btn")[0];
        this.elementBtn.addEventListener("click", this.cloneElement.bind(this));
    };


    /*
     *
     *
    function cloneButton () {

        if (isClickLock) return;
        isClickLock = true;

        var slots = document.getElementsByClassName("slot-rect");
        var lastSlot = slots[slots.length - 1]
        var slotClone = lastSlot.cloneNode(true);
        lastSlot.parentElement.appendChild(slotClone);

        slotClone.children[0].style.backgroundColor = "#ff0000";
        slotCloneY = parseInt(window.getComputedStyle(slotClone).top, 10);
        slotClone.style.top = slotCloneY + slotSpaceY + "px";

        slotClone.addEventListener("click", this.removeSlot);

        slotClone.addEventListener('transitionend', function() {
            isClickLock = false;
        });
    }

     */

    /*
     * Event handler for "add" button clicks. Creates a cloned field and appends it to the DOM
     */
    ProductionInput.prototype.cloneElement = function (e) {

        if (e.target.tagName !== 'I' || this.fieldCount >= this.maxSlots || this.isClickLock) return;

        this.isClickLock = true;

        var slots = document.getElementsByClassName("prod-input");
        var lastSlot = slots[slots.length - 1]
        var slotClone = lastSlot.cloneNode(true);
        lastSlot.parentElement.appendChild(slotClone);

        slotClone.getElementsByClassName("button-label")[0].innerHTML = "remove";
        var slotCloneY = parseInt(window.getComputedStyle(slotClone).top, 10);
        slotClone.style.top = slotCloneY + this.slotSpaceY + "px";

        slotClone.addEventListener("click", this.removeSlot);

        this.fieldCount++;

        slotClone.addEventListener('transitionend', (function() {
            this.isClickLock = false;
        }).bind(this));
    };



    ProductionInput.prototype.removeSlot = function (evt) {

        alert(evt);
        if (this.isClickLock) return;
        this.isClickLock = true;
/*
        var slots = document.getElementsByClassName("slot-rect");
        var targetSlot = evt.target.parentElement;
        if (targetSlot.className !== "slot-rect") {
            isClickLock = false;
            return;
        }

        var firstSlot = slots[0];
        var targetSlotIndex = getElementIndex(targetSlot);

        var firstSlotY = parseInt(window.getComputedStyle(firstSlot).top, 10);
        targetSlot.style.top = firstSlotY + "px";

        targetSlot.addEventListener('transitionend', function() {
            if (this.parentElement) this.parentElement.removeChild(this);
            isClickLock = false;
        });

        for (var j = targetSlotIndex; j < slots.length; j++) {

            var slot = slots[j];
            slot.children[0].style.backgroundColor = "#ff00ff";

            var slotY = parseInt(window.getComputedStyle(slot).top, 10);
            slot.style.top = (slotY - slotSpaceY) + "px";
        }*/
    }



    /*
     * Event handler for "remove" buttons - removes field from the DOM and decrements field count.
     * Also adjusts remaining fields: this wouldn't be necessary with relative positioning but
     * we'd lose the css animation.
     */
    ProductionInput.prototype.removeElement = function (e) {

        if (e.target.tagName !== 'I') return;

        var clone = e.target.parentElement.parentElement;
        var container = clone.parentElement;
        clone.style.top = this.top;

        clone.addEventListener('transitionend', function () {
            container.removeChild(clone);
        });

        this.fieldCount--;
    };


    /*
     * Helper method for enabling animation
     */
    ProductionInput.prototype.getVerticalSpacing = function () {
        this.top = window.getComputedStyle(this.element).top;
        var height = window.getComputedStyle(this.element).height;
        var result = parseInt(this.top, 10) + (parseInt(height, 10) * this.fieldCount);

        return result;
    };


    return ProductionInput;
});
