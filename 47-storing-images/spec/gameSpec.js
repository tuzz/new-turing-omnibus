"use strict";

var DescribedClass = require("../lib/game");
var QuadTree = require("../lib/quadTree");
var Node = require("../lib/node");

describe("Game", function () {
  var subject, quadTree, player1, player2,
    p1Node, p2Node, p1QuadTree, p2QuadTree;

  beforeEach(function () {
    quadTree = new QuadTree(8, 8);

    p1Node = new Node(true);
    p2Node = new Node(true);

    p1QuadTree = new QuadTree(p1Node);
    p2QuadTree = new QuadTree(p2Node);

    p1QuadTree.size = 4;
    p2QuadTree.size = 4;

    player1 = {
      playTurn: function (quadTree, callback) {
        setTimeout(function () {
          callback(p1QuadTree);
        }, 50);
      }
    };

    player2 = {
      playTurn: function (quadTree, callback) {
        setTimeout(function () {
          callback(p2QuadTree);
        }, 50);
      }
    };

    subject = new DescribedClass(
      quadTree, player1, player2
    );
  });

  it("exposes the quad tree", function () {
    expect(subject.quadTree).toEqual(quadTree);
  });

  it("asks players to play turns alternately", function (done) {
    subject.nextTurn(function () {
      expect(subject.quadTree).toEqual(p1QuadTree);

      subject.nextTurn(function () {
        expect(subject.quadTree).toEqual(p2QuadTree);

        subject.nextTurn(function () {
          expect(subject.quadTree).toEqual(p1QuadTree);

          done();
        });
      });
    });
  });

  it("exposes the player whose turn it is", function (done) {
    expect(subject.currentPlayer).toEqual(player1);

    subject.nextTurn(function () {
      expect(subject.currentPlayer).toEqual(player2);

      subject.nextTurn(function () {
        expect(subject.currentPlayer).toEqual(player1);

        subject.nextTurn(function () {
          expect(subject.currentPlayer).toEqual(player2);

          done();
        });
      });
    });
  });

  it("allows you to check if the game has finished", function (done) {
    expect(subject.finished()).toEqual(false);

    var finishedNode = new Node();
    var finishedTree = new QuadTree(finishedNode);
    finishedTree.size = 2;

    p1QuadTree = finishedTree;

    subject.nextTurn(function () {
      expect(subject.finished()).toEqual(true);
      done();
    });
  });
});
