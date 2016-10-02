"use strict";


/*
 * Rewriter class handles string rewrites of the L-System formal language. Using L-System grammar
 * rules, the results or 'words'are returned as an array of steps.
 *
 * A single starting axiom is iterated by n number of steps. The axiom is replaced by the producton
 * grammars, simultaneously and in parallel. The result creates an array of words that represents
 * drawing rules which are passed to the graphics object.
 */
var Rewriter = function (a) {

    this.steps = 3;
    this.axiom = a.split("");

    this.productions = [];
    this.words = [];
}


/*
 * Sets the number of steps or interations that the axiom is rewritten
 * with the productions. The default is three.
 */
Rewriter.prototype.setSteps = function (s) {
    this.steps = s;
}


/*
 * Adds a single production that will be rewritten into tne axiom. There
 * may be more than one production. All the productions are rewritten into
 * the axiom n number of iterations, determined by number set in the
 * setSteps(...) method.
 */
Rewriter.prototype.addProduction = function (p) {
    this.productions.push = p;
}


/*
 * The axiom is finally derived in full here, by rewritting the axiom
 * using the productions.
 */
Rewriter.prototype.derive = function () {

    for (var i = 0; i < this.productions.length; i++) {

        // get the target and the replacement in the current production
        var p = this.productions.split("->");
        var target = p[0];
        var replacement = p[1];

    }
}
