var slotSpaceY = 50;


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

    /*
     * All you have to do is
     * 1. Slide the target up to the first slot, then remove the target
     * 2. Slide up any siblings below the target up the size of a slot
     *
     * THE END
     *
     */
    var slots = document.getElementsByClassName("slot-rect");
    var targetSlot = evt.target.parentElement;

    var firstSlot = slots[0];
    var targetSlotIndex = getElementIndex(targetSlot);

    var firstSlotY = parseInt(window.getComputedStyle(firstSlot).top, 10);
    targetSlot.style.top = firstSlotY + "px";

    targetSlot.addEventListener('transitionend', function() {
        this.parentElement.removeChild(this);
    });

    for (var j = targetSlotIndex; j < slots.length; j++) {
        var slot = slots[j];
        slot.children[0].style.backgroundColor = "#ff00ff";
        var slotY = parseInt(window.getComputedStyle(slot).top, 10);
        var goalY = slotY - slotSpaceY;

        slot.style.top = goalY + "px";
    }
}


function getElementIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return (i - 1);
}



    /*

    for (var i = 0; i < slots.length; i++) {
        if (slots[i] === targetSlot) {
            slots[i]
        }
    }
    */


  /*
    var rembtn = evt.target.parentElement;
    var rembtnSib = rembtn.nextElementSibling;


    var btnContainer = rembtn.parentElement;
    var btnList = btnContainer.getElementsByClassName("box-rect-outer");


    rembtnSib.style.top = rembtn.style.top;
    var pork = 10;
    while (e = rembtn.nextSibling) {
        e.style.top = pork -= 10;
    }

    rembtn.style.top = elem.style.top;



    rembtn.addEventListener('transitionend', function() {
        //var i = Array.prototype.indexOf.call(btnList, this);
        //var m = this.nextSibling;
        elem.parentElement.removeChild(this);


    });*/
