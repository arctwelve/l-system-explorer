/*
 * Object represents a message bubble for giving feedback to the user.
 */
define(function () {

    "use strict";


    var MessageBubble = function () {

        this.bubbleContainer = document.createElement("div");
        this.bubbleContainer.className = "bubble";
        this.bubbleContainer.innerHTML = "";
        document.body.appendChild(this.bubbleContainer);
    };


    MessageBubble.prototype.setMessage = function(posX, posY, msg, arrowDirection) {
        this.bubbleContainer.style.top = posY + "px";
        this.bubbleContainer.style.left = posX + "px";
        this.bubbleContainer.innerHTML =
                '<div class="triangle-border ' + arrowDirection + ' ">' + msg +'</div>';
    };


    return MessageBubble;
});


/*
<p class="triangle-border">This only needs one HTML element.</p>
<p class="triangle-border top">For example, <code>&lt;p&gt;[text]&lt;/p&gt;</code>.</p>
<p class="triangle-border left">But it could be any element you want.</p>
<p class="triangle-border right">The entire appearance is created only with CSS.</p>
*/


/*
<div class="bubble">
    <div class="triangle-border">This only needs one HTML element.</div>
</div>
*/
