"use strict";

var QuadTree = function (root) {
  var self = this;
  self.root = root;

  self.northEast = function () {
    return subtree(0);
  };

  self.northWest = function () {
    return subtree(1);
  }

  self.southWest = function () {
    return subtree(2);
  }

  self.southEast = function () {
    return subtree(3);
  }

  var subtree = function (childIndex) {
    var children = self.root.children;

    if (children.length === 0) {
      return;
    }

    var node = children[childIndex];
    var subtree = new QuadTree(node);
    subtree.size = self.size / 2;

    return subtree;
  };
};

module.exports = QuadTree;
