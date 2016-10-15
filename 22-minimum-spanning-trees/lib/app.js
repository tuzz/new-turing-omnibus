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
