"use strict";


/*
 * Rewriter class handles string rewrites of the L-System formal language. Using L-System grammar
 * rules, the results or 'words'are returned as an array of steps.
 *
 * A single starting axiom is iterated by n number of steps. The axiom is replaced by the producton
 * grammars, simultaneously and in parallel. The result creates an array of words that represents
 * drawing rules which are passed to the graphics object.
 */
define(function () {


    var Rewriter = function (axiom) {
        this.productions = {};
        this.words = axiom;
    }


    /*
     * Fill production object with properties of each production added
     */
    Rewriter.prototype.addProduction = function (p) {

        var pa = p.split("->");
        this.productions[pa[0]] = pa[1];
    }


    /*
     * Derives the string of words, going through the productions and replacing the words in each
     * iteration. The words list begins with the axiom set in this object's constructor.
     */
    Rewriter.prototype.derive = function (steps) {

        var start = Date.now();

        for (var i = 0; i < steps; i++) {

            var temp = "";

            for (var j = 0; j < this.words.length; j++) {
                var match = this.words.charAt(j);
                var successor = this.productions[match];
                temp += successor ? successor: match;
            }
            this.words = temp;
        }

        var end = Date.now();
        console.log("derive() took " + (end - start) + " ms");
    }


    /*
     * Split the productions into targets(left of ->) and an array of replacements(right of ->)
     */
    Rewriter.prototype.splitProductions = function (t, r) {
        for (var i = 0; i < this.productions.length; i++) {
            var p = this.productions[i].split("->");
            t.push(p[0]);
            r.push(p[1].split(""));
        }
    }


    // return reference so the object can be instantiated after required as a module
    return Rewriter;
});
