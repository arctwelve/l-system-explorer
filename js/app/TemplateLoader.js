"use strict";


/*
 * TemplateLoader temporarily imports a single template html page, allowing elements and styles
 * from the template page to be cloned and written, respectively, to the loading page.
 */
define(function () {


    var TEMPLATE_DIR = "/templates/";
    var TEMPLATE_EXT = ".html";
    var TEMPLATE_PRF = ".";


    var TemplateLoader = function (container, templateName, callbackFunction) {

        this.nameReferences(templateName);

        this.container = container;
        this.callback = callbackFunction;

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
        this.tempFrame.src = this.template;
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

        var domElement = iframeDoc.querySelector(this.templateClass).cloneNode(true);
        parent.removeChild(this.tempFrame);
        this.container.appendChild(domElement);

        this.callback(domElement);
    }


    /*
     * Sets automatic names for file and class references
     */
    TemplateLoader.prototype.nameReferences = function(templateName) {
        this.template = TEMPLATE_DIR + templateName + TEMPLATE_EXT;
        this.templateClass = TEMPLATE_PRF + templateName;

    }

    return TemplateLoader;
});
