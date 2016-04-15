"use strict";

var DescribedClass = require("../lib/node");

describe("Node", function () {
  it("can store a value", function () {
    var node = new DescribedClass("foo");
    expect(node.value).toEqual("foo");
  });

  it("can add children", function () {
    var node = new DescribedClass();
    var child = new DescribedClass();
    var grandchild1 = new DescribedClass();
    var grandchild2 = new DescribedClass();

    node.addChild(child);
    child.addChild(grandchild1);
    child.addChild(grandchild2);

    expect(node.children).toEqual([child]);
    expect(child.children).toEqual([grandchild1, grandchild2]);
  });
});
