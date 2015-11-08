"use strict";

var RandomAnimator = function (retina) {
  var self = this;

  self.nextFrame = function () {
    var x = Math.floor(Math.random() * retina.width);
    var y = Math.floor(Math.random() * retina.height);
    var dark = retina.get({ x: x, y: y });

    dark = 1 - dark;
    retina.set({ x: x, y: y, dark: dark });
  };
};

module.exports = RandomAnimator;
