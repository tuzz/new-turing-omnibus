"use strict";

var Retina = function (params) {
  var self = this;
  self.width = params.width;
  self.height = params.height;

  var grid = new Array(self.width);
  for (var x = 0; x < self.width; x += 1) {
    grid[x] = new Array(self.height);
    for (var y = 0; y < self.height; y += 1) {
      grid[x][y] = 0;
    }
  }

  self.set = function (params) {
    checkBounds(params);

    if (params.dark < 0 || params.dark > 1) {
      throw new Error("darkness must be between 0 and 1");
    }

    grid[params.x][params.y] = params.dark;
  };

  self.get = function (params) {
    checkBounds(params);

    return grid[params.x][params.y];
  };

  var checkBounds = function (params) {
    if (params.x < 0 || params.x >= self.width) {
      throw new Error("x is out of bounds");
    }

    if (params.y < 0 || params.y >= self.height) {
      throw new Error("y is out of bounds");
    }
  };
};

module.exports = Retina;
