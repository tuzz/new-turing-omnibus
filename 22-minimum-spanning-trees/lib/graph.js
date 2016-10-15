var Graph = function () {
  var self = this;

  var edgesIndexedByA = {};
  var edgesIndexedByB = {};

  self.createEdge = function (a, b, length) {
    var edge = { a: a, b: b, length: length };

    edgesIndexedByA[a] = edgesIndexedByA[a] || [];
    edgesIndexedByB[b] = edgesIndexedByB[b] || [];

    edgesIndexedByA[a].push(edge);
    edgesIndexedByB[b].push(edge);

    updateNumberOfNodes(a);
    updateNumberOfNodes(b);
  };

  self.edges = function (n) {
    var aEdges = edgesIndexedByA[n] || [];
    var bEdges = edgesIndexedByB[n] || [];

    return aEdges.concat(bEdges);
  };

  self.numberOfNodes = 0;

  var nodes = {};
  var updateNumberOfNodes = function (n) {
    if (typeof nodes[n] === "undefined") {
      nodes[n] = true;
      self.numberOfNodes += 1;
    }
  };
};

module.exports = Graph;
