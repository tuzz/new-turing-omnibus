"use strict";

var describedClass = require("../../lib/perceptrons/perceptron");
var Retina = require("../../lib/perceptrons/retina");

describe("Perceptron", function () {
  var retina, perceptron;

  beforeEach(function () {
    retina = new Retina({ width: 10, height: 10 });
    perceptron = new describedClass(
      retina, { x: 0, y: 0 }, { x: 5, y: 5 }
    );
  });

  it("provides getters for topLeft and bottomRight", function () {
    expect(perceptron.topLeft).toEqual({ x: 0, y: 0 });
    expect(perceptron.bottomRight).toEqual({ x: 5, y: 5 });
  });

  it("sets the transmission to 0 on non-rectangles", function () {
    retina.set({ x: 0, y: 0, dark: 1 });
    retina.set({ x: 1, y: 1, dark: 1 });

    perceptron.update();
    expect(perceptron.transmission).toEqual(0);
  });

  it("sets the transmission to 1 on disjoint rectangles", function () {
    retina.set({ x: 0, y: 0, dark: 1 });
    retina.set({ x: 1, y: 0, dark: 1 });

    perceptron.update();
    expect(perceptron.transmission).toEqual(1);
  });
});
