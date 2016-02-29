"use strict";

var DescribedClass = require("../../lib/godelNumbers/table");

describe("Table", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass();
  });

  it("maps symbols to code numbers", function () {
    subject.addRow("0", 1);
    subject.addRow("S", 2);
    subject.addRow("+", 3);

    expect(subject.codeNumber("0")).toEqual(1);
    expect(subject.codeNumber("S")).toEqual(2);
    expect(subject.codeNumber("+")).toEqual(3);

    expect(subject.symbol(1)).toEqual("0");
    expect(subject.symbol(2)).toEqual("S");
    expect(subject.symbol(3)).toEqual("+");
  });

  it("throws an error if the row is missing", function () {
    expect(function () {
      subject.codeNumber("0");
    }).toThrow();

    expect(function () {
      subject.symbol(1);
    }).toThrow();
  });
});
