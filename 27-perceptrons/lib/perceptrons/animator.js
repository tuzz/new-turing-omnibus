"use strict";

var RandomAnimator = require("./animator/randomAnimator");

var Animator = function (retina, mode) {
  var self = this;

  if (mode === "random") {
    self.animator = new RandomAnimator(retina);
  }

  self.nextFrame = function () {
    self.animator.nextFrame();
  };
};

module.exports = Animator;
