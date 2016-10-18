"use strict";


/*
 * AssetLoader temporarily imports a single asset html page, allowing elements and styles from
 * the asset page to be cloned and written, respectively, to the loading page.
 */
define(function () {


    var AssetLoader = function () {
        this.assetPage = null;
    }


    /*
     * Appends a temporary iframe when the asset page is loaded. A style node is also created
     * in the head of the importing document.
     */
    AssetLoader.prototype.load = function (assetPage) {

        this.assetPage = assetPage;

        var assetFrame = document.createElement('iframe');
        assetFrame.style.position = "absolute";
        assetFrame.style.left = "-2000px";

        var styleElement = document.createElement('style');
        var headNode = document.querySelector("head");
        headNode.appendChild(styleElement);

        // append the dynamic iframe and load the asset page
        document.body.appendChild(assetFrame);
        assetFrame.src = this.assetPage;
        assetFrame.onload = this.postLoad;
    }


    AssetLoader.prototype.postLoad = function() {

        var parent = this.parentElement;
        var iframeDoc = this.contentDocument || this.contentWindow.document;

        // get css text of the style in the asset page and append to the parent page style
        var assetStyleElement = iframeDoc.querySelector("style");
        var assetStyleElementText = assetStyleElement.textContent;

        var styleElement = document.querySelector("style");
        styleElement.appendChild(document.createTextNode(assetStyleElementText));

        // clone the element from the imported assets page
        var cloneElement = iframeDoc.getElementById("dark-btn").cloneNode(true);

        // kill the temp iframe
        parent.removeChild(this);
        //parent.appendChild(cloneBtn);

        return cloneElement;
    }


    // return reference so the object can be instantiated after required as a module
    return AssetLoader;
});
