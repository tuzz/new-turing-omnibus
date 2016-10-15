var Graph = require("../lib/graph");
var minispan = require("../lib/minispan");

describe("minispan", function () {
  var g;

  // This is the example from the book.
  beforeEach(function () {
    g = new Graph();

    g.createEdge(0, 1, 15);
    g.createEdge(0, 7, 10); // <--
    g.createEdge(0, 8, 6);  // <--
    g.createEdge(1, 2, 7);  // <--
    g.createEdge(1, 8, 12); // <--
    g.createEdge(2, 3, 8);  // <--
    g.createEdge(3, 4, 11); // <--
    g.createEdge(3, 9, 5);  // <--
    g.createEdge(4, 10, 12);
    g.createEdge(4, 5, 10); // <--
    g.createEdge(4, 6, 14);
    g.createEdge(5, 6, 10); // <--
    g.createEdge(6, 7, 16);
    g.createEdge(7, 10, 14);
    g.createEdge(8, 10, 13);
    g.createEdge(9, 10, 7); // <--
  });

  it("computes the minimum spanning tree of a graph", function () {
    var events = [];

    minispan(g, function (event) {
      events.push(event);
    });

    expect(events).toEqual([
      { type: 'started', node: 0 },
      { type: 'addition', node: 8, edge: { a: 0, b: 8, length: 6 } },
      { type: 'addition', node: 7, edge: { a: 0, b: 7, length: 10 } },
      { type: 'addition', node: 1, edge: { a: 1, b: 8, length: 12 } },
      { type: 'addition', node: 2, edge: { a: 1, b: 2, length: 7 } },
      { type: 'addition', node: 3, edge: { a: 2, b: 3, length: 8 } },
      { type: 'addition', node: 9, edge: { a: 3, b: 9, length: 5 } },
      { type: 'addition', node: 10, edge: { a: 9, b: 10, length: 7 } },
      { type: 'addition', node: 4, edge: { a: 3, b: 4, length: 11 } },
      { type: 'addition', node: 5, edge: { a: 4, b: 5, length: 10 } },
      { type: 'addition', node: 6, edge: { a: 5, b: 6, length: 10 } },
      { type: 'finished' }
    ]);
  });

  it("works for a randomly generated example", function () {
    g = new Graph();

    g.createEdge(0, 2, 1472);
    g.createEdge(1, 0, 1592);
    g.createEdge(1, 3, 1675);
    g.createEdge(2, 1, 287);
    g.createEdge(2, 0, 1472);
    g.createEdge(3, 2, 1536);

    var events = [];

    minispan(g, function (event) {
      events.push(event);
    });

    expect(events).toEqual([
      { type: 'started', node: 0 },
      { type: 'addition', node: 2, edge: { a: 0, b: 2, length: 1472 } },
      { type: 'addition', node: 1, edge: { a: 2, b: 1, length: 287 } },
      { type: 'addition', node: 3, edge: { a: 3, b: 2, length: 1536 } },
      { type: 'finished' }
    ]);
  });

  it("works for another randomly generated example", function () {
    g = new Graph();

    g.createEdge(0, 2, 1400);
    g.createEdge(0, 2, 1400);
    g.createEdge(1, 0, 1548);
    g.createEdge(1, 3, 837);
    g.createEdge(2, 1, 267);
    g.createEdge(2, 3, 602);
    g.createEdge(3, 2, 602);
    g.createEdge(3, 1, 837);

    var events = [];

    minispan(g, function (event) {
      events.push(event);
    });

    expect(events).toEqual([
      { type: 'started', node: 0 },
      { type: 'addition', node: 2, edge: { a: 0, b: 2, length: 1400 } },
      { type: 'addition', node: 1, edge: { a: 2, b: 1, length: 267 } },
      { type: 'addition', node: 3, edge: { a: 2, b: 3, length: 602 } },
      { type: 'finished' }
    ]);
  });
});
