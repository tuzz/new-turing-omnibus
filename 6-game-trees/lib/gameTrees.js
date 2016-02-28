"use strict";

var Game = require("./gameTrees/game");
var View = require("./gameTrees/view");
var HumanPlayer = require("./gameTrees/humanPlayer");
var ComputerPlayer = require("./gameTrees/computerPlayer");
var PositionEvaluator = require("./gameTrees/positionEvaluator");

var GameTrees = function () {
  var self = this;
  var game, view;

  self.run = function () {
    var player1 = new HumanPlayer("X");
    var player2 = new ComputerPlayer("O");

    game = new Game(player1, player2);
    view = new View(game, player1.callback);

    view.update();
    nextTurn();
  };

  var nextTurn = function () {
    game.nextTurn(function () {
      view.update();

      setTimeout(function () {
        if (game.finished()) {
          displayWinner();
        } else {
          nextTurn();
        }
      }, 50);
    });
  };

  var displayWinner = function () {
    var result = PositionEvaluator.evaluate(game.board, "X");

    if (result > 0) {
      view.won();
    } else if (result === 0) {
      view.drew();
    } else if (result < 0) {
      view.lost();
    }
  };
};

module.exports = GameTrees;

if (typeof window !== "undefined") {
  window.Application = module.exports;
}
