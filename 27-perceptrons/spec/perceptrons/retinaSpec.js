"use strict";

var describedClass = require("../../lib/perceptrons/retina");

describe("Retina", function () {
  var subject;

  beforeEach(function () {
    subject = new describedClass({ width: 4, height: 3 });
  });

  it("has getters for width and height", function () {
    expect(subject.width).toEqual(4);
    expect(subject.height).toEqual(3);
  });

  it("is light by default", function () {
    expect(subject.get({ x: 0, y: 0 })).toEqual(0);
    expect(subject.get({ x: 2, y: 2 })).toEqual(0);
  });

  it("allows you to set the darkness of a cell", function () {
    subject.set({ x: 0, y: 0, dark: 1 });
    expect(subject.get({ x: 0, y: 0 })).toEqual(1);

    subject.set({ x: 0, y: 0, dark: 0 });
    expect(subject.get({ x: 0, y: 0 })).toEqual(0);

    subject.set({ x: 0, y: 0, dark: 0.5 });
    expect(subject.get({ x: 0, y: 0 })).toEqual(0.5);
  });

  it("raises an error if the darkness is not in the range 0 to 1", function () {
    expect(function () {
      subject.set({ x: 0, y: 0, dark: -1 });
    }).toThrow();

    expect(function () {
      subject.set({ x: 0, y: 0, dark: 2 });
    }).toThrow();
  });

  it("raises an error when getting a cell that is out of bounds", function () {
    expect(function () {
      subject.get({ x: -1, y: 0 });
    }).toThrow();

    expect(function () {
      subject.get({ x: 5, y: 0 });
    }).toThrow();

    expect(function () {
      subject.get({ x: 0, y: -1 });
    }).toThrow();

    expect(function () {
      subject.get({ x: 0, y: 4 });
    }).toThrow();
  });

  it("raises an error when setting a cell that is out of bounds", function () {
    expect(function () {
      subject.set({ x: -1, y: 0, dark: 1 });
    }).toThrow();

    expect(function () {
      subject.set({ x: 5, y: 0, dark: 1 });
    }).toThrow();

    expect(function () {
      subject.set({ x: 0, y: -1, dark: 1 });
    }).toThrow();

    expect(function () {
      subject.set({ x: 0, y: 4, dark: 1 });
    }).toThrow();
  });
});
