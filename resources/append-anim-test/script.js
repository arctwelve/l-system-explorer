var slotSpaceY = 50;
var isClickLock = false;
var t;
var intervalID;

window.onload = function () {
    t = document.createTextNode("");
    document.body.appendChild(t);
    intervalID = window.setInterval(showState, 10);
}


function showState () {
    t.textContent = isClickLock;
}


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


function removeSlot (evt) {

    if (isClickLock) return;
    isClickLock = true;

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
    }
}


function getElementIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return (i - 1);
}
