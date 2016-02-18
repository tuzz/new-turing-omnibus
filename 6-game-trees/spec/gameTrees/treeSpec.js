"use strict";

var DescribedClass = require("../../lib/gameTrees/tree");
var Node = require("../../lib/gameTrees/node");

describe("Tree", function () {
  var subject, root, child1, child2,
    grandchild1, grandchild2, grandchild3, grandchild4;

  beforeEach(function () {
    root = new Node("root");
    child1 = new Node("child1");
    child2 = new Node("child2");
    grandchild1 = new Node("grandchild1");
    grandchild2 = new Node("grandchild2");
    grandchild3 = new Node("grandchild3");
    grandchild4 = new Node("grandchild4");

    root.addChild(child1);
    root.addChild(child2);

    child1.addChild(grandchild1);
    child1.addChild(grandchild2);

    child2.addChild(grandchild3);
    child2.addChild(grandchild4);

    subject = new DescribedClass(root);
  });

  it("provides access to the root", function () {
    expect(subject.root).toEqual(root);
  });

  it("provides access to its leaves", function () {
    expect(subject.leaves()).toEqual([
      grandchild1, grandchild2, grandchild3, grandchild4
    ]);
  });

  it("provides access to its depth", function () {
    expect(subject.depth()).toEqual(2);
  });
});
