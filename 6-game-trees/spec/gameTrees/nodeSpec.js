"use strict";

var DescribedClass = require("../../lib/gameTrees/node");

describe("Node", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass("position");
  });

  it("stores the position on the node", function () {
    expect(subject.position).toEqual("position");
  });

  it("allows you to add children", function () {
    expect(subject.children).toEqual([]);

    var child = new DescribedClass("child");
    subject.addChild(child);

    expect(subject.children).toEqual([child]);
  });

  it("holds a reference to its parent", function () {
    expect(subject.parent).toBeUndefined();

    var child = new DescribedClass("child");
    subject.addChild(child);

    expect(child.parent).toEqual(subject);
  });

  it("can return its depth", function () {
    expect(subject.depth()).toEqual(0);

    var child = new DescribedClass("child");
    subject.addChild(child);

    expect(subject.depth()).toEqual(0);
    expect(child.depth()).toEqual(1);

    var grandchild = new DescribedClass("grandchild");
    child.addChild(grandchild);

    expect(subject.depth()).toEqual(0);
    expect(child.depth()).toEqual(1);
    expect(grandchild.depth()).toEqual(2);
  });
});
