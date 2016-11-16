/*
 * Object represents a message bubble for giving feedback to the user.
 */
define(function () {

    "use strict";


    var MessageBubble = function () {

        var bubbleContainer = document.createElement("div");
        bubbleContainer.innerHTML = "";
        document.body.appendChild(bubbleContainer);
    };


    MessageBubble.prototype.setMessage = function(msg, arrowDirection) {
        return '<p class="triangle-border left">' + msg +'</p>';
    }


    return MessageBubble;
});


/*
<p class="triangle-border">This only needs one HTML element.</p>
<p class="triangle-border top">For example, <code>&lt;p&gt;[text]&lt;/p&gt;</code>.</p>
<p class="triangle-border left">But it could be any element you want.</p>
<p class="triangle-border right">The entire appearance is created only with CSS.</p>
*/
