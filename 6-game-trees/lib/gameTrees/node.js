"use strict";

var Node = function (position) {
  var self = this;

  self.position = position;
  self.children = [];
  self.depth = 0;

  self.addChild = function (child) {
    self.children.push(child);

    child.parent = self;
    child.depth = self.depth + 1;
  };
};

module.exports = Node;
