"use strict";

var PrimeGenerator = function () {
  var self = this;

  self.generate = function (length) {
    var array = [];
    var n = 2;

    while (array.length < length) {
      if (prime(n)) {
        array.push(n);
      }

      n += 1;
    }

    return array;
  };

  self.nextPrime = function (n) {
    n += 1;

    while (true) {
      if (prime(n)) {
        return n;
      }

      n += 1
    }
  };

  var prime = function (n) {
    if (n < 2) {
      return false;
    }

    for (var i = 2; i < n; i += 1) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  };
};

PrimeGenerator.generate = function (length) {
  return new PrimeGenerator().generate(length);
};

PrimeGenerator.nextPrime = function (n) {
  return new PrimeGenerator().nextPrime(n);
}

module.exports = PrimeGenerator;
