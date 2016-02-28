"use strict";

var PositionEvaluator = function (board, symbol) {
  var self = this;

  self.evaluate = function () {
    if (!self.finished()) {
      throw new Error("I'm not smart enough to evaluate unfinished games");
    }

    if (won(symbol)) {
      return 1 + squaresRemaining();
    } else if (lost(symbol)) {
      return -1 - squaresRemaining();
    } else {
      return 0;
    }
  };

  self.finished = function () {
    return won("X") || lost("X") || drawn("X");
  };

  var won = function (symbol) {
    return wonAnyRow(symbol) || wonAnyColumn(symbol) || wonAnyDiagonal(symbol);
  };

  var lost = function (symbol) {
    return won(otherSymbol(symbol));
  };

  var drawn = function () {
    return full() && !(won("X") || lost("X"))
  };

  var wonAnyRow = function (symbol) {
    return wonRow(0, symbol) || wonRow(1, symbol) || wonRow(2, symbol);
  };

  var wonAnyColumn = function (symbol) {
    return wonColumn(0, symbol) || wonColumn(1, symbol) || wonColumn(2, symbol);
  };

  var wonAnyDiagonal = function (symbol) {
    return wonSouthEast(symbol) || wonNorthEast(symbol);
  };

  var wonRow = function (y, symbol) {
    for (var x = 0; x < 3; x += 1) {
      if (board.get(x, y) !== symbol) {
        return false;
      }
    }

    return true;
  };

  var wonColumn = function (x, symbol) {
    for (var y = 0; y < 3; y += 1) {
      if (board.get(x, y) !== symbol) {
        return false;
      }
    }

    return true;
  };

  var wonSouthEast = function (symbol) {
    for (var i = 0; i < 3; i += 1) {
      if (board.get(i, i) !== symbol) {
        return false;
      }
    }

    return true;
  };

  var wonNorthEast = function (symbol) {
    for (var i = 0; i < 3; i += 1) {
      if (board.get(i, 2 - i) !== symbol) {
        return false;
      }
    }

    return true;
  };

  var otherSymbol = function (symbol) {
    return symbol === "X" ? "O" : "X";
  };

  var full = function () {
    return squaresRemaining() === 0;
  };

  var squaresRemaining = function () {
    var remaining = 0;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (board.get(x, y) === "_") {
          remaining += 1;
        }
      }
    }

    return remaining;
  };
};

PositionEvaluator.evaluate = function (board, symbol) {
  return new PositionEvaluator(board, symbol).evaluate();
};

PositionEvaluator.finished = function (board) {
  return new PositionEvaluator(board).finished();
};

module.exports = PositionEvaluator;
