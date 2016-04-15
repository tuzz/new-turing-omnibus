"use strict";

var MandelbrotSet = require("./mandelbrotSet");
var Decomposer = require("./decomposer");
var View = require("./view");
var QuadTree = require("./quadTree");
var Game = require("./game");
var HumanPlayer = require("./humanPlayer");
var ComputerPlayer = require("./computerPlayer");
var PositionEvaluator = require("./positionEvaluator");

var Application = function () {
  var self = this;
  var game, view;

  self.run = function () {
    var mandelbrotSet = new MandelbrotSet({
      realMin: -1.2 - Math.random(),
      realMax: 0.2 + Math.random(),
      imagMin: -0.7 - Math.random(),
      imagMax: 0.7 + Math.random(),
      width: 512,
      height: 512,
      iterations: Math.round(Math.random() * 35) + 15
    });

    var imageMatrix = mandelbrotSet.toImageMatrix();
    var quadTree = Decomposer.decompose(imageMatrix);
    var player1 = new HumanPlayer(false);
    var player2 = new ComputerPlayer(false);

    game = new Game(quadTree, player1, player2);
    view = new View("canvas", player1.callback);

    view.setQuadTree(quadTree);
    view.render();

    nextTurn();
  };

  var nextTurn = function () {
    game.nextTurn(function () {
      view.setQuadTree(game.quadTree);
      view.render();

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
    var evaluation = PositionEvaluator.evaluate(game.quadTree, true);

    if (evaluation > 0) {
      view.won();
    } else if (evaluation < 0) {
      view.lost();
    } else {
      view.drew();
    }
  };
};

module.exports = Application;

if (typeof window !== "undefined") {
  window.Application = Application;
}
