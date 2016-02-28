"use strict";

var DescribedClass = require("../../lib/gameTrees/game");
var Board = require("../../lib/gameTrees/board");

describe("Game", function () {
  var subject, player1, player2;

  beforeEach(function () {
    player1 = { playTurn: function () {} };
    player2 = { playTurn: function () {} };

    subject = new DescribedClass(player1, player2);
  });

  it("exposes the board", function () {
    expect(subject.board.equal(new Board([
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]))).toEqual(true);
  });

  it("asks players to play turns alternately", function () {
    spyOn(player1, "playTurn");
    spyOn(player2, "playTurn");

    subject.nextTurn();
    expect(player2.playTurn).not.toHaveBeenCalled();
    player1.playTurn.calls.reset();
    player2.playTurn.calls.reset();

    subject.nextTurn();
    expect(player1.playTurn).not.toHaveBeenCalled();
    expect(player2.playTurn).toHaveBeenCalled();
    player1.playTurn.calls.reset();
    player2.playTurn.calls.reset();

    subject.nextTurn();
    expect(player1.playTurn).toHaveBeenCalled();
    expect(player2.playTurn).not.toHaveBeenCalled();
    player1.playTurn.calls.reset();
    player2.playTurn.calls.reset();
  });

  it("exposes the player whose turn it is", function () {
    expect(subject.currentPlayer).toEqual(player1);

    subject.nextTurn();
    expect(subject.currentPlayer).toEqual(player2);

    subject.nextTurn();
    expect(subject.currentPlayer).toEqual(player1);

    subject.nextTurn();
    expect(subject.currentPlayer).toEqual(player2);
  });

  it("replaces the board from the player taking their turn", function () {
    var board = new Board([
      ["X", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]);

    player1 = { playTurn: function () { return board; } };
    subject = new DescribedClass(player1, player2);

    subject.nextTurn();
    expect(subject.board).toEqual(board);
  });

  it("allows you to check if the game has finished", function () {
    expect(subject.finished()).toEqual(false);

    var board = new Board([
      ["X", "O", "_"],
      ["X", "O", "_"],
      ["X", "_", "_"]
    ]);

    player1 = { playTurn: function () { return board; } };
    subject = new DescribedClass(player1, player2);

    subject.nextTurn();
    expect(subject.finished()).toEqual(true);
  });
});
