"use strict";

var PrimeGenerator = require("./primeGenerator");
var Bignum = require("big.js");

var Decoder = function (table) {
  var self = this;

  self.decode = function (godelNumber) {
    var zero = new Bignum(0);
    var one = new Bignum(1);

    var prime = PrimeGenerator.nextPrime(0);
    var terms = [];
    var atLeastOnePrime = false;

    while (!godelNumber.eq(one)) {
      if (godelNumber.mod(prime).eq(zero)) {
        godelNumber = godelNumber.div(prime);
        terms.push(prime);
        atLeastOnePrime = true;
      } else {
        if (!atLeastOnePrime) {
          var message = "Invalid Gödel number: The " + prime + " term is missing";
          throw new Error(message);
        }
        atLeastOnePrime = false;

        prime = PrimeGenerator.nextPrime(prime);
      }
    }

    var primeTerms = group(terms);
    var formula = "";

    for (var i = 0; i < primeTerms.length; i += 1) {
      var term = primeTerms[i];
      var codeNumber = term[1];

      formula += table.symbol(codeNumber);
    }

    return {
      primeTerms: primeTerms,
      formula: formula
    }
  };

  var group = function (array) {
    var groupedArray = [];
    var lastElement;

    for (var i = 0; i < array.length; i += 1) {
      var element = array[i];

      if (typeof lastElement === "undefined" || element != lastElement) {
        groupedArray.push([element, 1]);
      } else {
        var lastGroup = groupedArray.pop();
        lastGroup[1] += 1;
        groupedArray.push(lastGroup);
      }

      lastElement = element;
    }

    return groupedArray;
  };
};

module.exports = Decoder;
