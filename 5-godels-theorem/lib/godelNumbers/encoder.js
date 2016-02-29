"use strict";

var PrimeGenerator = require("./primeGenerator");
var Bignum = require("big.js");

var Encoder = function (table) {
  var self = this;

  self.encode = function (formula) {
    formula = removeSpaces(formula);

    var primes = PrimeGenerator.generate(formula.length);
    var primeTerms = [];
    var godelNumber = new Bignum(1);

    for (var i = 0; i < formula.length; i += 1) {
      var prime = primes[i];
      var symbol = formula.charAt(i);
      var codeNumber = table.codeNumber(symbol);

      primeTerms.push([prime, codeNumber]);

      var bigPrime = new Bignum(prime);
      var bigTerm = bigPrime.pow(codeNumber);

      godelNumber = godelNumber.times(bigTerm);
    }

    return {
      primeTerms: primeTerms,
      godelNumber: godelNumber
    };
  };

  var removeSpaces = function (formula) {
    return formula.replace(/ /g, "");
  };
};

module.exports = Encoder;
