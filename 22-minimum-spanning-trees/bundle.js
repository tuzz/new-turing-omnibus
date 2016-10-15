(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.App = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var minispan = require("./minispan");
var Graph = require("./graph");

var App = function () {
  var self = this;

  var nodeCount;
  var density;
  var delay;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var pointSize;
  var border;

  var points = [];
  var edges = [];
  var graph = new Graph();
  var eventQueue = [];

  var colors = ["red", "green", "blue", "magenta"];
  var color = colors[Math.floor(Math.random() * colors.length)];

  self.run = function () {
    parseParams();
    setupControls();
    resizeCanvas();

    generatePoints();
    generateEdges();
    generateGraph();

    drawEdges();
    drawPoints();

    minispan(graph, function (event) {
      eventQueue.push(event);
    });

    setInterval(animate, delay);
  };

  var parseParams = function () {
    var query = window.location.search;
    var params = query.slice(1, query.length);

    if (params.length === 0) {
      nodeCount = 12;
      density = 0.5;
      delay = 300;
    } else {
      params = params.split(",");

      nodeCount = parseInt(params[0]);
      density = parseFloat(params[1]);
      delay = parseInt(params[2]);
    }
  };

  var setupControls = function () {
    setControl("more-nodes", nodeCount * 1.25, density, delay);
    setControl("fewer-nodes", nodeCount * 0.8, density, delay);
    setControl("more-edges", nodeCount, density * 1.25, delay);
    setControl("fewer-edges", nodeCount, density * 0.8, delay);
    setControl("faster", nodeCount, density, delay * 0.8);
    setControl("slower", nodeCount, density, delay * 1.25);
  };

  var setControl = function (id, nodeCount, density, delay) {
    var element = document.getElementById(id);

    nodeCount = Math.round(nodeCount);
    delay = Math.round(delay);

    element.setAttribute("href", "?" + nodeCount + "," + density + "," + delay);
  };

  var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pointSize = canvas.width * 0.003;
    border = canvas.width * 0.02;
  };

  var generatePoints = function () {
    var width = canvas.width;
    var height = canvas.height;

    for (var i = 0; i < nodeCount; i += 1) {
      var x = Math.floor(Math.random() * (width - 2 * border) + border);
      var y = Math.floor(Math.random() * (height - 2 * border) + border);

      points.push({ x: x, y: y, index: i });
    }
  };

  var generateEdges = function () {
    for (var i = 0; i < points.length; i += 1) {
      var nextIndex = (i + 1) % points.length;
      edges.push({ a: points[i], b: points[nextIndex] });

      for (var j = 0; j < points.length; j += 1) {
        if (i !== j && Math.random() < density) {
          edges.push({ a: points[i], b: points[j] });
        }
      }
    }
  };

  var generateGraph = function () {
    for (var i = 0; i < edges.length; i += 1) {
      var edge = edges[i];

      var a = edge.a;
      var b = edge.b;

      var x = a.x - b.x;
      var y = a.y - b.y;
      var hypotenuse = Math.round(Math.sqrt(x * x + y * y));

      graph.createEdge(a.index, b.index, hypotenuse);
    }
  };

  var drawPoints = function () {
    context.beginPath();

    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];

      context.beginPath();
      context.arc(point.x, point.y, pointSize, 2 * Math.PI, false);
      context.fill();
      context.closePath();
    }
  };

  var drawEdges = function () {
    context.save();

    if (nodeCount * density > 25) {
      context.strokeStyle = "#eee";
    } else {
      context.strokeStyle = "#ccc";
    }

    for (var i = 0; i < edges.length; i += 1) {
      var edge = edges[i];
      var a = edge.a;
      var b = edge.b;

      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
      context.closePath();
    }

    context.restore();
  };

  var animate = function () {
    if (eventQueue.length === 0) {
      return;
    }

    var event = eventQueue.shift();

    if (event.type === "started") {
      return;
    } else if (event.type === "finished") {
      return;
    }

    context.save();

    var edge = event.edge;
    var a = points[edge.a];
    var b = points[edge.b];

    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = 4;

    context.beginPath();
    context.arc(a.x, a.y, pointSize, 2 * Math.PI, false);
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(b.x, b.y, pointSize, 2 * Math.PI, false);
    context.fill();
    context.closePath();

    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
    context.closePath();

    context.restore();
  };
};

module.exports = App;

},{"./graph":2,"./minispan":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./utils":4}],4:[function(require,module,exports){
// These functions are O(N^2). We could do them faster because the arrays are
// sorted but I didn't want to write a binary search algorithm.

module.exports.subtract = function (a, b) {
  var result = [];

  outer: for (var i = 0; i < a.length; i += 1) {
    for (var j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        continue outer;
      }
    }

    result.push(a[i]);
  }

  return result;
};

module.exports.intersect = function (a, b) {
  var result = [];

  outer: for (var i = 0; i < a.length; i += 1) {
    for (var j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        result.push(a[i]);
        continue outer;
      }
    }
  }

  return result;
};

module.exports.numericSort = function (numbers, fn) {
  return numbers.sort(function (a, b) {
    return fn(a) - fn(b);
  });
};

module.exports.merge = function (a, b, fn) {
  return module.exports.numericSort(a.concat(b), fn);
};

},{}]},{},[1])(1)
});