"use strict";

var ImageMatrix = require("./imageMatrix");

var Composer = function () {
  var self = this;

  self.compose = function (quadTree) {
    return combine(quadTree.root, quadTree.size);
  };

  var combine = function (node, size) {
    var imageMatrix = new ImageMatrix(size, size);

    if (typeof node.value === "undefined") {
      var children = node.children;
      var regions = [];

      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        var region = combine(child, size / 2);

        regions.push(region);
      }

      var northEast = regions[0];
      var northWest = regions[1];
      var southWest = regions[2];
      var southEast = regions[3];

      addRegion(imageMatrix, northEast, size / 2, 0);
      addRegion(imageMatrix, northWest, 0, 0);
      addRegion(imageMatrix, southWest, 0, size / 2);
      addRegion(imageMatrix, southEast, size / 2, size / 2);
    } else {
      var color = node.value;

      for (var x = 0; x < size; x += 1) {
        for (var y = 0; y < size; y += 1) {
          imageMatrix.set(x, y, color);
        }
      }
    }

    return imageMatrix;
  };

  var addRegion = function (imageMatrix, region, xFrom, yFrom) {
    for (var x = 0; x < region.width; x += 1) {
      for (var y = 0; y < region.height; y += 1) {
        var color = region.get(x, y);
        imageMatrix.set(xFrom + x, yFrom + y, color);
      }
    }
  }
};

Composer.compose = function (quadTree) {
  return new Composer().compose(quadTree);
};

module.exports = Composer;
