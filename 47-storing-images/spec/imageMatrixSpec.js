"use strict";

var DescribedClass = require("../lib/imageMatrix");

describe("ImageMatrix", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass(3, 4);
  });

  it("provides a getter and setter for each pixel", function () {
    subject.set(0, 0, true);
    subject.set(1, 1, false);

    expect(subject.get(0, 0)).toEqual(true);
    expect(subject.get(1, 1)).toEqual(false);
  });

  it("defaults pixels to false", function () {
    expect(subject.get(0, 0)).toEqual(false);
    expect(subject.get(1, 1)).toEqual(false);
  });

  it("provides getters for width and height", function () {
    expect(subject.width).toEqual(3);
    expect(subject.height).toEqual(4);
  });
});
