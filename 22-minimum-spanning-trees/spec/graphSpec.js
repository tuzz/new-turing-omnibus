var Graph = require("../lib/graph");

describe("Graph", function () {
  it("behaves like a graph", function () {
    var g = new Graph();

    g.createEdge(0, 1, 15);
    g.createEdge(1, 2, 20);
    g.createEdge(2, 3, 25);

    var e0 = g.edges(0);
    var e1 = g.edges(1);
    var e2 = g.edges(2);
    var e3 = g.edges(3);

    expect(e0.length).toEqual(1);
    expect(e1.length).toEqual(2);
    expect(e2.length).toEqual(2);
    expect(e3.length).toEqual(1);

    expect(e0[0].a).toEqual(0);
    expect(e0[0].b).toEqual(1);
    expect(e0[0].length).toEqual(15);

    expect(e1[0].a).toEqual(1);
    expect(e1[0].b).toEqual(2);
    expect(e1[0].length).toEqual(20);

    expect(e1[1].a).toEqual(0);
    expect(e1[1].b).toEqual(1);
    expect(e1[1].length).toEqual(15);

    expect(g.numberOfNodes).toEqual(4);
  });
});
