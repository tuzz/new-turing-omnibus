"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    var leaves = tree.leaves();
    climbTree(leaves, false);
  };

  var climbTree = function (nodes, maximise) {
    var uniqueParents = [];
    var trackedParent = {};

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

      if (!trackedParent[parent]) {
        uniqueParents.push(parent);
        trackedParent[parent] = true;
      }
    }

    climbTree(uniqueParents, !maximise);
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;
