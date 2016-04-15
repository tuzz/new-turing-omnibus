"use strict";

var DescribedClass = require("../lib/humanPlayer");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("HumanPlayer", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass(true);
  });

  it("defers turns to the provided callback", function (done) {
    var node = new Node();

    var northEast = new Node();
    var northWest = new Node();
    var southWest = new Node();
    var southEast = new Node();

    node.addChild(northEast);
    node.addChild(northWest);
    node.addChild(southWest);
    node.addChild(southEast);

    northEast.addChild(new Node(true));
    northEast.addChild(new Node(false));
    northEast.addChild(new Node(false));
    northEast.addChild(new Node(false));

    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));
    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));

    southWest.addChild(new Node(true));
    southWest.addChild(new Node(false));
    southWest.addChild(new Node(true));
    southWest.addChild(new Node(true));

    var tree = new QuadTree(node);
    tree.size = 4;

    subject.playTurn(tree, function (result) {
      expect(result.root).toEqual(tree.southWest().root);
      done();
    });

    setTimeout(function () {
      subject.callback("southWest");
    }, 50);
  });

  it("does not accept moves for monogamous quadrants", function (done) {
    var node = new Node();

    var northEast = new Node();
    var northWest = new Node();
    var southWest = new Node();
    var southEast = new Node();

    node.addChild(northEast);
    node.addChild(northWest);
    node.addChild(southWest);
    node.addChild(southEast);

    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));
    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));

    southWest.addChild(new Node(true));
    southWest.addChild(new Node(false));
    southWest.addChild(new Node(true));
    southWest.addChild(new Node(true));

    var tree = new QuadTree(node);
    tree.size = 4;

    subject.playTurn(tree, function (result) {
      expect(result.root).toEqual(tree.northWest().root);
      done();
    });

    setTimeout(function () {
      subject.callback("northEast");

      setTimeout(function () {
        subject.callback("southEast");

        setTimeout(function () {
          subject.callback("northWest");
        }, 50);
      }, 50);
    }, 50);
  });

  it("does not allow more than one valid move", function (done) {
    var node = new Node();

    var northEast = new Node();
    var northWest = new Node();
    var southWest = new Node();
    var southEast = new Node();

    node.addChild(northEast);
    node.addChild(northWest);
    node.addChild(southWest);
    node.addChild(southEast);

    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));
    northWest.addChild(new Node(true));
    northWest.addChild(new Node(false));

    southWest.addChild(new Node(true));
    southWest.addChild(new Node(false));
    southWest.addChild(new Node(true));
    southWest.addChild(new Node(true));

    var tree = new QuadTree(node);
    tree.size = 4;

    var calls = 0;

    subject.playTurn(tree, function (result) {
      calls += 1
    });

    subject.callback("northWest");
    subject.callback("southWest");
    subject.callback("southWest");

    setTimeout(function () {
      expect(calls).toEqual(1);
      done();
    }, 50);
  });
});
