var slotSpaceY = 50;
var clickLock = false;

function cloneButton () {

    var slots = document.getElementsByClassName("slot-rect");
    var lastSlot = slots[slots.length - 1]
    var slotClone = lastSlot.cloneNode(true);
    lastSlot.parentElement.appendChild(slotClone);

    slotClone.children[0].style.backgroundColor = "#ff0000";
    slotCloneY = parseInt(window.getComputedStyle(slotClone).top, 10);
    slotClone.style.top = slotCloneY + slotSpaceY + "px";

    slotClone.addEventListener("click", this.removeSlot);
}



function removeSlot (evt) {

    if (clickLock) return;
    clickLock = true;

    var slots = document.getElementsByClassName("slot-rect");
    var targetSlot = evt.target.parentElement;

    var firstSlot = slots[0];
    var targetSlotIndex = getElementIndex(targetSlot);

    var firstSlotY = parseInt(window.getComputedStyle(firstSlot).top, 10);
    targetSlot.style.top = firstSlotY + "px";

    targetSlot.addEventListener('transitionend', function() {
        if (this.parentElement) this.parentElement.removeChild(this);
    });

    for (var j = targetSlotIndex; j < slots.length; j++) {

        var slot = slots[j];
        slot.children[0].style.backgroundColor = "#ff00ff";

        var slotY = parseInt(window.getComputedStyle(slot).top, 10);
        slot.style.top = (slotY - slotSpaceY) + "px";
    }

    clickLock = false;
}


function getElementIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return (i - 1);
}



