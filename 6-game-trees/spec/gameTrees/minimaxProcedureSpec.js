"use strict";

var DescribedClass = require("../../lib/gameTrees/minimaxProcedure");
var Tree = require("../../lib/gameTrees/tree");
var Node = require("../../lib/gameTrees/node");

describe("MinimaxProcedure", function () {
  var tree, root, child1, child2,
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

    tree = new Tree(root);

    grandchild1.value = 2;
    grandchild2.value = 7;
    grandchild3.value = 1;
    grandchild4.value = 8;
  });

  it("populates the values tree nodes according to minimax", function () {
    DescribedClass.run(tree);

    expect(child1.value).toEqual(2);
    expect(child2.value).toEqual(1);
    expect(root.value).toEqual(2);
  });
});
