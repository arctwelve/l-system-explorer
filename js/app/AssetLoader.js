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
     * Appends a temporary offscreen iframe to the doc when the asset page is loaded. A style
     * node is also created in the head of the importing document to store styles from the
     *  asset page
     */
    AssetLoader.prototype.load = function (assetPage, assetID, container) {


        this.assetPage = assetPage;
        this.assetID = assetID;
        this.container = container;

        this.tempFrame = document.createElement('iframe');
        this.tempFrame.style.position = "absolute";
        this.tempFrame.style.left = "-2000px";

        this.styleElement = document.createElement('style');
        var headNode = document.querySelector("head");
        headNode.appendChild(this.styleElement);

        // append the dynamic iframe and load the asset page
        document.body.appendChild(this.tempFrame);
        this.tempFrame.src = this.assetPage;
        this.tempFrame.onload = this.postLoad.bind(this);
    }


    /*
     * After the external asset page is loaded, copy the style node to the parent doc and
     * clone and store the elements from the temp iframe. Then the temp iframe (and the asset
     * file inside it) can be removed
     */
    AssetLoader.prototype.postLoad = function() {

        var parent = this.tempFrame.parentElement;
        var iframeDoc = this.tempFrame.contentDocument || this.tempFrame.contentWindow.document;

        var iframeDocStyleNode = iframeDoc.querySelector("style");
        this.styleElement.appendChild(document.createTextNode(iframeDocStyleNode.textContent));

        var cloneElement = iframeDoc.getElementById(this.assetID).cloneNode(true);
        parent.removeChild(this.tempFrame);
        this.container.appendChild(cloneElement);
    }


    // return reference so the object can be instantiated after required as a module
    return AssetLoader;
});
