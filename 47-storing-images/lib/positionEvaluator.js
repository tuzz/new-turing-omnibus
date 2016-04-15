"use strict";

var PositionEvaluator = function (quadTree, bool) {
  var self = this;

  self.evaluate = function () {
    if (!self.finished()) {
      throw new Error("I'm not smart enough to evaluate unfinished games");
    }

    if (won()) {
      return 1;
    } else if (lost()) {
      return -1;
    } else {
      return 0;
    }
  };

  var won = function () {
    return count(bool) > 2;
  };

  var lost = function () {
    return count(bool) < 2;
  };

  var drawn = function () {
    return count(bool) === 2;
  };

  var count = function () {
    var children = quadTree.root.children;

    if (children.length === 0) {
      throw new Error("Unable to evaluate childless nodes");
    }

    var count = 0;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (child.value === bool) {
        count += 1;
      }
    }

    return count;
  };

  self.finished = function () {
    return quadTree.size === 2;
  };
};

PositionEvaluator.evaluate = function (quadTree, bool) {
  return new PositionEvaluator(quadTree, bool).evaluate();
};

PositionEvaluator.finished = function (quadTree) {
  return new PositionEvaluator(quadTree).finished();
}

module.exports = PositionEvaluator;
