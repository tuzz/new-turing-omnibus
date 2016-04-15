"use strict";

var DescribedClass = require("../lib/minimaxProcedure");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("MinimaxProcedure", function () {
  var tree, root, child1, child2, child3,
    grandchild1, grandchild2, grandchild3, grandchild4,
    greatchild1, greatchild2, greatchild3;

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

    tree = new QuadTree(root);
  });

  describe("for a tree of depth 2", function () {
    beforeEach(function () {
      grandchild1.score = 2;
      grandchild2.score = 7;
      grandchild3.score = 1;
      grandchild4.score = 8;
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(child1.score).toEqual(2);
      expect(child2.score).toEqual(1);
      expect(root.score).toEqual(2);
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

      greatchild1.score = 1;
      greatchild2.score = 5;
      greatchild3.score = 3;
      greatchild4.score = 9;
      greatchild5.score = 4;
      greatchild6.score = 6;
      greatchild7.score = 4;
      greatchild8.score = 2;
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(grandchild1.score).toEqual(5);
      expect(grandchild2.score).toEqual(9);
      expect(grandchild3.score).toEqual(6);
      expect(grandchild4.score).toEqual(4);
      expect(child1.score).toEqual(5);
      expect(child2.score).toEqual(4);
      expect(root.score).toEqual(5);
    });
  });

  describe("for a tree with varying depths", function () {
    //                 root
    //                /    \
    //          child1      child2{3}
    //         /      \
    // grandchild1{1}   grandchild2{2}

    beforeEach(function () {
      root = new Node("root");
      child1 = new Node("child1");
      child2 = new Node("child2");
      grandchild1 = new Node("grandchild1");
      grandchild2 = new Node("grandchild2");

      root.addChild(child1);
      root.addChild(child2);

      child1.addChild(grandchild1);
      child1.addChild(grandchild2);

      grandchild1.score = 1;
      grandchild2.score = 2;
      child2.score = 3;

      tree = new QuadTree(root);
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(grandchild1.score).toEqual(1);
      expect(grandchild2.score).toEqual(2);
      expect(child1.score).toEqual(1);
      expect(child2.score).toEqual(3);
      expect(root.score).toEqual(3);
    });
  });

  describe("for a complex tree", function () {
    //                 root
    //               /   |  \
    //             c1   c2   c3{1}
    //            / |   | \
    //       g1{-1} g2 g3  g4
    //             /    |    \
    //        gr1{0} gr2{1} gr3{0}
    beforeEach(function () {
      root = new Node("root");

      child1 = new Node("c1");
      child2 = new Node("c2");
      child3 = new Node("c3");

      grandchild1 = new Node("g1");
      grandchild2 = new Node("g2");
      grandchild3 = new Node("g3");
      grandchild4 = new Node("g4");

      greatchild1 = new Node("gr1");
      greatchild2 = new Node("gr2");
      greatchild3 = new Node("gr3");

      root.addChild(child1);
      root.addChild(child2);
      root.addChild(child3);

      child1.addChild(grandchild1);
      child1.addChild(grandchild2);
      child2.addChild(grandchild3);
      child2.addChild(grandchild4);

      grandchild2.addChild(greatchild1);
      grandchild3.addChild(greatchild2);
      grandchild4.addChild(greatchild3);

      child3.score = 1
      grandchild1.score = -1;
      greatchild1.score = 0;
      greatchild2.score = 1;
      greatchild3.score = 0;

      tree = new QuadTree(root);
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(greatchild1.score).toEqual(0);
      expect(greatchild2.score).toEqual(1);
      expect(greatchild3.score).toEqual(0);

      expect(grandchild1.score).toEqual(-1);
      expect(grandchild2.score).toEqual(0);
      expect(grandchild3.score).toEqual(1);
      expect(grandchild4.score).toEqual(0);

      expect(child1.score).toEqual(-1);
      expect(child2.score).toEqual(0);
      expect(child3.score).toEqual(1);

      expect(root.score).toEqual(1);
    });
  });

  describe("for a tree with a deeply nested branch", function () {
    //              root
    //             /    \
    //       child1{1}  child2
    //                    |
    //               grandchild1
    //                    |
    //              greatchild1{0}
    beforeEach(function () {
      root = new Node("root");
      child1 = new Node("child1");
      child2 = new Node("child2");
      grandchild1 = new Node("grandchild1");
      greatchild1 = new Node("greatchild1");

      root.addChild(child1);
      root.addChild(child2);
      child2.addChild(grandchild1);
      grandchild1.addChild(greatchild1);

      child1.score = 1;
      greatchild1.score = 0;

      tree = new QuadTree(root);
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(greatchild1.score).toEqual(0);
      expect(grandchild1.score).toEqual(0);
      expect(child1.score).toEqual(1);
      expect(child2.score).toEqual(0);
      expect(root.score).toEqual(1);
    });
  });

  describe("for a tree containing zero scores", function () {
    //              root
    //             /    \
    //       child1{0}  child2{-1}
    beforeEach(function () {
      root = new Node("root");
      child1 = new Node("child1");
      child2 = new Node("child2");

      root.addChild(child1);
      root.addChild(child2);

      child1.score = 0;
      child2.score = -1;

      tree = new QuadTree(root);
    });

    it("scores tree nodes according to minimax", function () {
      DescribedClass.run(tree);
      expect(tree.root.score).toEqual(0);
    });
  });

  describe("for a tree that exposes a bug", function () {
    //              root
    //             /    \
    //       child1     child2
    //       /    \        |
    //    gc1{3}  gc2   gc3{1}
    //             |
    //           gr1{2}
    beforeEach(function () {
      root = new Node("root");
      child1 = new Node("child1");
      child2 = new Node("child2");
      grandchild1 = new Node("grandchild1");
      grandchild2 = new Node("grandchild2");
      grandchild3 = new Node("grandchild3");
      greatchild1 = new Node("greatchild1");

      root.addChild(child1);
      root.addChild(child2);
      child1.addChild(grandchild1);
      child1.addChild(grandchild2);
      child2.addChild(grandchild3);
      grandchild2.addChild(greatchild1);

      grandchild1.score = 3;
      grandchild3.score = 1;

      greatchild1.score = 2;

      tree = new QuadTree(root);
    });

    it("sets the correct score on the root node", function () {
      DescribedClass.run(tree);
      expect(tree.root.score).toEqual(2);
    });
  });
});
