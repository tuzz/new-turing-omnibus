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

  self.depth = function () {
    var node = self.leaves()[0];
    var depth = 0;

    while (node.parent) {
      depth += 1;
      node = node.parent;
    }

    return depth;
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
