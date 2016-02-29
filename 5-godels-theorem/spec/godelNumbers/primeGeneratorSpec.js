"use strict";

var DescribedClass = require("../../lib/godelNumbers/primeGenerator");

describe("PrimeGenerator", function () {
  it("generates an array the first N primes", function () {
    var primes = DescribedClass.generate(10);
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  it("returns the next prime after the given number", function () {
    expect(DescribedClass.nextPrime(10)).toEqual(11);
    expect(DescribedClass.nextPrime(11)).toEqual(13);
    expect(DescribedClass.nextPrime(13)).toEqual(17);

    expect(DescribedClass.nextPrime(0)).toEqual(2);
  });
});
