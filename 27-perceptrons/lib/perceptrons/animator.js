"use strict";

var RandomAnimator = require("./animator/randomAnimator");
var CloudsAnimator = require("./animator/cloudsAnimator");

var Animator = function (retina, mode) {
  var self = this;

  if (mode === "random") {
    self.animator = new RandomAnimator(retina);
  }
  else if (mode === "clouds") {
    self.animator = new CloudsAnimator(retina);
  }

  self.nextFrame = function () {
    self.animator.nextFrame();
  };
};

module.exports = Animator;
