"use strict";

var DescribedClass = require("../lib/mandelbrotSet");

describe("MandelbrotSet", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass({
      realMin: -2, realMax: 1,
      imagMin: -1, imagMax: 1,
      width: 512, height: 512,
      iterations: 20
    });
  });

  it("computes the mandelbrot set", function () {
    expect(subject.isMember(0, 0)).toEqual(false);
    expect(subject.isMember(250, 250)).toEqual(true);
    expect(subject.isMember(100, 100)).toEqual(false);
    expect(subject.isMember(500, 250)).toEqual(false);
    expect(subject.isMember(350, 250)).toEqual(true);
  });

  it("can be produce an image matrix", function () {
    var imageMatrix = subject.toImageMatrix();

    expect(imageMatrix.get(0, 0)).toEqual(false);
    expect(imageMatrix.get(250, 250)).toEqual(true);
    expect(imageMatrix.get(100, 100)).toEqual(false);
    expect(imageMatrix.get(500, 250)).toEqual(false);
    expect(imageMatrix.get(350, 250)).toEqual(true);
  });
});
