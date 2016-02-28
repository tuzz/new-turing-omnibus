(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./gameTrees/computerPlayer":3,"./gameTrees/game":4,"./gameTrees/humanPlayer":5,"./gameTrees/positionEvaluator":8,"./gameTrees/view":11}],2:[function(require,module,exports){
"use strict";

var Board = function (data) {
  var self = this;
  self.data = data;

  self.get = function (x, y) {
    return data[y][x];
  };

  self.set = function (x, y, symbol) {
    data[y][x] = symbol;
  };

  self.nextToPlay = function () {
    var noughts = 0;
    var crosses = 0;

    for (var y = 0; y < data.length; y += 1) {
      var row = data[y];

      for (var x = 0; x < row.length; x += 1) {
        var symbol = row[x];

        if (symbol === "O") {
          noughts += 1;
        } else if (symbol === "X") {
          crosses += 1;
        }
      }
    }

    return crosses <= noughts ? "X" : "O";
  };

  self.clone = function () {
    var clonedData = [];

    for (var y = 0; y < 3; y += 1) {
      var row = data[y];
      var clonedRow = row.slice(0);

      clonedData.push(clonedRow);
    }

    return new Board(clonedData);
  };

  self.equal = function (other) {
    var equal = true;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (self.get(x, y) !== other.get(x, y)) {
          equal = false;
        }
      }
    }

    return equal;
  }
};

module.exports = Board;

},{}],3:[function(require,module,exports){
"use strict";

var TreeGenerator = require("./treeGenerator");
var PositionEvaluator = require("./positionEvaluator");
var MinimaxProcedure = require("./minimaxProcedure");

var ComputerPlayer = function (symbol) {
  var self = this;
  var tree;

  self.playTurn = function (position, callback) {
    tree = generateTree(position);
    tree = evaluatePositions(tree);
    tree = runMinimax(tree);

    callback(bestPosition(tree));
  };

  var generateTree = function (position) {
    return TreeGenerator.generate(position);
  };

  var evaluatePositions = function (tree) {
    var leaves = tree.leaves();

    for (var i = 0; i < leaves.length; i += 1) {
      var leaf = leaves[i];
      var value = PositionEvaluator.evaluate(leaf.position, symbol);

      leaf.value = value;
    }

    return tree;
  };

  var runMinimax = function (tree) {
    MinimaxProcedure.run(tree);
    return tree;
  };

  var bestPosition = function (tree) {
    var root = tree.root;
    var children = root.children;
    var bestChild;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (!bestChild || child.value > bestChild.value) {
        bestChild = child;
      }
    }

    return bestChild.position;
  };
};

module.exports = ComputerPlayer;

},{"./minimaxProcedure":6,"./positionEvaluator":8,"./treeGenerator":10}],4:[function(require,module,exports){
"use strict";

var Board = require("./board");
var PositionEvaluator = require("./positionEvaluator");

var Game = function (player1, player2) {
  var self = this;

  self.currentPlayer = player1;

  self.board = new Board([
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
  ]);

  self.nextTurn = function (callback) {
    self.currentPlayer.playTurn(self.board, function (board) {
      self.board = board;

      if (self.currentPlayer === player1) {
        self.currentPlayer = player2;
      } else {
        self.currentPlayer = player1;
      }

      callback();
    });
  };

  self.finished = function () {
    return PositionEvaluator.finished(self.board);
  };
};

module.exports = Game;

},{"./board":2,"./positionEvaluator":8}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    minimax(tree.root);
  };

  var minimax = function (node) {
    if (typeof node.value !== "undefined") {
      return;
    }

    var maximise = node.depth() % 2 === 0;
    var children = node.children;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      minimax(child);

      if (typeof node.value === "undefined") {
        node.value = child.value;
      } else if (maximise && child.value > node.value) {
        node.value = child.value;
      } else if (!maximise && child.value < node.value) {
        node.value = child.value;
      }
    }
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;

},{}],7:[function(require,module,exports){
"use strict";

var Node = function (position) {
  var self = this;

  self.position = position;
  self.children = [];

  self.addChild = function (child) {
    self.children.push(child);
    child.parent = self;
  };

  self.depth = function () {
    if (!self.parent) {
      return 0;
    } else {
      return self.parent.depth() + 1;
    }
  };
};

module.exports = Node;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

var Tree = function (root) {
  var self = this;
  var memoizedLeaves;

  self.root = root;

  self.leaves = function () {
    if (!memoizedLeaves) {
      memoizedLeaves = calculateLeaves(root);
    }

    return memoizedLeaves;
  };

  var calculateLeaves = function (node) {
    if (node.children.length === 0) {
      return [node];
    }

    var flattenedLeaves = [];

    for (var i = 0; i < node.children.length; i += 1) {
      var child = node.children[i];
      var leaves = calculateLeaves(child);

      flattenedLeaves = flattenedLeaves.concat(leaves);
    }

    return flattenedLeaves;
  };
};

module.exports = Tree;

},{}],10:[function(require,module,exports){
"use strict";

var Tree = require("./tree");
var Node = require("./node");
var PositionEvaluator = require("./positionEvaluator");

var TreeGenerator = function () {
  var self = this;

  self.generate = function (board) {
    var root = generateNode(board);
    return new Tree(root);
  };

  var generateNode = function (board) {
    var node = new Node(board);

    var blanks = blankSquares(board);
    var symbol = board.nextToPlay(board);
    var boards = createBoards(board, blanks, symbol);

    for (var i = 0; i < boards.length; i += 1) {
      node.addChild(generateNode(boards[i]));
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
    if (gameOver(board)) {
      return [];
    }

    var boards = [];

    for (var i = 0; i < blanks.length; i += 1) {
      var blank = blanks[i];
      var newBoard = board.clone();

      newBoard.set(blank.x, blank.y, symbol);
      boards.push(newBoard);
    }

    return boards;
  };

  var gameOver = function (board) {
    return PositionEvaluator.finished(board);
  };
};

TreeGenerator.generate = function (board) {
  return new TreeGenerator().generate(board);
};

module.exports = TreeGenerator;

},{"./node":7,"./positionEvaluator":8,"./tree":9}],11:[function(require,module,exports){
"use strict";

var View = function (game, playerCallback) {
  var self = this;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var gridColor = "gray";

  self.update = function () {
    context.lineWidth = 10;

    drawGrid();
    drawNoughts();
    drawCrosses();

    canvas.onmousedown = touch;
  };

  self.won = function () {
    gridColor = "red";
    self.update();
  };

  self.lost = function () {
    gridColor = "blue";
    self.update();
  };

  self.drew = function () {
    gridColor = "black";
    self.update();
  };

  var drawGrid = function () {
    context.strokeStyle = gridColor;

    context.beginPath();
    context.moveTo(125, 0);
    context.lineTo(125, 380);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(255, 0);
    context.lineTo(255, 380);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, 125);
    context.lineTo(380, 125);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, 255);
    context.lineTo(380, 255);
    context.stroke();
    context.closePath();
  };

  var drawNoughts = function () {
    context.strokeStyle = "blue";
    var radius = 40;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (game.board.get(x, y) === "O") {
          context.beginPath();
          context.arc(center(x), center(y), radius, 0, 2 * Math.PI);
          context.stroke();
          context.closePath();
        }
      }
    }
  };

  var drawCrosses = function () {
    context.strokeStyle = "red";
    var radius = 40;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (game.board.get(x, y) === "X") {
          var xCenter = center(x);
          var yCenter = center(y);

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter - radius, yCenter - radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter - radius, yCenter + radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter + radius, yCenter - radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter + radius, yCenter + radius);
          context.stroke();
          context.closePath();
        }
      }
    }
  };

  var center = function (x) {
    if (x == 0) {
      return 60;
    } else if (x == 1) {
      return 190;
    } else {
      return 320;
    }
  };

  var touch = function (event) {
    var viewCoordinates = eventCoordinates(event);
    var boardCoordinates = convertCoordinates(viewCoordinates);

    playerCallback(boardCoordinates.x, boardCoordinates.y);
  };

  var eventCoordinates = function (event) {
    var x, y;

    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return { x: x, y: y };
  }

  var convertCoordinates = function (coordinates) {
    var viewX = coordinates.x;
    var viewY = coordinates.y;
    var boardX, boardY;

    if (viewX < 125) {
      boardX = 0;
    } else if (viewX < 255) {
      boardX = 1;
    } else {
      boardX = 2;
    }

    if (viewY < 125) {
      boardY = 0;
    } else if (viewY < 255) {
      boardY = 1;
    } else {
      boardY = 2;
    }

    return { x: boardX, y: boardY };
  };
};

module.exports = View;

},{}]},{},[1]);
