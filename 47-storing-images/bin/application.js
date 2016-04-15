(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var MandelbrotSet = require("./mandelbrotSet");
var Decomposer = require("./decomposer");
var View = require("./view");
var QuadTree = require("./quadTree");
var Game = require("./game");
var HumanPlayer = require("./humanPlayer");
var ComputerPlayer = require("./computerPlayer");
var PositionEvaluator = require("./positionEvaluator");

var Application = function () {
  var self = this;
  var game, view;

  self.run = function () {
    var mandelbrotSet = new MandelbrotSet({
      realMin: -1.2 - Math.random(),
      realMax: 0.2 + Math.random(),
      imagMin: -0.7 - Math.random(),
      imagMax: 0.7 + Math.random(),
      width: 512,
      height: 512,
      iterations: Math.round(Math.random() * 35) + 15
    });

    var imageMatrix = mandelbrotSet.toImageMatrix();
    var quadTree = Decomposer.decompose(imageMatrix);
    var player1 = new HumanPlayer(false);
    var player2 = new ComputerPlayer(false);

    game = new Game(quadTree, player1, player2);
    view = new View("canvas", player1.callback);

    view.setQuadTree(quadTree);
    view.render();

    nextTurn();
  };

  var nextTurn = function () {
    game.nextTurn(function () {
      view.setQuadTree(game.quadTree);
      view.render();

      setTimeout(function () {
        if (game.finished()) {
          displayWinner();
        } else {
          nextTurn();
        }
      }, 50);
    });
  };

  var displayWinner = function () {
    var evaluation = PositionEvaluator.evaluate(game.quadTree, true);

    if (evaluation > 0) {
      view.won();
    } else if (evaluation < 0) {
      view.lost();
    } else {
      view.drew();
    }
  };
};

module.exports = Application;

if (typeof window !== "undefined") {
  window.Application = Application;
}

},{"./computerPlayer":3,"./decomposer":4,"./game":5,"./humanPlayer":6,"./mandelbrotSet":8,"./positionEvaluator":11,"./quadTree":12,"./view":13}],2:[function(require,module,exports){
"use strict";

var ImageMatrix = require("./imageMatrix");

var Composer = function () {
  var self = this;

  self.compose = function (quadTree) {
    return combine(quadTree.root, quadTree.size);
  };

  var combine = function (node, size) {
    var imageMatrix = new ImageMatrix(size, size);

    if (typeof node.value === "undefined") {
      var children = node.children;
      var regions = [];

      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        var region = combine(child, size / 2);

        regions.push(region);
      }

      var northEast = regions[0];
      var northWest = regions[1];
      var southWest = regions[2];
      var southEast = regions[3];

      addRegion(imageMatrix, northEast, size / 2, 0);
      addRegion(imageMatrix, northWest, 0, 0);
      addRegion(imageMatrix, southWest, 0, size / 2);
      addRegion(imageMatrix, southEast, size / 2, size / 2);
    } else {
      var color = node.value;

      for (var x = 0; x < size; x += 1) {
        for (var y = 0; y < size; y += 1) {
          imageMatrix.set(x, y, color);
        }
      }
    }

    return imageMatrix;
  };

  var addRegion = function (imageMatrix, region, xFrom, yFrom) {
    for (var x = 0; x < region.width; x += 1) {
      for (var y = 0; y < region.height; y += 1) {
        var color = region.get(x, y);
        imageMatrix.set(xFrom + x, yFrom + y, color);
      }
    }
  }
};

Composer.compose = function (quadTree) {
  return new Composer().compose(quadTree);
};

module.exports = Composer;

},{"./imageMatrix":7}],3:[function(require,module,exports){
"use strict";

var PositionEvaluator = require("./positionEvaluator");
var MinimaxProcedure = require("./minimaxProcedure");
var QuadTree = require("./quadTree");

var ComputerPlayer = function (bool) {
  var self = this;

  self.playTurn = function (tree, callback) {
    evaluatePositions(tree);
    runMinimax(tree);

    setTimeout(function () {
      gust();

      setTimeout(function () {
        callback(bestPosition(tree));
      }, 1500);
    }, 500);
  };

  var evaluatePositions = function (tree) {
    var size = tree.size;
    var nodes = [tree.root];

    while (size > 2) {
      var childNodes = [];

      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        childNodes = childNodes.concat(node.children);
      }

      nodes = childNodes;
      size = size / 2;
    }

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var quadTree = new QuadTree(node);
      quadTree.size = 2;

      if (node.children.length !== 0) {
        node.score = PositionEvaluator.evaluate(quadTree, bool);
      }
    }
  };

  var runMinimax = function (tree) {
    MinimaxProcedure.run(tree);
  };

  var bestPosition = function (tree) {
    var root = tree.root;
    var children = root.children;
    var bestChild;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (typeof child.score === "undefined") {
        continue;
      }

      if (!bestChild || child.score > bestChild.score) {
        bestChild = child;
      }
    }

    updateDialog(children, bestChild);

    var bestTree = new QuadTree(bestChild);
    bestTree.size = tree.size / 2;
    return bestTree;
  };

  var updateDialog = function (children, bestChild) {
    var index = children.indexOf(bestChild);
    var quadrant = ["northEast", "northWest", "southWest", "southEast"][index];

    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "The wind blows you " + quadrant + ".";
  };

  var gust = function () {
    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "Uh oh, a sudden gust!";
  };
};

module.exports = ComputerPlayer;

},{"./minimaxProcedure":9,"./positionEvaluator":11,"./quadTree":12}],4:[function(require,module,exports){
"use strict";

var ImageMatrix = require("./imageMatrix");
var QuadTree = require("./quadTree");
var Node = require("./node");

var Decomposer = function () {
  var self = this;

  self.decompose = function (imageMatrix) {
    var root = subdivide(imageMatrix);
    var quadTree = new QuadTree(root);

    quadTree.size = imageMatrix.width;
    return quadTree;
  };

  var subdivide = function (imageMatrix) {
    if (entirelyTrue(imageMatrix)) {
      return new Node(true);
    } else if (entirelyFalse(imageMatrix)) {
      return new Node(false);
    } else {
      var fullSize = imageMatrix.width;
      var halfSize = fullSize / 2;

      var northEast = quadrant(imageMatrix, halfSize, fullSize, 0, halfSize);
      var northWest = quadrant(imageMatrix, 0, halfSize, 0, halfSize);
      var southWest = quadrant(imageMatrix, 0, halfSize, halfSize, fullSize);
      var southEast = quadrant(imageMatrix, halfSize, fullSize, halfSize, fullSize);

      var node = new Node();

      node.addChild(subdivide(northEast));
      node.addChild(subdivide(northWest));
      node.addChild(subdivide(southWest));
      node.addChild(subdivide(southEast));

      return node;
    }
  }

  var entirelyTrue = function (imageMatrix) {
    return entirelyBool(imageMatrix, true);
  };

  var entirelyFalse = function (imageMatrix) {
    return entirelyBool(imageMatrix, false);
  };

  var entirelyBool = function (imageMatrix, bool) {
    for (var x = 0; x < imageMatrix.width; x += 1) {
      for (var y = 0; y < imageMatrix.height; y += 1) {
        var color = imageMatrix.get(x, y);

        if (color !== bool) {
          return false;
        }
      }
    }

    return true;
  };

  var quadrant = function (imageMatrix, xFrom, xTo, yFrom, yTo) {
    var size = xTo - xFrom;
    var quadrantMatrix = new ImageMatrix(size, size);

    for (var x = xFrom; x < xTo; x += 1) {
      for (var y = yFrom; y < yTo; y += 1) {
        var color = imageMatrix.get(x, y);
        quadrantMatrix.set(x - xFrom, y - yFrom, color);
      }
    }

    return quadrantMatrix;
  };
};

Decomposer.decompose = function (imageMatrix) {
  return new Decomposer().decompose(imageMatrix);
};

module.exports = Decomposer;

},{"./imageMatrix":7,"./node":10,"./quadTree":12}],5:[function(require,module,exports){
"use strict";

var PositionEvaluator = require("./positionEvaluator");

var Game = function (quadTree, player1, player2) {
  var self = this;

  self.quadTree = quadTree;
  self.currentPlayer = player1;

  self.nextTurn = function (callback) {
    self.currentPlayer.playTurn(self.quadTree, function (quadTree) {
      self.quadTree = quadTree;

      if (self.currentPlayer === player1) {
        self.currentPlayer = player2;
      } else {
        self.currentPlayer = player1;
      }

      callback();
    });
  };

  self.finished = function () {
    return PositionEvaluator.finished(self.quadTree);
  };
};

module.exports = Game;

},{"./positionEvaluator":11}],6:[function(require,module,exports){
"use strict";

var HumanPlayer = function (bool) {
  var self = this;
  var currentTree, turnToPlay;

  self.callback = function (quadrant) {
    if (!turnToPlay) {
      return;
    }

    var chosenQuadrant = currentTree[quadrant]();

    if (chosenQuadrant.root.children.length === 0) {
      return;
    }

    updateDialog(quadrant);

    turnToPlay(chosenQuadrant);
    turnToPlay = undefined;
  };

  self.playTurn = function (tree, callback) {
    currentTree = tree;
    turnToPlay = callback;
  };

  var updateDialog = function (quadrant) {
    if (typeof document === "undefined") {
      return;
    }

    var dialog = document.getElementById("dialog");
    dialog.innerHTML = dialog.innerHTML + "<br/>" + "You steer " + quadrant + ".";
  };
};

module.exports = HumanPlayer;

},{}],7:[function(require,module,exports){
"use strict";

var ImageMatrix = function (width, height) {
  var self = this;
  var data = new Array(width);

  for (var x = 0; x < width; x += 1) {
    data[x] = new Array(height);

    for (var y = 0; y < height; y += 1) {
      data[x][y] = false;
    }
  }

  self.width = width;
  self.height = height;

  self.get = function (x, y) {
    return data[x][y];
  };

  self.set = function (x, y, bool) {
    data[x][y] = bool;
  }
};

module.exports = ImageMatrix;

},{}],8:[function(require,module,exports){
"use strict";

var ImageMatrix = require("./imageMatrix");

var MandelbrotSet = function (params) {
  var self = this;
  var setMemberships = {};

  var realMin = params.realMin;
  var realMax = params.realMax;
  var imagMin = params.imagMin;
  var imagMax = params.imagMax;
  var width = params.width;
  var height = params.height;
  var iterations = params.iterations;

  var initialize = function () {
    var realWidth = realMax - realMin;
    var imagHeight = imagMax - imagMin;

    for (var x = 0; x < height; x += 1) {
      setMemberships[x] = {};

      eachPixel: for (var y = 0 ; y < width; y += 1) {
        var real = x / width * realWidth + realMin;
        var imag = y / height * imagHeight + imagMin;
        var zReal = 0;
        var zImag = 0;

        for (var i = 0; i < iterations; i += 1) {
          var r2 = zReal * zReal;
          var i2 = zImag * zImag;

          if (r2 + i2 > 4) {
            setMemberships[x][y] = false;
            continue eachPixel;
          } else {
            zImag = 2 * zReal * zImag + imag;
            zReal = r2 - i2 + real;
          }
        }

        setMemberships[x][y] = true;
      }
    }
  };

  self.isMember = function (x, y) {
    return setMemberships[x][y];
  };

  self.toImageMatrix = function () {
    if (typeof self.imageMatrix === "undefined") {
      var imageMatrix = new ImageMatrix(width, height);

      for (var x = 0; x < width; x += 1) {
        for (var y = 0; y < height; y += 1) {
          var color = self.isMember(x, y);
          imageMatrix.set(x, y, color);
        }
      }

      self.imageMatrix = imageMatrix;
    }

    return self.imageMatrix;
  };

  initialize();
};

module.exports = MandelbrotSet;

},{"./imageMatrix":7}],9:[function(require,module,exports){
"use strict";

var MinimaxProcedure = function (tree) {
  var self = this;

  self.run = function () {
    minimax(tree.root, true);
  };

  var minimax = function (node, maximise) {
    if (typeof node.score !== "undefined") {
      return;
    }

    var children = node.children;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      minimax(child, !maximise);

      if (typeof node.score === "undefined") {
        node.score = child.score;
      } else if (maximise && child.score > node.score) {
        node.score = child.score;
      } else if (!maximise && child.score < node.score) {
        node.score = child.score;
      }
    }
  };
};

MinimaxProcedure.run = function (tree) {
  new MinimaxProcedure(tree).run();
};

module.exports = MinimaxProcedure;

},{}],10:[function(require,module,exports){
"use strict";

var Node = function (value) {
  var self = this;

  self.value = value;
  self.children = [];

  self.addChild = function (node) {
    self.children.push(node);
  };
};

module.exports = Node;

},{}],11:[function(require,module,exports){
"use strict";

var PositionEvaluator = function (quadTree, bool) {
  var self = this;

  self.evaluate = function () {
    if (!self.finished()) {
      throw new Error("I'm not smart enough to evaluate unfinished games");
    }

    if (won()) {
      return 1;
    } else if (lost()) {
      return -1;
    } else {
      return 0;
    }
  };

  var won = function () {
    return count(bool) > 2;
  };

  var lost = function () {
    return count(bool) < 2;
  };

  var drawn = function () {
    return count(bool) === 2;
  };

  var count = function () {
    var children = quadTree.root.children;

    if (children.length === 0) {
      throw new Error("Unable to evaluate childless nodes");
    }

    var count = 0;

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (child.value === bool) {
        count += 1;
      }
    }

    return count;
  };

  self.finished = function () {
    return quadTree.size === 2;
  };
};

PositionEvaluator.evaluate = function (quadTree, bool) {
  return new PositionEvaluator(quadTree, bool).evaluate();
};

PositionEvaluator.finished = function (quadTree) {
  return new PositionEvaluator(quadTree).finished();
}

module.exports = PositionEvaluator;

},{}],12:[function(require,module,exports){
"use strict";

var QuadTree = function (root) {
  var self = this;
  self.root = root;

  self.northEast = function () {
    return subtree(0);
  };

  self.northWest = function () {
    return subtree(1);
  }

  self.southWest = function () {
    return subtree(2);
  }

  self.southEast = function () {
    return subtree(3);
  }

  var subtree = function (childIndex) {
    var children = self.root.children;

    if (children.length === 0) {
      return;
    }

    var node = children[childIndex];
    var subtree = new QuadTree(node);
    subtree.size = self.size / 2;

    return subtree;
  };
};

module.exports = QuadTree;

},{}],13:[function(require,module,exports){
var Composer = require("./composer");

var View = function (canvasId, playerCallback) {
  var self = this;
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var data = new Array(width * height * 4);
  var hoveredQuadrant;
  var disabledQuadrants;
  var gameOver = false;
  var result;
  var output = false;

  self.setQuadTree = function (quadTree) {
    var imageMatrix = Composer.compose(quadTree);
    gameOver = quadTree.size === 2;

    var xRatio = imageMatrix.width / width;
    var yRatio = imageMatrix.height / height;

    for (var x = 0; x < width; x += 1) {
      for (var y = 0; y < height; y += 1) {
        var imageMatrixX = Math.floor(x * xRatio);
        var imageMatrixY = Math.floor(y * yRatio);

        if (imageMatrix.get(imageMatrixX, imageMatrixY)) {
          color = { r: 253, g: 227, b: 150 };
        } else {
          color = { r: 34, g: 156, b: 228 };
        }

        self.setPixel(x, y, color);
      }
    }

    var root = quadTree.root;
    var children = root.children;

    disabledQuadrants = [];

    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];

      if (child.children.length === 0) {
        var disabled = ["northEast", "northWest", "southWest", "southEast"][i];
        disabledQuadrants.push(disabled);
      }
    }
  };

  self.setPixel = function (x, y, color) {
    if (x < 0 || x >= width || y < 0 || y > height) {
      throw new Error("Out of bounds (" + x + ", " + y + ")");
    }

    data[(y * width + x) * 4 + 0] = color.r;
    data[(y * width + x) * 4 + 1] = color.g;
    data[(y * width + x) * 4 + 2] = color.b;
    data[(y * width + x) * 4 + 3] = 255;
  };

  self.render = function () {
    var imageData = context.createImageData(canvas.width, canvas.height);

    for (var i = 0; i < data.length; i += 1) {
      imageData.data[i] = data[i];
    }

    context.putImageData(imageData, 0, 0);

    if (!gameOver) {
      drawHighlight(hoveredQuadrant, "rgba(255, 255, 255, 0.25)", true);
      drawDisabledQuadrants();
    }

    drawGridLines();
    drawCompassLabels();

    if (gameOver) {
      disabledQuadrants = ["northWest", "northEast", "southEast", "southWest"];
      drawDisabledQuadrants();

      drawResult();
      canvas.style.cursor = "default";

      if (!output) {
        var dialog = document.getElementById("dialog");
        dialog.innerHTML = dialog.innerHTML + "<br/>" + "Game over. Refresh to play again.";
        output = true;
      }
    }
  };

  var drawResult = function () {
    var x = 100;
    var y = 100;
    var color, text;

    color = "white";

    if (result === 1) {
      text = "Expertly handled. A safe landing!";
    } else if (result === 0) {
      text = "It was close, but you made it!";
    } else if (result === -1) {
      text = "You missed. Now you're shark food.";

      var image = new Image();
      image.onload = function() {
        context.drawImage(image, 190, 205);
      };
      image.src = "shark.jpg";
    } else {
      return;
    }

    context.font = "50px Arial";
    context.fillStyle = color;
    context.fillText(text, x, y);
  };

  self.won = function () {
    result = 1;
    self.render();
  };

  self.lost = function () {
    result = -1;
    self.render();
  };

  self.drew = function () {
    result = 0;
    self.render();
  };

  var drawGridLines = function () {
    if (!gameOver) {
      context.strokeStyle = "#ccc";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(width / 4, 0);
      context.lineTo(width / 4, height);
      context.stroke();
      context.moveTo(0, height / 4);
      context.lineTo(width, height / 4);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(width / 4 * 3, 0);
      context.lineTo(width / 4 * 3, height);
      context.stroke();
      context.moveTo(0, height / 4 * 3);
      context.lineTo(width, height / 4 * 3);
      context.stroke();
      context.closePath();
    };

    context.strokeStyle = "black";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    context.closePath();
  };

  var drawCompassLabels = function () {
    context.font = "30px Times";
    context.fillStyle = "black";

    if (disabledQuadrants.indexOf("northWest") === -1) {
      context.fillText("NW", 15, 40);
    }

    if (disabledQuadrants.indexOf("northEast") === -1) {
      context.fillText("NE", width - 60, 40);
    }

    if (disabledQuadrants.indexOf("southWest") === -1) {
      context.fillText("SW", 15, height - 20);
    }

    if (disabledQuadrants.indexOf("southEast") === -1) {
      context.fillText("SE", width - 60, height - 20);
    }
  };

  var drawHighlight = function (quadrant, color, notIfDisabled) {
    context.beginPath();
    context.fillStyle = color;

    if (notIfDisabled && disabledQuadrants.indexOf(quadrant) !== -1) {
      return;
    }

    if (quadrant === "northWest") {
      context.rect(0, 0, width / 2, height / 2);
      context.fill();
    } else if (quadrant === "northEast") {
      context.rect(width / 2, 0, width, height / 2);
      context.fill();
    } else if (quadrant === "southWest") {
      context.rect(0, height / 2, width / 2, height / 2);
      context.fill();
    } else if (quadrant === "southEast") {
      context.rect(width / 2, height / 2, width, height / 2);
      context.fill();
    }

    context.closePath();
  };

  var drawDisabledQuadrants = function () {
    for (var i = 0; i < disabledQuadrants.length; i += 1) {
      var quadrant = disabledQuadrants[i];

      var pattern = document.createElement("canvas");
      var patternContext = pattern.getContext("2d");
      pattern.width = 16;
      pattern.height = 16;
      patternContext.fillStyle = "rgba(100, 100, 100, 0.5)";
      patternContext.fillRect(0, 0, 16, 16);
      patternContext.moveTo(0, 0);
      patternContext.lineTo(16, 16);
      patternContext.moveTo(16, 0);
      patternContext.lineTo(0, 16);
      patternContext.strokeStyle = "black";
      patternContext.stroke();
      pattern = context.createPattern(pattern, "repeat");

      drawHighlight(quadrant, pattern);
    }
  };

  var hover = function (event) {
    var quadrant = eventQuadrant(event);

    if (hoveredQuadrant !== quadrant) {
      hoveredQuadrant = quadrant;
      self.render();
    }
  };

  var touch = function (event) {
    playerCallback(eventQuadrant(event));
  };

  var eventQuadrant = function (event) {
    var viewCoordinates = eventCoordinates(event);

    var north = viewCoordinates.y < height / 2;
    var west = viewCoordinates.x < width / 2;
    var south = !north;
    var east = !west;

    if (north && west) {
      return "northWest";
    } else if (north && east) {
      return "northEast";
    } else if (south && west) {
      return "southWest";
    } else if (south && east) {
      return "southEast";
    }
  };

  var eventCoordinates = function (event) {
    var x, y;

    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return { x: x, y: y };
  }

  canvas.onmousedown = touch;
  canvas.onmousemove = hover;
};

module.exports = View;

},{"./composer":2}]},{},[1]);
