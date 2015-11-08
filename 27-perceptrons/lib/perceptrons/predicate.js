"use strict";

var _ = require("underscore");

var Predicate = function (retina, support) {
  var self = this;
  var nonRectanglePatterns = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 1]
  ];
  self.retina = retina;
  self.support = support;

  self.update = function () {
    var pattern = _.map(self.support, function (coordinate) {
      return retina.get({ x: coordinate.x, y: coordinate.y });
    });

    var nonRectangle = _.detect(nonRectanglePatterns, function (p) {
      return _.isEqual(pattern, p);
    });

    if (nonRectangle) {
      self.transmission = 1;
    }
    else {
      self.transmission = 0;
    }
  };
};

module.exports = Predicate;
