"use strict";

var Node = function (value) {
  var self = this;

  self.value = value;
  self.children = [];

  self.addChild = function (child) {
    self.children.push(child);
    child.parent = self;
  };
};

module.exports = Node;
