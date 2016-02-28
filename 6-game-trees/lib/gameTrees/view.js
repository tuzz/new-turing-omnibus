"use strict";

var View = function (game, playerCallback) {
  var self = this;

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var gridColor = "gray";

  self.update = function () {
    context.lineWidth = 10;

    drawGrid();
    drawNoughts();
    drawCrosses();

    canvas.onmousedown = touch;
  };

  self.won = function () {
    gridColor = "red";
    canvas.style.cursor = "default";
    self.update();
  };

  self.lost = function () {
    gridColor = "blue";
    canvas.style.cursor = "default";
    self.update();
  };

  self.drew = function () {
    gridColor = "black";
    canvas.style.cursor = "default";
    self.update();
  };

  var drawGrid = function () {
    context.strokeStyle = gridColor;

    context.beginPath();
    context.moveTo(125, 0);
    context.lineTo(125, 380);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(255, 0);
    context.lineTo(255, 380);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, 125);
    context.lineTo(380, 125);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, 255);
    context.lineTo(380, 255);
    context.stroke();
    context.closePath();
  };

  var drawNoughts = function () {
    context.strokeStyle = "blue";
    var radius = 40;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (game.board.get(x, y) === "O") {
          context.beginPath();
          context.arc(center(x), center(y), radius, 0, 2 * Math.PI);
          context.stroke();
          context.closePath();
        }
      }
    }
  };

  var drawCrosses = function () {
    context.strokeStyle = "red";
    var radius = 40;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (game.board.get(x, y) === "X") {
          var xCenter = center(x);
          var yCenter = center(y);

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter - radius, yCenter - radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter - radius, yCenter + radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter + radius, yCenter - radius);
          context.stroke();
          context.closePath();

          context.beginPath();
          context.moveTo(xCenter, yCenter);
          context.lineTo(xCenter + radius, yCenter + radius);
          context.stroke();
          context.closePath();
        }
      }
    }
  };

  var center = function (x) {
    if (x == 0) {
      return 60;
    } else if (x == 1) {
      return 190;
    } else {
      return 320;
    }
  };

  var touch = function (event) {
    var viewCoordinates = eventCoordinates(event);
    var boardCoordinates = convertCoordinates(viewCoordinates);

    playerCallback(boardCoordinates.x, boardCoordinates.y);
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

  var convertCoordinates = function (coordinates) {
    var viewX = coordinates.x;
    var viewY = coordinates.y;
    var boardX, boardY;

    if (viewX < 125) {
      boardX = 0;
    } else if (viewX < 255) {
      boardX = 1;
    } else {
      boardX = 2;
    }

    if (viewY < 125) {
      boardY = 0;
    } else if (viewY < 255) {
      boardY = 1;
    } else {
      boardY = 2;
    }

    return { x: boardX, y: boardY };
  };
};

module.exports = View;
