"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    var leaves = tree.leaves();
    climbTree(leaves);
  };

  var climbTree = function (nodes) {
    var parents = [];

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var maximise = node.depth() % 2 === 1;
      var parent = node.parent;

      if (typeof parent === "undefined") {
        continue;
      } else if (typeof parent.value === "undefined") {
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

    if (parents.length !== 0) {
      climbTree(parents);
    }
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;
