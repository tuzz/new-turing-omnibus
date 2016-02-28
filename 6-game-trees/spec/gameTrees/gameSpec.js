"use strict";

var DescribedClass = require("../../lib/gameTrees/game");
var Board = require("../../lib/gameTrees/board");

describe("Game", function () {
  var subject, player1, player2, p1Board, p2Board;

  beforeEach(function () {
    p1Board = new Board([
      ["X", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]);

    p2Board = new Board([
      ["O", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]);

    player1 = {
      playTurn: function (board, callback) {
        setTimeout(function () {
          callback(p1Board);
        }, 50);
      }
    };

    player2 = {
      playTurn: function (board, callback) {
        setTimeout(function () {
          callback(p2Board);
        }, 50);
      }
    };

    subject = new DescribedClass(player1, player2);
  });

  it("exposes the board", function () {
    expect(subject.board.equal(new Board([
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"]
    ]))).toEqual(true);
  });

  it("asks players to play turns alternately", function (done) {
    subject.nextTurn(function () {
      expect(subject.board.equal(p1Board));

      subject.nextTurn(function () {
        expect(subject.board.equal(p2Board));

        subject.nextTurn(function () {
          expect(subject.board.equal(p1Board));

          done();
        });
      });
    });
  });

  it("exposes the player whose turn it is", function (done) {
    expect(subject.currentPlayer).toEqual(player1);

    subject.nextTurn(function () {
      expect(subject.currentPlayer).toEqual(player2);

      subject.nextTurn(function () {
        expect(subject.currentPlayer).toEqual(player1);

        subject.nextTurn(function () {
          expect(subject.currentPlayer).toEqual(player2);

          done();
        });
      });
    });
  });

  it("allows you to check if the game has finished", function (done) {
    expect(subject.finished()).toEqual(false);

    p1Board = new Board([
      ["X", "O", "_"],
      ["X", "O", "_"],
      ["X", "_", "_"]
    ]);

    subject.nextTurn(function () {
      expect(subject.finished()).toEqual(true);
      done();
    });
  });
});
