"use strict";

var Retina = require("./perceptrons/retina");
var Perceptron = require("./perceptrons/perceptron");
var View = require("./perceptrons/view");
var Animator = require("./perceptrons/animator");
var _ = require("underscore");

var Perceptrons = function (canvas) {
  var self = this;
  var retina = new Retina({ width: 98, height: 54 });
  var animator = new Animator(retina);
  var perceptrons = [];

  for (var y = 0; y < 9; y += 1) {
    for (var x = 0; x < 14; x += 1) {
      var topLeft = { x: x * 7, y: y * 6 };
      var bottomRight = { x: (x + 1) * 7, y: (y + 1) * 6 };

      var perceptron = new Perceptron(retina, topLeft, bottomRight);
      perceptrons.push(perceptron);
    }
  }

  var view = new View({
    retina: retina,
    perceptrons: perceptrons,
    width: 980,
    height: 540
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
    var imageData = context.createImageData(980, 540);

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
