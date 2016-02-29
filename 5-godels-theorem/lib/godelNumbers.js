"use strict";

var Table = require("./godelNumbers/table");
var Encoder = require("./godelNumbers/encoder");
var Decoder = require("./godelNumbers/decoder");
var Bignum = require("big.js");

// We want to see the whole number (no exponents).
Bignum.E_POS = 1000000;

var GodelNumbers = function () {
  var self = this;
  var encoder, decoder;

  self.run = function () {
    var table = new Table();

    table.addRow("0", 1);
    table.addRow("S", 2);
    table.addRow("+", 3);
    table.addRow("*", 4);
    table.addRow("=", 5);
    table.addRow("(", 6);
    table.addRow(")", 7);
    table.addRow(",", 8);
    table.addRow("x", 9);
    table.addRow("1", 10);
    table.addRow("~", 11);
    table.addRow("&", 12);
    table.addRow("E", 13);
    table.addRow("A", 14);
    table.addRow(">", 15);

    encoder = new Encoder(table);
    decoder = new Decoder(table);

    var encodeButton = document.getElementById("encode");
    var decodeButton = document.getElementById("decode");

    encodeButton.onmousedown = encode;
    decodeButton.onmousedown = decode;

    var encodeInput = document.getElementById("formula");
    encodeInput.onkeypress = function (event) {
      if (event.keyCode === 13) {
        encode();
      }
    };

    var decodeInput = document.getElementById("godelNumber");
    decodeInput.onkeypress = function (event) {
      if (event.keyCode === 13) {
        decode();
      }
    };
  };

  var encode = function () {
    handleErrors(function () {
      var formula = document.getElementById("formula").value;
      var result = encoder.encode(formula);
      var primeTerms = result.primeTerms;
      var termsString = primeTermsString(primeTerms);
      var godelNumberString = result.godelNumber.toString();
      var digits = "(" + godelNumberString.length + " digits)";

      document.getElementById("primeTerms").textContent = termsString;
      document.getElementById("godelNumber").value = godelNumberString;
      document.getElementById("digits").textContent = digits;
    });
  };

  var decode = function () {
    handleErrors(function () {
      var godelNumberString = document.getElementById("godelNumber").value;
      var godelNumber = Bignum(godelNumberString);
      var result = decoder.decode(godelNumber);
      var primeTerms = result.primeTerms;
      var termsString = primeTermsString(primeTerms);
      var formula = result.formula;

      document.getElementById("primeTerms").textContent = termsString;
      document.getElementById("formula").value = formula;
    });
  };

  var primeTermsString = function (primeTerms) {
    var primeTermsStrings = [];

    for (var i = 0; i < primeTerms.length; i += 1) {
      var term = primeTerms[i];
      primeTermsStrings.push(term[0] + "^" + term[1]);
    }

    return primeTermsStrings.join(" x ");
  };

  var handleErrors = function (callback) {
    var p = document.getElementsByClassName("error")[0];
    p.textContent = "";

    try {
      callback();
    } catch(error) {
      p.textContent = error;
    }
  }
};

module.exports = GodelNumbers;

if (typeof window !== "undefined") {
  window.Application = module.exports;
}
