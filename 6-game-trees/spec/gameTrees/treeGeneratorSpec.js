"use strict";

var DescribedClass = require("../../lib/gameTrees/treeGenerator");
var Board = require("../../lib/gameTrees/board");

describe("TreeGenerator", function () {
  it("recursively generates a tree of boards", function () {
    var board = new Board([
      ["X", "O", "X"],
      ["O", "_", "X"],
      ["_", "X", "O"]
    ]);

    var node = DescribedClass.generate(board);

    expect(node.value).toEqual(board);
    expect(node.children.length).toEqual(2);

    var firstChild = node.children[0];
    var secondChild = node.children[1];

    expect(firstChild.value.equal(new Board([
      ["X", "O", "X"],
      ["O", "O", "X"],
      ["_", "X", "O"]
    ]))).toEqual(true);

    expect(secondChild.value.equal(new Board([
      ["X", "O", "X"],
      ["O", "_", "X"],
      ["O", "X", "O"]
    ]))).toEqual(true);

    expect(firstChild.children.length).toEqual(1);
    expect(secondChild.children.length).toEqual(1);

    var firstGrandchild = firstChild.children[0];
    var secondGrandchild = secondChild.children[0];

    expect(firstGrandchild.value.equal(new Board([
      ["X", "O", "X"],
      ["O", "O", "X"],
      ["X", "X", "O"]
    ]))).toEqual(true);

    expect(secondGrandchild.value.equal(new Board([
      ["X", "O", "X"],
      ["O", "X", "X"],
      ["O", "X", "O"]
    ]))).toEqual(true);

    expect(firstGrandchild.children.length).toEqual(0);
    expect(secondGrandchild.children.length).toEqual(0);
  });
});
