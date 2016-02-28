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
