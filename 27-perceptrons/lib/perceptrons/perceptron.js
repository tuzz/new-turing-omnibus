"use strict";

var EvidenceWeigher = require("./evidenceWeigher");
var Predicate = require("./predicate");
var _ = require("underscore");

var Perceptron = function (retina, topLeft, bottomRight) {
  var self = this;
  self.topLeft = topLeft;
  self.bottomRight = bottomRight;
  self.predicates = [];

  for (var y = topLeft.y; y < bottomRight.y - 1; y += 1) {
    for (var x = topLeft.x; x < bottomRight.x - 1; x += 1) {
      var predicate = new Predicate(retina, [
        { x: x + 0, y: y + 0 },
        { x: x + 1, y: y + 0 },
        { x: x + 0, y: y + 1 },
        { x: x + 1, y: y + 1 }
      ]);

      self.predicates.push(predicate);
    }
  }

  self.evidenceWeigher = new EvidenceWeigher(self.predicates);

  self.update = function () {
    _.each(self.predicates, function (predicate) {
      predicate.update();
    });
    self.evidenceWeigher.update();

    self.transmission = self.evidenceWeigher.transmission;
  };
};

module.exports = Perceptron;
