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

    this.axiom = a;
    this.steps = 3;

    this.productions = [];
    this.targets = [];
    this.replacements = [];

    this.words = null;
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
 * The axiom is finally derived in full here, by rewritting the axiom using the productions. All
 * productions are applied in each step, in parallel
 */
Rewriter.prototype.derive = function (app) {

    var temp = "";
    var words = this.axiom = "L-R-L";
    var numProductions = this.splitProductions();

    var temp = "";

    for (var x = 0; x < words.length; x++) {

        var word = words.charAt(x);
        temp += getReplacementMatch(word)

    }
    console.log(temp);
    app.elemDiv.textContent = "";
}


Rewriter.prototype.getReplacementMatch = function () {

}

/*
 * pre store the targets and replacements of the productions so the splits aren't repeated.
 * Returns the number of productions
 */
Rewriter.prototype.splitProductions = function () {

    var len = this.productions.length;
    for (var i = 0; i < len; i++) {
        var p = this.productions[i].split("->");
        this.targets.push(p[0]);
        this.replacements.push(p[1]);
    }
    return len;
}

