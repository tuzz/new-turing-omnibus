"use strict";

var DescribedClass = require("../lib/composer");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("Composer", function () {
  it("composes a 1x1 quad tree into an image matrix", function () {
    var root = new Node(true);
    var quadTree = new QuadTree(root);
    quadTree.size = 1;

    var imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(1);
    expect(imageMatrix.height).toEqual(1);

    expect(imageMatrix.get(0, 0)).toEqual(true);
  });

  it("composes a 2x2 quad tree into an image matrix", function () {
    var root = new Node(true);
    var quadTree = new QuadTree(root);
    quadTree.size = 2;

    var imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(2);
    expect(imageMatrix.height).toEqual(2);

    expect(imageMatrix.get(0, 0)).toEqual(true);
    expect(imageMatrix.get(0, 1)).toEqual(true);
    expect(imageMatrix.get(1, 0)).toEqual(true);
    expect(imageMatrix.get(1, 1)).toEqual(true);

    root.value = undefined;

    var northEast = new Node(false);
    var northWest = new Node(true);
    var southWest = new Node(false);
    var southEast = new Node(false);

    root.addChild(northEast);
    root.addChild(northWest);
    root.addChild(southWest);
    root.addChild(southEast);

    imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(2);
    expect(imageMatrix.height).toEqual(2);

    expect(imageMatrix.get(0, 0)).toEqual(true);
    expect(imageMatrix.get(0, 1)).toEqual(false);
    expect(imageMatrix.get(1, 0)).toEqual(false);
    expect(imageMatrix.get(1, 1)).toEqual(false);
  });

  it("composes a 4x4 quad tree into an image matrix", function () {
    var root = new Node(true);
    var quadTree = new QuadTree(root);
    quadTree.size = 4;

    var imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(4);
    expect(imageMatrix.height).toEqual(4);

    expect(imageMatrix.get(0, 0)).toEqual(true);
    expect(imageMatrix.get(0, 1)).toEqual(true);
    expect(imageMatrix.get(0, 2)).toEqual(true);
    expect(imageMatrix.get(0, 3)).toEqual(true);
    expect(imageMatrix.get(1, 0)).toEqual(true);
    expect(imageMatrix.get(1, 1)).toEqual(true);
    expect(imageMatrix.get(1, 2)).toEqual(true);
    expect(imageMatrix.get(1, 3)).toEqual(true);
    expect(imageMatrix.get(2, 0)).toEqual(true);
    expect(imageMatrix.get(2, 1)).toEqual(true);
    expect(imageMatrix.get(2, 2)).toEqual(true);
    expect(imageMatrix.get(2, 3)).toEqual(true);
    expect(imageMatrix.get(3, 0)).toEqual(true);
    expect(imageMatrix.get(3, 1)).toEqual(true);
    expect(imageMatrix.get(3, 2)).toEqual(true);
    expect(imageMatrix.get(3, 3)).toEqual(true);

    root.value = undefined;

    var northEast = new Node(false);
    var northWest = new Node(true);
    var southWest = new Node(false);
    var southEast = new Node(false);

    root.addChild(northEast);
    root.addChild(northWest);
    root.addChild(southWest);
    root.addChild(southEast);

    imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(4);
    expect(imageMatrix.height).toEqual(4);

    expect(imageMatrix.get(0, 0)).toEqual(true);
    expect(imageMatrix.get(0, 1)).toEqual(true);
    expect(imageMatrix.get(0, 2)).toEqual(false);
    expect(imageMatrix.get(0, 3)).toEqual(false);
    expect(imageMatrix.get(1, 0)).toEqual(true);
    expect(imageMatrix.get(1, 1)).toEqual(true);
    expect(imageMatrix.get(1, 2)).toEqual(false);
    expect(imageMatrix.get(1, 3)).toEqual(false);
    expect(imageMatrix.get(2, 0)).toEqual(false);
    expect(imageMatrix.get(2, 1)).toEqual(false);
    expect(imageMatrix.get(2, 2)).toEqual(false);
    expect(imageMatrix.get(2, 3)).toEqual(false);
    expect(imageMatrix.get(3, 0)).toEqual(false);
    expect(imageMatrix.get(3, 1)).toEqual(false);
    expect(imageMatrix.get(3, 2)).toEqual(false);
    expect(imageMatrix.get(3, 3)).toEqual(false);

    southEast.value = undefined;

    var southEastNorthEast = new Node(true);
    var southEastNorthWest = new Node(false);
    var southEastSouthWest = new Node(false);
    var southEastSouthEast = new Node(true);

    southEast.addChild(southEastNorthEast);
    southEast.addChild(southEastNorthWest);
    southEast.addChild(southEastSouthWest);
    southEast.addChild(southEastSouthEast);

    imageMatrix = DescribedClass.compose(quadTree);

    expect(imageMatrix.width).toEqual(4);
    expect(imageMatrix.height).toEqual(4);

    expect(imageMatrix.get(0, 0)).toEqual(true);
    expect(imageMatrix.get(0, 1)).toEqual(true);
    expect(imageMatrix.get(0, 2)).toEqual(false);
    expect(imageMatrix.get(0, 3)).toEqual(false);
    expect(imageMatrix.get(1, 0)).toEqual(true);
    expect(imageMatrix.get(1, 1)).toEqual(true);
    expect(imageMatrix.get(1, 2)).toEqual(false);
    expect(imageMatrix.get(1, 3)).toEqual(false);
    expect(imageMatrix.get(2, 0)).toEqual(false);
    expect(imageMatrix.get(2, 1)).toEqual(false);
    expect(imageMatrix.get(2, 2)).toEqual(false);
    expect(imageMatrix.get(2, 3)).toEqual(false);
    expect(imageMatrix.get(3, 0)).toEqual(false);
    expect(imageMatrix.get(3, 1)).toEqual(false);
    expect(imageMatrix.get(3, 2)).toEqual(true);
    expect(imageMatrix.get(3, 3)).toEqual(true);
  });
});
