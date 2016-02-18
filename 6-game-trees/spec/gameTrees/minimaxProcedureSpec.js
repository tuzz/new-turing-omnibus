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
  });

  describe("for a tree of depth 2", function () {
    beforeEach(function () {
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

  describe("for a tree of depth 3", function () {
    var greatchild1, greatchild2, greatchild3, greatchild4,
      greatchild5, greatchild6, greatchild7, greatchild8;

    beforeEach(function () {
      greatchild1 = new Node("greatchild1");
      greatchild2 = new Node("greatchild2");
      greatchild3 = new Node("greatchild3");
      greatchild4 = new Node("greatchild4");
      greatchild5 = new Node("greatchild5");
      greatchild6 = new Node("greatchild6");
      greatchild7 = new Node("greatchild7");
      greatchild8 = new Node("greatchild8");

      grandchild1.addChild(greatchild1);
      grandchild1.addChild(greatchild2);
      grandchild2.addChild(greatchild3);
      grandchild2.addChild(greatchild4);
      grandchild3.addChild(greatchild5);
      grandchild3.addChild(greatchild6);
      grandchild4.addChild(greatchild7);
      grandchild4.addChild(greatchild8);

      greatchild1.value = 1;
      greatchild2.value = 5;
      greatchild3.value = 3;
      greatchild4.value = 9;
      greatchild5.value = 4;
      greatchild6.value = 6;
      greatchild7.value = 4;
      greatchild8.value = 2;
    });

    it("populates the values tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(grandchild1.value).toEqual(5);
      expect(grandchild2.value).toEqual(9);
      expect(grandchild3.value).toEqual(6);
      expect(grandchild4.value).toEqual(4);
      expect(child1.value).toEqual(5);
      expect(child2.value).toEqual(4);
      expect(root.value).toEqual(5);
    });
  });
});
