var subtract = require("./utils").subtract;
var intersect = require("./utils").intersect;
var sort = require("./utils").numericSort;
var merge = require("./utils").merge;

var minispan = function (graph, callback) {
  // 1. select an arbitrary vertex u in the graph
  var u = 0;

  // Tell the outside world we have the first node.
  callback({ type: "started", node: u });

  // 2. T <- {u}
  var T = [u];

  // 3. L <- Eu
  var L = graph.edges(u);

  // 4. L <- sort(L)
  L = sort(L, function (e) { return e.length; });

  // 5. while T does not yet span G
  while ((T.length + 1) / 2 < graph.numberOfNodes) {

    // 1. select the first edge {v, t} in L
    var vt = L[0];

    // 2. T <- T U {v} U {v, t}
    var v = subtract([vt.a, vt.b], T)[0];
    T.push(vt);
    T.push(v);

    // Tell the outside world we have a new node and edge.
    callback({ type: "addition", node: v, edge: vt });

    // 3. L' <- Ev - L
    var Ev = graph.edges(v);
    var Li = subtract(Ev, L);

    // 4. L <- L - Ev ∩ L
    L = subtract(L, intersect(Ev, L));

    // 5. L' <- sort(L')
    Li = sort(Li, function (e) { return e.length; });

    // 6. L <- merge(L, L')
    L = merge(L, Li, function (e) { return e.length; });
  }

  // Tell the outside world we're finished.
  callback({ type: "finished" });
};

module.exports = minispan;
