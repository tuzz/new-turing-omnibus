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
