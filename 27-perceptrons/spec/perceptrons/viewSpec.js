/*jshint nonew: false */

"use strict";

var describedClass = require("../../lib/perceptrons/view");
var Retina = require("../../lib/perceptrons/retina");

describe("View", function () {
  var subject, retina;

  beforeEach(function () {
    retina = new Retina({ width: 2, height: 1 });
    subject = new describedClass({
      retina: retina,
      perceptrons: [],
      width: 4,
      height: 2
    });
  });

  it("throws an error if the view differs in aspect ratio", function () {
    expect(function () {
      new describedClass({ retina: retina, width: 9, height: 4 });
    }).toThrow();

    expect(function () {
      new describedClass({ retina: retina, width: 8, height: 3 });
    }).toThrow();
  });

  it("throws an error if the quotient is not an integer", function () {
    expect(function () {
      new describedClass({ retina: retina, width: 3, height: 1.5 });
    }).toThrow();
  });

  it("sets its data according to the retina", function () {
    retina.set({ x: 0, y: 0, dark: 1 });
    subject.update();
    expect(subject.data).toEqual([
      0, 0, 0, 255,
      0, 0, 0, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,

      0, 0, 0, 255,
      0, 0, 0, 255,
      255, 255, 255, 255,
      255, 255, 255, 255
    ]);

    retina.set({ x: 1, y: 0, dark: 1 });
    subject.update();
    expect(subject.data).toEqual([
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,

      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,
      0, 0, 0, 255
    ]);

    retina.set({ x: 0, y: 0, dark: 0 });
    subject.update();
    expect(subject.data).toEqual([
      255, 255, 255, 255,
      255, 255, 255, 255,
      0, 0, 0, 255,
      0, 0, 0, 255,

      255, 255, 255, 255,
      255, 255, 255, 255,
      0, 0, 0, 255,
      0, 0, 0, 255
    ]);
  });

  it("provides a mechanism to set a single cell", function () {
    subject.setCell(0, 0, { r: 123, g: 123, b: 123 });
    expect(subject.data).toEqual([
      123, 123, 123, 255,
      123, 123, 123, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,

      123, 123, 123, 255,
      123, 123, 123, 255,
      255, 255, 255, 255,
      255, 255, 255, 255
    ]);

    subject.setCell(1, 0, { r: 50, g: 50, b: 50 });
    expect(subject.data).toEqual([
      123, 123, 123, 255,
      123, 123, 123, 255,
      50, 50, 50, 255,
      50, 50, 50, 255,

      123, 123, 123, 255,
      123, 123, 123, 255,
      50, 50, 50, 255,
      50, 50, 50, 255
    ]);
  });

  it("provides a mechanism to set a single pixel", function () {
    subject.setPixel(0, 0, { r: 123, g: 123, b: 123 });
    expect(subject.data).toEqual([
      123, 123, 123, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,

      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 255, 255, 255
    ]);

    subject.setPixel(1, 1, { r: 50, g: 50, b: 50 });
    expect(subject.data).toEqual([
      123, 123, 123, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 255, 255, 255,

      255, 255, 255, 255,
      50, 50, 50, 255,
      255, 255, 255, 255,
      255, 255, 255, 255
    ]);
  });

  it("draws perceptron transmissions as green or red borders", function () {
    var perceptrons = [
      { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 }, transmission: 1 },
      { topLeft: { x: 1, y: 0 }, bottomRight: { x: 2, y: 1 }, transmission: 0 }
    ];

    var view = new describedClass({
      retina: retina,
      perceptrons: perceptrons,
      width: 8,
      height: 4
    });

    /*
       The view should look like this:

       ggggrrrr
       g  gr  r
       ggggrrrr

       key: g = green, r = red
    */

    expect(view.data).toEqual([
      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      255, 0, 0, 255, // red
      255, 0, 0, 255, // red
      255, 0, 0, 255, // red
      255, 0, 0, 255, // red

      0, 255, 0, 255, // green
      255, 255, 255, 255,
      255, 255, 255, 255,
      0, 255, 0, 255, // green
      255, 0, 0, 255, // red
      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 0, 0, 255, // red

      0, 255, 0, 255, // green
      255, 255, 255, 255,
      255, 255, 255, 255,
      0, 255, 0, 255, // green
      255, 0, 0, 255, // red
      255, 255, 255, 255,
      255, 255, 255, 255,
      255, 0, 0, 255, // red

      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      0, 255, 0, 255, // green
      255, 0, 0, 255, // red
      255, 0, 0, 255, // red
      255, 0, 0, 255, // red
      255, 0, 0, 255  // red
    ]);
  });
});
