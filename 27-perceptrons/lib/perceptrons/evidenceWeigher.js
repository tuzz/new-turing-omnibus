"use strict";

var _ = require("underscore");

var EvidenceWeigher = function (predicates) {
  var self = this;

  self.update = function () {
    var sum = 0;

    _.each(predicates, function (predicate) {
      sum += -1 * predicate.transmission;
    });

    if (sum < 0) {
      self.transmission = 0;
    }
    else {
      self.transmission = 1;
    }
  };
};

module.exports = EvidenceWeigher;
