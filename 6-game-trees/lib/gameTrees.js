"use strict";

var Game = require("./gameTrees/game");
var View = require("./gameTrees/view");

var HumanPlayer = require("./gameTrees/humanPlayer");
var ComputerPlayer = require("./gameTrees/computerPlayer");

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
        if (!game.finished()) {
          nextTurn();
        }
      }, 50);
    });
  };
};

module.exports = GameTrees;

if (typeof window !== "undefined") {
  window.Application = module.exports;
}
