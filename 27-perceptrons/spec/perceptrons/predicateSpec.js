"use strict";

var Retina = require("../../lib/perceptrons/retina");
var describedClass = require("../../lib/perceptrons/predicate");

describe("Predicate", function () {
  var retina;
  var evidenceWeigher = {
    receive: function (t) {
      this.transmission = t;
    },
    predicates: []
  };
  var support = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ];

  beforeEach(function () {
    retina = new Retina({ width: 2, height: 2 });

    evidenceWeigher.transmission = undefined;
    evidenceWeigher.predicates = [];
  });

  it("sets its transmission to 0 when there is no pattern match", function () {
    var predicate = new describedClass(retina, support);

    retina.set({ x: 0, y: 0, dark: 1 });
    retina.set({ x: 1, y: 0, dark: 1 });

    predicate.update();
    expect(predicate.transmission).toEqual(0);
  });

  it("sets its transmission to 1 when there is a pattern match", function () {
    var predicate = new describedClass(retina, support);

    retina.set({ x: 0, y: 0, dark: 1 });
    retina.set({ x: 1, y: 1, dark: 1 });

    predicate.update();
    expect(predicate.transmission).toEqual(1);
  });
});
