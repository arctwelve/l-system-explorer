"use strict";


/*
 * TemplateLoader temporarily imports a single template html page, allowing elements and styles
 * from the template page to be cloned and written, respectively, to the loading page.
 */
define(function () {

    var TEMPLATES = "/templates/";


    var TemplateLoader = function (templateName, elementID) {
        this.templatePage = TEMPLATES + templateName + ".html";
        this.templateClass = "." + templateName;

        this.elementID = elementID;
        this.createLoaderFrame();
    }


    /*
     * Appends a temporary offscreen iframe to the doc when the template page is loaded. A style
     * node is also created in the head of the importing document to store styles from the
     * template page
     */
    TemplateLoader.prototype.createLoaderFrame = function () {

        this.tempFrame = document.createElement('iframe');
        this.tempFrame.style.position = "absolute";
        this.tempFrame.style.left = "-2000px";

        this.styleElement = document.createElement('style');
        var headNode = document.querySelector("head");
        headNode.appendChild(this.styleElement);

        // append the dynamic iframe and load the template page
        document.body.appendChild(this.tempFrame);
        this.tempFrame.src = this.templatePage;
        this.tempFrame.onload = this.loadTemplate.bind(this);
    }


    /*
     * After the external template page is loaded, copy the style node to the parent doc and
     * clone and store the elements from the temp iframe. Then the temp iframe (and the template
     * file inside it) can be removed
     */
    TemplateLoader.prototype.loadTemplate = function() {

        var parent = this.tempFrame.parentElement;
        var iframeDoc = this.tempFrame.contentDocument || this.tempFrame.contentWindow.document;

        var iframeDocStyleNode = iframeDoc.querySelector("style");
        this.styleElement.appendChild(document.createTextNode(iframeDocStyleNode.textContent));

        var cloneElement = iframeDoc.querySelector(this.templateClass).cloneNode(true);
        parent.removeChild(this.tempFrame);

        // throw event
    }


    return TemplateLoader;
});
