"use strict";

var DescribedClass = require("../../lib/gameTrees/board");

describe("Board", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass([
      ["X", "O", "X"],
      ["O", "_", "X"],
      ["_", "X", "O"]
    ]);
  });

  describe("get", function () {
    it("returns the symbol at position x, y from top-left", function () {
      expect(subject.get(0, 0)).toEqual("X");
      expect(subject.get(0, 1)).toEqual("O");
      expect(subject.get(0, 2)).toEqual("_");
      expect(subject.get(1, 0)).toEqual("O");
      expect(subject.get(1, 1)).toEqual("_");
      expect(subject.get(1, 2)).toEqual("X");
      expect(subject.get(2, 0)).toEqual("X");
      expect(subject.get(2, 1)).toEqual("X");
      expect(subject.get(2, 2)).toEqual("O");
    });
  });

  describe("set", function () {
    it("sets the symbol at position x, y from top-left", function () {
      subject.set(0, 0, "O");
      subject.set(1, 2, "_");

      expect(subject.get(0, 0)).toEqual("O");
      expect(subject.get(1, 2)).toEqual("_");
    });
  });

  describe("nextToPlay", function () {
    it("returns the symbol of the next turn to be made", function () {
      expect(subject.nextToPlay()).toEqual("O");

      var blankBoard = new DescribedClass([
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
      ]);

      expect(blankBoard.nextToPlay()).toEqual("X");

      var equalBoard = new DescribedClass([
        ["_", "X", "_"],
        ["_", "O", "_"],
        ["_", "_", "_"]
      ]);

      expect(equalBoard.nextToPlay()).toEqual("X");
    });
  });

  describe("clone", function () {
    it("creates a clone of the board", function () {
      var clone = subject.clone();

      expect(clone.get(0, 0)).toEqual(subject.get(0, 0));
      expect(clone.get(0, 1)).toEqual(subject.get(0, 1));
      expect(clone.get(0, 2)).toEqual(subject.get(0, 2));
      expect(clone.get(1, 0)).toEqual(subject.get(1, 0));
      expect(clone.get(1, 1)).toEqual(subject.get(1, 1));
      expect(clone.get(1, 2)).toEqual(subject.get(1, 2));
      expect(clone.get(2, 0)).toEqual(subject.get(2, 0));
      expect(clone.get(2, 1)).toEqual(subject.get(2, 1));
      expect(clone.get(2, 2)).toEqual(subject.get(2, 2));

      clone.set(0, 0, "O");

      expect(clone.get(0, 0)).toEqual("O");
      expect(subject.get(0, 0)).toEqual("X");
    });
  });

  describe("equal", function () {
    it("returns true if the boards match", function () {
      var matchingBoard = new DescribedClass([
        ["X", "O", "X"],
        ["O", "_", "X"],
        ["_", "X", "O"]
      ]);

      expect(subject.equal(matchingBoard)).toEqual(true);
    });

    it("returns false if the boards differ", function () {
      var differentBoard = new DescribedClass([
        ["X", "O", "X"],
        ["O", "_", "_"],
        ["_", "X", "O"]
      ]);

      expect(subject.equal(differentBoard)).toEqual(false);
    });
  });
});
