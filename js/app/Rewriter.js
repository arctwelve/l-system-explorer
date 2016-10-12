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


    var Rewriter = function (a) {

        this.axiom = a.split("");
        this.productions = {};
        this.words = this.axiom.slice();

    }


    /*
     * Fill production object with properties of each production added
     */
    Rewriter.prototype.addProduction = function (p) {

        var pa = p.split("->");
        this.productions[pa[0]] = pa[1];
    }


    /*
     *
     */
    Rewriter.prototype.derive = function (steps) {

        var start = Date.now();


        for (var i = 0; i < this.steps; i++) {

        }

        var end = Date.now();
        console.log("derive() took " + (end - start) + " ms");
    }


    /*
     * The words array is derived in full here, by rewritting the axiom using the productions. All
     * productions are applied in each step, in parallel (i.e., we don't iterate over the
     * replacements)
     */
    Rewriter.prototype.derive_slow = function (steps) {

        var start = Date.now();

        var targets = [];
        var replacements = [];
        this.splitProductions(targets, replacements);


        while (steps-- > 0) {
            var temp = [];
            for (var x = 0; x < this.words.length; x++) {
                var word = this.words[x];
                var idx = targets.indexOf(word);
                temp = temp.concat((idx > -1) ? replacements[idx] : word);
            }
            this.words = temp.slice();
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
