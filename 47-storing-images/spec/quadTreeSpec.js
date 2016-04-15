"use strict";

var DescribedClass = require("../lib/quadTree");
var Node = require("../lib/node");

describe("QuadTree", function () {
  it("provides access to the root node", function () {
    var root = new Node();
    var quadTree = new DescribedClass(root);

    expect(quadTree.root).toEqual(root);
  });

  it("provides methods to return a new quad tree for the region", function () {
    var root = new Node();

    var northEast = new Node(true);
    var northWest = new Node(true);
    var southWest = new Node(true);
    var southEast = new Node(true);

    root.addChild(northEast);
    root.addChild(northWest);
    root.addChild(southWest);
    root.addChild(southEast);

    var quadTree = new DescribedClass(root);
    quadTree.size = 8;

    var northEastTree = quadTree.northEast();
    var northWestTree = quadTree.northWest();
    var southWestTree = quadTree.southWest();
    var southEastTree = quadTree.southEast();

    expect(northEastTree.root).toEqual(northEast);
    expect(northWestTree.root).toEqual(northWest);
    expect(southWestTree.root).toEqual(southWest);
    expect(southEastTree.root).toEqual(southEast);

    expect(northEastTree.size).toEqual(4);
    expect(northWestTree.size).toEqual(4);
    expect(southWestTree.size).toEqual(4);
    expect(southEastTree.size).toEqual(4);

    expect(northEastTree.northEast()).toBeUndefined();
    expect(northEastTree.northWest()).toBeUndefined();
    expect(northEastTree.southWest()).toBeUndefined();
    expect(northEastTree.southEast()).toBeUndefined();
  });
});
