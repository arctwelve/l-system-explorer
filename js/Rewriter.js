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

    this.axiom = a.split("");
    this.steps = 3;

    this.productions = [];
    this.targets = [];
    this.replacements = [];
}


/*
 * Adds a single production that will be rewritten into tne axiom. There may be more than one
 * production. All the productions are rewritten into the axiom n number of iterations, determined
 * by number set in the setSteps(...) method.
 */
Rewriter.prototype.addProduction = function (p) {
    this.productions.push(p);
}


/*
 * The words array is derived in full here, by rewritting the axiom using the productions. All
 * productions are applied in each step, in parallel (i.e., we don't iterate over the replacements)
 */
Rewriter.prototype.derive = function () {

    this.splitProductions();

    while (this.steps-- > 0) {
        var words = [];
        for (var x = 0; x < this.axiom.length; x++) {
            var word = this.axiom[x];
            var idx = this.targets.indexOf(word);
            if (idx > -1) {
                var repStr = this.replacements[idx];
                for (var j = 0; j < repStr.length; j++) {
                    words.push(repStr.charAt(j));
                }
            } else {
                words.push(word);
            }
        }
        this.axiom = words.slice();
    }
}


/*
 * Split the productions into targets(left of ->) and replacements(right of ->)
 */
Rewriter.prototype.splitProductions = function () {
    for (var i = 0; i < this.productions.length; i++) {
        var p = this.productions[i].split("->");
        this.targets.push(p[0]);
        this.replacements.push(p[1]);
    }
}

