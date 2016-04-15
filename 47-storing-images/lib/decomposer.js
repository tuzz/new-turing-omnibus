"use strict";

var ImageMatrix = require("./imageMatrix");
var QuadTree = require("./quadTree");
var Node = require("./node");

var Decomposer = function () {
  var self = this;

  self.decompose = function (imageMatrix) {
    var root = subdivide(imageMatrix);
    var quadTree = new QuadTree(root);

    quadTree.size = imageMatrix.width;
    return quadTree;
  };

  var subdivide = function (imageMatrix) {
    if (entirelyTrue(imageMatrix)) {
      return new Node(true);
    } else if (entirelyFalse(imageMatrix)) {
      return new Node(false);
    } else {
      var fullSize = imageMatrix.width;
      var halfSize = fullSize / 2;

      var northEast = quadrant(imageMatrix, halfSize, fullSize, 0, halfSize);
      var northWest = quadrant(imageMatrix, 0, halfSize, 0, halfSize);
      var southWest = quadrant(imageMatrix, 0, halfSize, halfSize, fullSize);
      var southEast = quadrant(imageMatrix, halfSize, fullSize, halfSize, fullSize);

      var node = new Node();

      node.addChild(subdivide(northEast));
      node.addChild(subdivide(northWest));
      node.addChild(subdivide(southWest));
      node.addChild(subdivide(southEast));

      return node;
    }
  }

  var entirelyTrue = function (imageMatrix) {
    return entirelyBool(imageMatrix, true);
  };

  var entirelyFalse = function (imageMatrix) {
    return entirelyBool(imageMatrix, false);
  };

  var entirelyBool = function (imageMatrix, bool) {
    for (var x = 0; x < imageMatrix.width; x += 1) {
      for (var y = 0; y < imageMatrix.height; y += 1) {
        var color = imageMatrix.get(x, y);

        if (color !== bool) {
          return false;
        }
      }
    }

    return true;
  };

  var quadrant = function (imageMatrix, xFrom, xTo, yFrom, yTo) {
    var size = xTo - xFrom;
    var quadrantMatrix = new ImageMatrix(size, size);

    for (var x = xFrom; x < xTo; x += 1) {
      for (var y = yFrom; y < yTo; y += 1) {
        var color = imageMatrix.get(x, y);
        quadrantMatrix.set(x - xFrom, y - yFrom, color);
      }
    }

    return quadrantMatrix;
  };
};

Decomposer.decompose = function (imageMatrix) {
  return new Decomposer().decompose(imageMatrix);
};

module.exports = Decomposer;
