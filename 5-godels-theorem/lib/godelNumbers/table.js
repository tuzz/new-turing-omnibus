"use strict";

var Table = function () {
  var self = this;

  var symbolsToCodeNumbers = {};
  var codeNumbersToSymbols = {};

  self.addRow = function (symbol, codeNumber) {
    symbolsToCodeNumbers[symbol] = codeNumber;
    codeNumbersToSymbols[codeNumber] = symbol;
  };

  self.codeNumber = function (symbol) {
    var codeNumber = symbolsToCodeNumbers[symbol];

    if (typeof codeNumber === "undefined") {
      throw new Error("No code number for symbol: " + symbol);
    } else {
      return codeNumber;
    }
  };

  self.symbol = function (codeNumber) {
    var symbol = codeNumbersToSymbols[codeNumber];

    if (typeof symbol === "undefined") {
      throw new Error("No symbol for code number: " + codeNumber);
    } else {
      return symbol;
    }
  };
};

module.exports = Table;
