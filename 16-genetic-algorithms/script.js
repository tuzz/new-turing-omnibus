var GeneticAlgorithms = function () {
  var self = this;
  var delay, nodes, comparator;
  var vertices = [];
  var chromosomes = [];
  var solutions = [];
  var distances = [];
  var rankedDistances = [];
  var canvases = document.getElementsByTagName("canvas");

  self.run = function () {
    setupPanes();

    for (var i = 0; i < nodes; i += 1) {
      vertices.push(randomVertex());
    }

    for (var i = 0; i < 15; i += 1) {
      chromosomes.push(randomChromosome());
    }

    runLoop();
    setInterval(runLoop, delay);
  };

  var runLoop = function () {
    for (var i = 0; i < canvases.length; i += 1) {
      var canvas = canvases[i];
      var context = canvas.getContext("2d");

      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    solutions = [];
    distances = [];

    rankSolutions();

    for (var i = 0; i < solutions.length; i += 1) {
      drawSolution(i);
      drawDistance(i);
    }

    evolve();
  };

  var drawSolution = function (index) {
    var canvas = canvases[index];

    for (var i = 0; i < vertices.length; i += 1) {
      for (var j = i + 1; j < vertices.length; j += 1) {
        drawEdge(canvas, vertices[i], vertices[j], "gray", 1);
      }
    };

    drawTour(canvas, solutions[index]);

    for (var i = 0; i < vertices.length; i += 1) {
      drawVertex(canvas, vertices[i], i);
    }
  };

  var solutionForChromosome = function (chromosome) {
    var solution = [];
    var remainingVertices = vertices.slice(0);

    for (var i = 0; i < chromosome.length; i += 1) {
      var index = chromosome[i];
      var vertex = remainingVertices[index];

      solution.push(vertex);
      remainingVertices.splice(index, 1);
    }

    return solution;
  };

  var randomVertex = function () {
    var canvas = canvases[0];

    var x = Math.round(Math.random() * (canvas.width - 20)) + 10
    var y = Math.round(Math.random() * (canvas.height - 20)) + 10;

    return { x: x, y: y };
  };

  var drawVertex = function (canvas, vertex, i) {
    var context = canvas.getContext("2d");

    // draw white circle
    context.beginPath();
    context.arc(vertex.x, vertex.y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();

    // draw circle border
    context.arc(vertex.x, vertex.y, 10, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();

    // draw letter
    context.font = "18px Arial";
    context.fillStyle = "black";
    var letter = String.fromCharCode(65 + i);
    context.fillText(letter, vertex.x - 7, vertex.y + 7);
  };

  var drawEdge = function (canvas, from, to, color, width) {
    var context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  };

  var calculateDistance = function (from, to) {
    var x2 = Math.pow(from.x - to.x, 2);
    var y2 = Math.pow(from.y - to.y, 2);
    var h2 = x2 + y2;

    return Math.round(Math.sqrt(h2));
  };

  var calculateSolutionDistance = function (solution) {
    var distance = 0;

    for (var i = 0; i < solution.length - 1; i += 1) {
      distance += calculateDistance(solution[i], solution[i + 1]);
    }

    return distance;
  };

  var drawTour = function (canvas, solution) {
    for (var i = 0; i < solution.length - 1; i += 1) {
      var from = solution[i];
      var to = solution[i + 1];

      drawEdge(canvas, from, to, "blue", 2);
    }
  };

  var drawDistance = function (index) {
    var canvas = canvases[index];
    var context = canvas.getContext("2d");
    var distance = distances[index];

    var rank = rankedDistances.indexOf(distance);
    var color;
    if (rank < 6) {
      color = "green";
      dead = ""
    } else if (rank < 11) {
      color = "red";
      dead = ""
    } else {
      color = "gray";
      dead = " (dead)"
    }

    context.font = "16px Arial";
    context.fillStyle = color;
    context.fillText("Distance: " + distance + dead, 10, 25);
  };

  var randomChromosome = function () {
    var chromosome = [];

    for (var i = 0; i < vertices.length; i += 1) {
      var index = Math.floor(Math.random() * (vertices.length - i));
      chromosome.push(index);
    };

    return chromosome;
  };

  var setupPanes = function () {
    var bodyHeight = Math.max(
      window.innerHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight
    );

    var bodyWidth = Math.max(
      window.innerWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth
    );

    var panes = document.getElementsByClassName("pane");

    for (var i = 0; i < panes.length; i += 1) {
      var height = Math.floor(bodyHeight / 4) - 8;
      var width = Math.floor(bodyWidth / 4) - 8;

      panes[i].style.height = height + "px";
      panes[i].style.width = width + "px";

      if (i > 0) {
        panes[i].height = height;
        panes[i].width = width;
      }
    }
  };

  var evolve = function () {
    cull();
    rankSolutions();

    var topSix = [];
    var bottomFour = [];

    for (var i = 0; i < 6; i += 1) {
      var distance = rankedDistances[i];
      var index = distances.indexOf(distance);
      var chromosome = chromosomes[index];

      topSix.push(chromosome);
    }

    for (var i = 6; i < 10; i += 1) {
      var distance = rankedDistances[i];
      var index = distances.indexOf(distance);
      var chromosome = chromosomes[index];

      bottomFour.push(chromosome);
    }

    var generation = breed(topSix);

    generation.push(mutateOne(topSix));
    generation.push(mutateOne(bottomFour));

    chromosomes = chromosomes.concat(generation);
  };

  var breed = function (topSix) {
    var pairs = [
      [topSix[0], topSix[1]],
      [topSix[2], topSix[3]],
      [topSix[4], topSix[5]]
    ];

    var children = [];

    for (var i = 0; i < pairs.length; i += 1) {
      var parents = pairs[i];

      var mother = parents[0];
      var father = parents[1];
      var child = [];

      for (var j = 0; j < nodes / 2; j += 1) {
        child.push(mother[j]);
      }

      for (var j = nodes / 2; j < nodes; j += 1) {
        child.push(father[j]);
      }

      children.push(child);
    }

    return children;
  };

  var mutateOne = function (array) {
    var index = Math.floor(Math.random() * array.length);
    return mutate(array[index]);
  };

  var mutate = function (chromosome) {
    var index = Math.floor(Math.random() * chromosome.length);

    var currentValue = chromosome[index];
    var newValue = (currentValue + 1) % (chromosome.length - index);

    var newChromosome = chromosome.slice(0);
    newChromosome[index] = newValue;

    return newChromosome;
  };

  var cull = function () {
    var topTen = [];

    for (var i = 0; i < 10; i += 1) {
      var distance = rankedDistances[i];
      var index = distances.indexOf(distance);
      var chromosome = chromosomes[index];

      topTen.push(chromosome);
    }

    chromosomes = topTen;
  };

  var rankSolutions = function () {
    for (var i = 0; i < chromosomes.length; i += 1) {
      var chromosome = chromosomes[i];

      var solution = solutionForChromosome(chromosome);
      var distance = calculateSolutionDistance(solution);

      solutions[i] = solution;
      distances[i] = distance;
    }

    rankedDistances = distances.slice(0);
    rankedDistances.sort(comparator);
  };

  // http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  var params = getQueryParams(location.search);

  if (typeof params.speed === "undefined") {
    delay = 300;
  } else if (params.speed == "normal") {
    delay = 300;
  } else if (params.speed == "fast") {
    delay = 1;
  } else if (params.speed == "slow") {
    delay = 1000;
  }

  if (typeof params.nodes === "undefined") {
    nodes = 6;
  } else {
    nodes = params.nodes;
  }

  if (typeof params.algorithm === "undefined") {
    comparator = function (a, b) { return a - b; };
  } else if (params.algorithm === "longest") {
    comparator = function (a, b) { return b - a; };
  } else {
    comparator = function (a, b) { return a - b; };
  }

  var controls = document.getElementsByClassName("control");

  // http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
  function queryString( obj ) {
    return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
  }

  for (var i = 0; i < controls.length; i += 1) {
    var control = controls[i];

    var key = control.getAttribute("data-key");
    var value = control.getAttribute("data-value");

    var clone = JSON.parse(JSON.stringify(params));
    clone[key] = value;

    var query = queryString(clone);
    control.setAttribute("href", query);
  }
};
