"use strict";

var Retina = require("./perceptrons/retina");
var Perceptron = require("./perceptrons/perceptron");
var View = require("./perceptrons/view");
var Animator = require("./perceptrons/animator");
var _ = require("underscore");

var Perceptrons = function (params) {
  var self = this;

  var canvas = params.canvas;
  var retinaWidth = params.retinaWidth;
  var retinaHeight = params.retinaHeight;
  var perceptronHeight = params.perceptronHeight;
  var perceptronWidth = params.perceptronWidth;
  var animationMode = params.animationMode;

  var retina = new Retina({ width: retinaWidth, height: retinaHeight });
  var animator = new Animator(retina, animationMode);
  var perceptrons = [];

  for (var y = 0; y < retinaHeight / perceptronHeight; y += 1) {
    for (var x = 0; x < retinaWidth / perceptronWidth; x += 1) {
      var topLeft = {
        x: x * perceptronWidth,
        y: y * perceptronHeight
      };

      var bottomRight = {
        x: (x + 1) * perceptronWidth,
        y: (y + 1) * perceptronHeight
      };

      var perceptron = new Perceptron(retina, topLeft, bottomRight);
      perceptrons.push(perceptron);
    }
  }

  var view = new View({
    retina: retina,
    perceptrons: perceptrons,
    width: canvas.width,
    height: canvas.height
  });

  self.run = function () {
    self.interval = setInterval(function () {
      animator.nextFrame();
      _.each(perceptrons, function (perceptron) {
        perceptron.update();
      });
      view.update();
      render();
    });
  };

  var render = function () {
    var context = canvas.getContext("2d");
    var imageData = context.createImageData(canvas.width, canvas.height);

    for (var i = 0; i < view.data.length; i += 1) {
      imageData.data[i] = view.data[i];
    }

    context.putImageData(imageData, 0, 0);
  };
};

module.exports = Perceptrons;

if (typeof window !== "undefined") {
  window.Perceptrons = module.exports;
}
