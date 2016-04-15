"use strict";

var DescribedClass = require("../lib/positionEvaluator");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("PositionEvaluator", function () {
  var winningTree, drawnTree,
    winningNode, drawnNode;

  beforeEach(function () {
    winningNode = new Node();
    winningNode.addChild(new Node(true));
    winningNode.addChild(new Node(false));
    winningNode.addChild(new Node(true));
    winningNode.addChild(new Node(true));

    drawnNode = new Node();
    drawnNode.addChild(new Node(true));
    drawnNode.addChild(new Node(false));
    drawnNode.addChild(new Node(false));
    drawnNode.addChild(new Node(true));

    winningTree = new QuadTree(winningNode);
    winningTree.size = 2;

    drawnTree = new QuadTree(drawnNode);
    drawnTree.size = 2;
  });

  it("returns 1 if the player has won", function () {
    expect(DescribedClass.evaluate(winningTree, true)).toEqual(1);
  });

  it("returns -1 if the player has lost", function () {
    expect(DescribedClass.evaluate(winningTree, false)).toEqual(-1);
  });

  it("returns 0 if the player drew", function () {
    expect(DescribedClass.evaluate(drawnTree, true)).toEqual(0);
    expect(DescribedClass.evaluate(drawnTree, false)).toEqual(0);
  });

  it("recognises that the games have finished", function () {
    expect(DescribedClass.finished(winningTree)).toEqual(true);
    expect(DescribedClass.finished(drawnTree)).toEqual(true);
  });

  describe("when the game is unfinished", function () {
    var unfinishedTree, unfinishedNode;

    beforeEach(function () {
      unfinishedNode = new Node();
      unfinishedTree = new QuadTree(unfinishedNode);
      unfinishedTree.size = 4;
    });

    it("throws an error", function () {
      expect(function () {
        DescribedClass.evaluate(unfinishedTree, true);
      }).toThrow();
    });

    it("recognises that the game is unfinished", function () {
      expect(DescribedClass.finished(unfinishedTree)).toEqual(false);
    });
  });
});
