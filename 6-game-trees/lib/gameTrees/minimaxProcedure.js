"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    var leaves = tree.leaves();
    var maximise = tree.depth() % 2 == 1;

    climbTree(leaves, maximise);
  };

  var climbTree = function (nodes, maximise) {
    var parents = [];

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var parent = node.parent;

      if (!parent) {
        return;
      } else if (!parent.value) {
        parent.value = node.value;
      } else if (maximise && node.value > parent.value) {
        parent.value = node.value;
      } else if (!maximise && node.value < parent.value) {
        parent.value = node.value;
      }

      if (parents.indexOf(parent) === -1) {
        parents.push(parent);
      }
    }

    climbTree(parents, !maximise);
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;
