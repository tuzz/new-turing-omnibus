"use strict";

var _ = require("underscore");

var View = function (params) {
  var self = this;
  var retina = params.retina;
  var width = params.width;
  var height = params.height;
  var perceptrons = params.perceptrons;
  var cellSize = width / retina.width;

  if (height / retina.height !== cellSize) {
    throw new Error("The view and retina aspect ratio must match");
  }

  if (cellSize % 1 !== 0) {
    throw new Error("The ratio of view to retina must be an integer");
  }

  self.data = new Array(width * height * 4);

  self.update = function () {
    for (var y = 0; y < retina.height; y += 1) {
      for (var x = 0; x < retina.width; x += 1) {
        var darkness = retina.get({ x: x, y: y });

        var color;
        if (darkness === 1) {
          color = { r: 0, g: 0, b: 0 };
        }
        else {
          color = { r: 255, g: 255, b: 255 };
        }

        self.setCell(x, y, color);
      }
    }

    setBorders();
  };

  self.setCell = function (x, y, color) {
    var xOffset = x * cellSize;
    var yOffset = y * cellSize;

    for (var i = 0; i < cellSize; i += 1) {
      for (var j = 0; j < cellSize; j += 1) {
        self.setPixel(xOffset + i, yOffset + j, color);
      }
    }
  };

  self.setPixel = function (x, y, color) {
    if (x < 0 || x >= width || y < 0 || y > height) {
      throw new Error("Out of bounds (" + x + ", " + y + ")");
    }

    self.data[(y * width + x) * 4 + 0] = color.r;
    self.data[(y * width + x) * 4 + 1] = color.g;
    self.data[(y * width + x) * 4 + 2] = color.b;
    self.data[(y * width + x) * 4 + 3] = 255;
  };

  var setBorders = function () {
    _.each(perceptrons, function (perceptron) {
      var color;
      if (perceptron.transmission === 1) {
        color = { r: 0, g: 255, b: 0 };
      }
      else {
        color = { r: 255, g: 0, b: 0 };
      }

      var topLeftX = perceptron.topLeft.x * cellSize;
      var topLeftY = perceptron.topLeft.y * cellSize;
      var bottomRightX = perceptron.bottomRight.x * cellSize;
      var bottomRightY = perceptron.bottomRight.y * cellSize;

      for (var x = topLeftX; x < bottomRightX; x += 1) {
        self.setPixel(x, topLeftY, color);
        self.setPixel(x, bottomRightY - 1, color);
      }

      for (var y = topLeftY; y < bottomRightY; y += 1) {
        self.setPixel(topLeftX, y, color);
        self.setPixel(bottomRightX - 1, y, color);
      }
    });
  };

  self.update();
};

module.exports = View;
