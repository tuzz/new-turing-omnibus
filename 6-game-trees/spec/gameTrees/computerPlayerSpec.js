"use strict";

var DescribedClass = require("../../lib/gameTrees/computerPlayer");
var Board = require("../../lib/gameTrees/board");

describe("ComputerPlayer", function () {
  var subject, result;

  describe("when the computer plays as X", function () {
    beforeEach(function () {
      subject = new DescribedClass("X");
    });

    it("plays winning moves correctly", function (done) {
      subject.playTurn(new Board([
        ["X", "O", "X"],
        ["O", "O", "X"],
        ["_", "_", "_"]
      ]), function (result) {
        expect(result.equal(new Board([
          ["X", "O", "X"],
          ["O", "O", "X"],
          ["_", "_", "X"]
        ]))).toEqual(true);
        done();
      });
    });

    it("blocks opponent wins correctly", function (done) {
      subject.playTurn(new Board([
        ["X", "O", "_"],
        ["_", "O", "_"],
        ["_", "_", "X"]
      ]), function (result) {
        expect(result.equal(new Board([
          ["X", "O", "_"],
          ["_", "O", "_"],
          ["_", "X", "X"]
        ]))).toEqual(true);
        done();
      });
    });

    it("prefers to win as quickly as possible", function (done) {
      subject.playTurn(new Board([
        ["X", "O", "O"],
        ["_", "X", "_"],
        ["_", "_", "_"]
      ]), function (result) {
        expect(result.equal(new Board([
          ["X", "O", "O"],
          ["_", "X", "_"],
          ["_", "_", "X"]
        ]))).toEqual(true);
        done();
      });
    });

    it("prefers to draw-out losses for as long as possible", function (done) {
      subject.playTurn(new Board([
        ["O", "X", "X"],
        ["_", "O", "_"],
        ["_", "_", "_"]
      ]), function (result) {
        expect(result.equal(new Board([
          ["O", "X", "X"],
          ["_", "O", "_"],
          ["_", "_", "X"]
        ]))).toEqual(true);
        done();
      });
    });
  });
});
