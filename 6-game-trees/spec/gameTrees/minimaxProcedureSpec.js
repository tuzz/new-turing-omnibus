"use strict";

var DescribedClass = require("../../lib/gameTrees/minimaxProcedure");
var Tree = require("../../lib/gameTrees/tree");
var Node = require("../../lib/gameTrees/node");

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

      grandchild1.value = 1;
      grandchild2.value = 2;
      child2.value = 3;

      tree = new Tree(root);
    });

    it("populates the values tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(grandchild1.value).toEqual(1);
      expect(grandchild2.value).toEqual(2);
      expect(child1.value).toEqual(1);
      expect(child2.value).toEqual(3);
      expect(root.value).toEqual(3);
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

      child3.value = 1
      grandchild1.value = -1;
      greatchild1.value = 0;
      greatchild2.value = 1;
      greatchild3.value = 0;

      tree = new Tree(root);
    });

    it("populates the values tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(greatchild1.value).toEqual(0);
      expect(greatchild2.value).toEqual(1);
      expect(greatchild3.value).toEqual(0);

      expect(grandchild1.value).toEqual(-1);
      expect(grandchild2.value).toEqual(0);
      expect(grandchild3.value).toEqual(1);
      expect(grandchild4.value).toEqual(0);

      expect(child1.value).toEqual(-1);
      expect(child2.value).toEqual(0);
      expect(child3.value).toEqual(1);

      expect(root.value).toEqual(1);
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

      child1.value = 1;
      greatchild1.value = 0;

      tree = new Tree(root);
    });

    it("populates the values tree nodes according to minimax", function () {
      DescribedClass.run(tree);

      expect(greatchild1.value).toEqual(0);
      expect(grandchild1.value).toEqual(0);
      expect(child1.value).toEqual(1);
      expect(child2.value).toEqual(0);
      expect(root.value).toEqual(1);
    });
  });

  describe("for a tree containing zero values", function () {
    //              root
    //             /    \
    //       child1{0}  child2{-1}
    beforeEach(function () {
      root = new Node("root");
      child1 = new Node("child1");
      child2 = new Node("child2");

      root.addChild(child1);
      root.addChild(child2);

      child1.value = 0;
      child2.value = -1;

      tree = new Tree(root);
    });

    it("populates the values tree nodes according to minimax", function () {
      DescribedClass.run(tree);
      expect(tree.root.value).toEqual(0);
    });
  });
});
