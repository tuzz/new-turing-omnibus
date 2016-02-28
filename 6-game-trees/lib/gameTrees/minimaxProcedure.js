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
