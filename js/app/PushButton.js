"use strict";


/*
 * Object represents a push button. It doesn't have an on/off toggle state
 */
define(function (require) {


    var AssetLoader = require('app/AssetLoader');


    var PushButton = function (template, container) {
        this.domElement = null;
        var assetLoader = new AssetLoader("dark-btn", "darkbuttonA");
        assetLoader.addEventListener('pickety', function () {
            alert("pectorual");
        })

    }


    return PushButton;
});
