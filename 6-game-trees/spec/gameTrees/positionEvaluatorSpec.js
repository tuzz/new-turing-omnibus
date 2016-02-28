"use strict";

var DescribedClass = require("../../lib/gameTrees/positionEvaluator");
var Board = require("../../lib/gameTrees/board");

describe("PositionEvaluator", function () {
  var winningBoard, drawnBoard;

  beforeEach(function () {
    winningBoard = new Board([
      ["X", "X", "X"],
      ["O", "X", "O"],
      ["O", "X", "O"]
    ]);

    drawnBoard = new Board([
      ["X", "O", "X"],
      ["O", "O", "X"],
      ["X", "X", "O"]
    ]);
  });

  it("returns 1 if the player has won", function () {
    expect(DescribedClass.evaluate(winningBoard, "X")).toEqual(1);
  });

  it("returns -1 if the player has lost", function () {
    expect(DescribedClass.evaluate(winningBoard, "O")).toEqual(-1);
  });

  it("returns 0 if the player drew", function () {
    expect(DescribedClass.evaluate(drawnBoard, "X")).toEqual(0);
    expect(DescribedClass.evaluate(drawnBoard, "O")).toEqual(0);
  });

  it("recognises that the games have finished", function () {
    expect(DescribedClass.finished(winningBoard)).toEqual(true);
    expect(DescribedClass.finished(drawnBoard)).toEqual(true);
  });

  describe("when the game is unfinished", function () {
    var unfinishedBoard;

    beforeEach(function () {
      unfinishedBoard = new Board([
        ["X", "O", "X"],
        ["O", "_", "X"],
        ["O", "X", "O"]
      ]);
    });

    it("throws an error", function () {
      expect(function () {
        DescribedClass.evaluate(unfinishedBoard, "X");
      }).toThrow();
    });

    it("recognises that the game is unfinished", function () {
      expect(DescribedClass.finished(unfinishedBoard)).toEqual(false);
    });
  });

  describe("when the game is finished and there are squares remaining", function () {
    var finishedBoard;

    beforeEach(function () {
      finishedBoard = new Board([
        ["X", "O", "_"],
        ["X", "O", "_"],
        ["X", "_", "_"]
      ]);
    });

    it("recognises that the game is finished", function () {
      expect(DescribedClass.finished(finishedBoard)).toEqual(true);
    });

    it("biases the evaluation towards shorter wins", function () {
      expect(DescribedClass.evaluate(finishedBoard, "X")).toEqual(5);
    });

    it("biases the evaluation towards drawn-out loses", function () {
      expect(DescribedClass.evaluate(finishedBoard, "O")).toEqual(-5);
    });
  });
});
