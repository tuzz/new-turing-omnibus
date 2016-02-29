"use strict";

var DescribedClass = require("../../lib/godelNumbers/encoder");
var Table = require("../../lib/godelNumbers/table");
var Bignum = require("big.js");

describe("Encoder", function () {
  var subject, table;

  beforeEach(function () {
    table = new Table();

    table.addRow("0", 1);
    table.addRow("S", 2);
    table.addRow("+", 3);

    subject = new DescribedClass(table);
  });

  it("encodes formulas", function () {
    var result = subject.encode("S0+0+S");

    expect(result.primeTerms).toEqual([
      [2, 2], [3, 1], [5, 3], [7, 1], [11, 3], [13, 2]
    ]);

    var t1 = new Bignum(2).pow(2);
    var t2 = new Bignum(3).pow(1);
    var t3 = new Bignum(5).pow(3);
    var t4 = new Bignum(7).pow(1);
    var t5 = new Bignum(11).pow(3);
    var t6 = new Bignum(13).pow(2);

    expect(result.godelNumber.eq(
      t1.times(t2).times(t3).times(t4).times(t5).times(t6)
    )).toEqual(true);
  });

  it("ignores spaces", function () {
    var result = subject.encode(" S 0 + 0 + S ");

    expect(result.primeTerms).toEqual([
      [2, 2], [3, 1], [5, 3], [7, 1], [11, 3], [13, 2]
    ]);
  });
});
