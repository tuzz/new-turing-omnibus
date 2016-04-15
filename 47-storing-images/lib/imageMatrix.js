"use strict";

var ImageMatrix = function (width, height) {
  var self = this;
  var data = new Array(width);

  for (var x = 0; x < width; x += 1) {
    data[x] = new Array(height);

    for (var y = 0; y < height; y += 1) {
      data[x][y] = false;
    }
  }

  self.width = width;
  self.height = height;

  self.get = function (x, y) {
    return data[x][y];
  };

  self.set = function (x, y, bool) {
    data[x][y] = bool;
  }
};

module.exports = ImageMatrix;
