
var elem;
var clone;



function cloneButton () {

    elem = document.getElementById("box-rect-1");
    clone = elem.cloneNode(true);

    elem.parentElement.appendChild(clone);

    clone.style.top = elem.style.top;
    clone.children[0].style.backgroundColor = "#ff0000";

    window.getComputedStyle(elem).top;

    clone.style.top = "200px";
}




function removeButton () {

    clone.style.top = "200px";

    clone.style.top = elem.style.top;

    clone.addEventListener('transitionend', function() {
        elem.parentElement.removeChild(clone)
    });

}
