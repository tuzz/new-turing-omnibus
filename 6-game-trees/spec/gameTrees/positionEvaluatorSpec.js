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

  describe("when the game is unfinished", function () {
    var unfinishedBoard;

    beforeEach(function () {
      unfinishedBoard = new Board([
        ["X", "X", "X"],
        ["O", "_", "O"],
        ["O", "X", "O"]
      ]);
    });

    it("throws an error", function () {
      expect(function () {
        DescribedClass.evaluate(unfinishedBoard, "X");
      }).toThrow();
    });
  });
});
