"use strict";

var DescribedClass = require("../lib/decomposer");
var ImageMatrix = require("../lib/imageMatrix");

describe("Decomposer", function () {
  it("decompose a 1x1 image matrix into a quad tree", function () {
    var imageMatrix = new ImageMatrix(1, 1);
    imageMatrix.set(0, 0, true);

    var quadTree = DescribedClass.decompose(imageMatrix);
    var root = quadTree.root;

    expect(quadTree.size).toEqual(1);
    expect(root.value).toEqual(true);
    expect(root.children.length).toEqual(0);
  });

  it("decompose a 2x2 image matrix into a quad tree", function () {
    var imageMatrix = new ImageMatrix(2, 2);

    imageMatrix.set(0, 0, true);
    imageMatrix.set(0, 1, true);
    imageMatrix.set(1, 0, true);
    imageMatrix.set(1, 1, true);

    var quadTree = DescribedClass.decompose(imageMatrix);
    var root = quadTree.root;

    expect(quadTree.size).toEqual(2);
    expect(root.value).toEqual(true);
    expect(root.children.length).toEqual(0);

    imageMatrix.set(0, 0, false);

    quadTree = DescribedClass.decompose(imageMatrix);
    root = quadTree.root;

    expect(quadTree.size).toEqual(2);
    expect(root.value).toBeUndefined();
    expect(root.children.length).toEqual(4);

    var children = root.children;
    var northEast = children[0];
    var northWest = children[1];
    var southWest = children[2];
    var southEast = children[3];

    expect(northEast.value).toEqual(true);
    expect(northWest.value).toEqual(false);
    expect(southWest.value).toEqual(true);
    expect(southEast.value).toEqual(true);

    expect(northEast.children.length).toEqual(0);
    expect(northWest.children.length).toEqual(0);
    expect(southWest.children.length).toEqual(0);
    expect(southEast.children.length).toEqual(0);
  });

  it("decomposes a 4x4 image matrix into a quad tree", function () {
    var imageMatrix = new ImageMatrix(4, 4);

    var quadTree = DescribedClass.decompose(imageMatrix);
    var root = quadTree.root;

    expect(quadTree.size).toEqual(4);
    expect(root.value).toEqual(false);
    expect(root.children.length).toEqual(0);

    imageMatrix.set(0, 0, true);

    quadTree = DescribedClass.decompose(imageMatrix);
    root = quadTree.root;

    expect(quadTree.size).toEqual(4);
    expect(root.value).toBeUndefined();
    expect(root.children.length).toEqual(4);

    var children = root.children;
    var northEast = children[0];
    var northWest = children[1];
    var southWest = children[2];
    var southEast = children[3];

    expect(northEast.value).toEqual(false);
    expect(northWest.value).toBeUndefined();
    expect(southWest.value).toEqual(false);
    expect(southEast.value).toEqual(false);

    expect(northEast.children.length).toEqual(0);
    expect(northWest.children.length).toEqual(4);
    expect(southWest.children.length).toEqual(0);
    expect(southEast.children.length).toEqual(0);

    children = northWest.children;
    northEast = children[0];
    southWest = children[2];
    southEast = children[3];
    northWest = children[1];

    expect(northEast.value).toEqual(false);
    expect(northWest.value).toEqual(true);
    expect(southWest.value).toEqual(false);
    expect(southEast.value).toEqual(false);

    expect(northEast.children.length).toEqual(0);
    expect(northWest.children.length).toEqual(0);
    expect(southWest.children.length).toEqual(0);
    expect(southEast.children.length).toEqual(0);
  });
});
