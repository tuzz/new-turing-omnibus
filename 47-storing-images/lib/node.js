"use strict";

var Node = function (value) {
  var self = this;

  self.value = value;
  self.children = [];

  self.addChild = function (node) {
    self.children.push(node);
  };
};

module.exports = Node;
