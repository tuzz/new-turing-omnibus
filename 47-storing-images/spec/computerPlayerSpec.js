"use strict";

var DescribedClass = require("../lib/computerPlayer");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("ComputerPlayer", function () {
  var subject, result;

  describe("when the computer plays as true", function () {
    beforeEach(function () {
      subject = new DescribedClass(true);
    });

    it("plays winning moves correctly", function (done) {
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
    });
  });
});
