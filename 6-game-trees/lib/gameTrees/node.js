"use strict";

var Node = function (position) {
  var self = this;

  self.position = position;
  self.children = [];

  self.addChild = function (child) {
    self.children.push(child);
    child.parent = self;
  };

  self.depth = function () {
    if (!self.parent) {
      return 0;
    } else {
      return self.parent.depth() + 1;
    }
  };
};

module.exports = Node;
