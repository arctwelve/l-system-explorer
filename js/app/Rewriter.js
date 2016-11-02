"use strict";


/*
 * Rewriter class handles string rewrites of the L-System formal language. Using L-System grammar
 * rules, the results, or 'words', are returned as an array of steps.
 *
 * A single starting axiom is iterated by n number of steps. The axiom is replaced by the production
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
     * Derives the string of words, going through the productions and replacing the words in
     * each iteration. The words list begins with the axiom set in this object's constructor.
     * All production rewrites are applied in parallel, simultaneously replacing each matching
     * characters in a word.
     */
    Rewriter.prototype.derive = function (steps) {

        var temp = "";
        for (var i = 0; i < steps; i++) {

            for (var j = 0; j < this.words.length; j++) {
                var match = this.words.charAt(j);
                var successor = this.productions[match];
                temp += successor ? successor : match;
            }
            this.words = temp;
            temp = "";
        }
    }


    return Rewriter;
});
