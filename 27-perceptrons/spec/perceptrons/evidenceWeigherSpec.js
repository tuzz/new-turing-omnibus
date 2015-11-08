"use strict";

var describedClass = require("../../lib/perceptrons/evidenceWeigher");

describe("EvidenceWeigher", function () {
  var predicate1 = {};
  var predicate2 = {};

  it("sets its transmission to 0 if there are non-rectangles", function () {
    var evidenceWeigher = new describedClass([
      predicate1,
      predicate2
    ]);

    predicate1.transmission = 1;
    predicate2.transmission = 0;

    evidenceWeigher.update();
    expect(evidenceWeigher.transmission).toEqual(0);
  });

  it("generates a 1 if there are disjoint rectangles", function () {
    var evidenceWeigher = new describedClass([
      predicate1,
      predicate2
    ]);

    predicate1.transmission = 0;
    predicate2.transmission = 0;

    evidenceWeigher.update();
    expect(evidenceWeigher.transmission).toEqual(1);
  });
});
