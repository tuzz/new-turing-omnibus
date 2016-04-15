"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    minimax(tree.root, true);
  };

  var minimax = function (node, maximise) {
    if (typeof node.score !== "undefined") {
      return;
    }

    var children = node.children;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      minimax(child, !maximise);

      if (typeof node.score === "undefined") {
        node.score = child.score;
      } else if (maximise && child.score > node.score) {
        node.score = child.score;
      } else if (!maximise && child.score < node.score) {
        node.score = child.score;
      }
    }
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;
