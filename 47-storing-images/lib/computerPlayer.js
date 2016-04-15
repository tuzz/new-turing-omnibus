"use strict";

var PositionEvaluator = require("./positionEvaluator");
var MinimaxProcedure = require("./minimaxProcedure");
var QuadTree = require("./quadTree");

var ComputerPlayer = function (bool) {
  var self = this;

  self.playTurn = function (tree, callback) {
    evaluatePositions(tree);
    runMinimax(tree);

    setTimeout(function () {
      gust();

      setTimeout(function () {
        callback(bestPosition(tree));
      }, 1500);
    }, 500);
  };

  var evaluatePositions = function (tree) {
    var size = tree.size;
    var nodes = [tree.root];

    while (size > 2) {
      var childNodes = [];

      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        childNodes = childNodes.concat(node.children);
      }

      nodes = childNodes;
      size = size / 2;
    }

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var quadTree = new QuadTree(node);
      quadTree.size = 2;

      if (node.children.length !== 0) {
        node.score = PositionEvaluator.evaluate(quadTree, bool);
      }
    }
  };

  var runMinimax = function (tree) {
    MinimaxProcedure.run(tree);
  };

  var bestPosition = function (tree) {
    var root = tree.root;
    var children = root.children;
    var bestChild;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (typeof child.score === "undefined") {
        continue;
      }

      if (!bestChild || child.score > bestChild.score) {
        bestChild = child;
      }
    }

    updateDialog(children, bestChild);

    var bestTree = new QuadTree(bestChild);
    bestTree.size = tree.size / 2;
    return bestTree;
  };

  var updateDialog = function (children, bestChild) {
    var index = children.indexOf(bestChild);
    var quadrant = ["northEast", "northWest", "southWest", "southEast"][index];

    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "The wind blows you " + quadrant + ".";
  };

  var gust = function () {
    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "Uh oh, a sudden gust!";
  };
};

module.exports = ComputerPlayer;
