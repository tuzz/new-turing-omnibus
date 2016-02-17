"use strict";

var Node = require("./node");

var TreeGenerator = function () {
  var self = this;

  self.generate = function (board) {
    var node = new Node(board);

    var blanks = blankSquares(board);
    var symbol = board.nextToPlay(board);
    var boards = createBoards(board, blanks, symbol);

    for (var i = 0; i < boards.length; i += 1) {
      node.addChild(self.generate(boards[i]));
    }

    return node;
  };

  var blankSquares = function (board) {
    var blanks = [];

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        var symbol = board.get(x, y);

        if (symbol === "_") {
          blanks.push({ x: x, y: y });
        }
      }
    }

    return blanks;
  };

  var createBoards = function (board, blanks, symbol) {
    var boards = [];

    for (var i = 0; i < blanks.length; i += 1) {
      var blank = blanks[i];
      var newBoard = board.clone();

      newBoard.set(blank.x, blank.y, symbol);
      boards.push(newBoard);
    }

    return boards;
  };
};

TreeGenerator.generate = function (board) {
  return new TreeGenerator().generate(board);
};

module.exports = TreeGenerator;
