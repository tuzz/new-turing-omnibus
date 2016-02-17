"use strict";

var Node = function (position) {
  var self = this;

  self.position = position;
  self.children = [];

  self.addChild = function (child) {
    self.children.push(child);
    child.parent = self;
  };
};

module.exports = Node;
