"use strict";

var PositionEvaluator = require("./positionEvaluator");

var Game = function (quadTree, player1, player2) {
  var self = this;

  self.quadTree = quadTree;
  self.currentPlayer = player1;

  self.nextTurn = function (callback) {
    self.currentPlayer.playTurn(self.quadTree, function (quadTree) {
      self.quadTree = quadTree;

      if (self.currentPlayer === player1) {
        self.currentPlayer = player2;
      } else {
        self.currentPlayer = player1;
      }

      callback();
    });
  };

  self.finished = function () {
    return PositionEvaluator.finished(self.quadTree);
  };
};

module.exports = Game;
