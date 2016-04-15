"use strict";

var ImageMatrix = require("./imageMatrix");

var MandelbrotSet = function (params) {
  var self = this;
  var setMemberships = {};

  var realMin = params.realMin;
  var realMax = params.realMax;
  var imagMin = params.imagMin;
  var imagMax = params.imagMax;
  var width = params.width;
  var height = params.height;
  var iterations = params.iterations;

  var initialize = function () {
    var realWidth = realMax - realMin;
    var imagHeight = imagMax - imagMin;

    for (var x = 0; x < height; x += 1) {
      setMemberships[x] = {};

      eachPixel: for (var y = 0 ; y < width; y += 1) {
        var real = x / width * realWidth + realMin;
        var imag = y / height * imagHeight + imagMin;
        var zReal = 0;
        var zImag = 0;

        for (var i = 0; i < iterations; i += 1) {
          var r2 = zReal * zReal;
          var i2 = zImag * zImag;

          if (r2 + i2 > 4) {
            setMemberships[x][y] = false;
            continue eachPixel;
          } else {
            zImag = 2 * zReal * zImag + imag;
            zReal = r2 - i2 + real;
          }
        }

        setMemberships[x][y] = true;
      }
    }
  };

  self.isMember = function (x, y) {
    return setMemberships[x][y];
  };

  self.toImageMatrix = function () {
    if (typeof self.imageMatrix === "undefined") {
      var imageMatrix = new ImageMatrix(width, height);

      for (var x = 0; x < width; x += 1) {
        for (var y = 0; y < height; y += 1) {
          var color = self.isMember(x, y);
          imageMatrix.set(x, y, color);
        }
      }

      self.imageMatrix = imageMatrix;
    }

    return self.imageMatrix;
  };

  initialize();
};

module.exports = MandelbrotSet;
