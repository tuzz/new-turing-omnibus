"use strict";

var DescribedClass = require("../../lib/gameTrees/humanPlayer");
var Board = require("../../lib/gameTrees/board");

describe("HumanPlayer", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass("X");
  });

  it("defers turns to the provided callback", function (done) {
    subject.playTurn(new Board([
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]), function (result) {
      expect(result.equal(new Board([
        ["_", "_", "_"],
        ["_", "X", "_"],
        ["_", "_", "_"]
      ]))).toEqual(true);
      done();
    });

    setTimeout(function () {
      subject.callback(1, 1);
    }, 50);
  });

  it("only accepts moves for empty squares", function (done) {
    subject.playTurn(new Board([
      ["X", "_", "_"],
      ["_", "O", "_"],
      ["_", "_", "_"]
    ]), function (result) {
      expect(result.equal(new Board([
        ["X", "_", "_"],
        ["_", "O", "_"],
        ["_", "_", "X"]
      ]))).toEqual(true);
      done();
    });

    setTimeout(function () {
      subject.callback(1, 1);

      setTimeout(function () {
        subject.callback(-1, 0);

        setTimeout(function () {
          subject.callback(2, 2);
        }, 50);
      }, 50);
    }, 50);
  });

  it("does not allow more than one valid move", function (done) {
    var calls = 0;

    subject.playTurn(new Board([
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]), function (result) {
      calls += 1;
    });

    subject.callback(0, 0);
    subject.callback(1, 1);
    subject.callback(2, 2);

    setTimeout(function () {
      expect(calls).toEqual(1);
      done();
    }, 50);
  });
});
