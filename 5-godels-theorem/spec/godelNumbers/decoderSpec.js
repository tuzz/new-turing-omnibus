"use strict";

var DescribedClass = require("../../lib/godelNumbers/decoder");
var Table = require("../../lib/godelNumbers/table");
var Bignum = require("big.js");

describe("Decoder", function () {
  var subject, table;

  beforeEach(function () {
    table = new Table();

    table.addRow("0", 1);
    table.addRow("S", 2);
    table.addRow("+", 3);

    subject = new DescribedClass(table);
  });

  it("decodes godel numbers", function () {
    var t1 = new Bignum(2).pow(2);
    var t2 = new Bignum(3).pow(1);
    var t3 = new Bignum(5).pow(3);
    var t4 = new Bignum(7).pow(1);
    var t5 = new Bignum(11).pow(3);
    var t6 = new Bignum(13).pow(2);
    var godelNumber = t1.times(t2).times(t3).times(t4).times(t5).times(t6);

    var result = subject.decode(godelNumber);

    expect(result.primeTerms).toEqual([
      [2, 2], [3, 1], [5, 3], [7, 1], [11, 3], [13, 2]
    ]);

    expect(result.formula).toEqual("S0+0+S");
  });
});
