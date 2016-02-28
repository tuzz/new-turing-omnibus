"use strict";

var HumanPlayer = function (symbol) {
  var self = this;
  var currentPosition, turnToPlay;

  self.callback = function (x, y) {
    if (!turnToPlay) {
      return;
    }

    if (currentPosition.get(x, y) !== "_") {
      return;
    }

    var newPosition = currentPosition.clone();
    newPosition.set(x, y, symbol);
    turnToPlay(newPosition);

    turnToPlay = undefined;
  };

  self.playTurn = function (position, callback) {
    currentPosition = position;
    turnToPlay = callback;
  };
};

module.exports = HumanPlayer;
