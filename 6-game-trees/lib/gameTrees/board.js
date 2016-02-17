"use strict";

var Board = function (data) {
  var self = this;

  self.get = function (x, y) {
    return data[y][x];
  };

  self.set = function (x, y, symbol) {
    data[y][x] = symbol;
  };

  self.nextToPlay = function () {
    var noughts = 0;
    var crosses = 0;

    for (var y = 0; y < data.length; y += 1) {
      var row = data[y];

      for (var x = 0; x < row.length; x += 1) {
        var symbol = row[x];

        if (symbol === "O") {
          noughts += 1;
        } else if (symbol === "X") {
          crosses += 1;
        }
      }
    }

    return crosses <= noughts ? "X" : "O";
  };

  self.clone = function () {
    var clonedData = [];

    for (var y = 0; y < 3; y += 1) {
      var row = data[y];
      var clonedRow = row.slice(0);

      clonedData.push(clonedRow);
    }

    return new Board(clonedData);
  };

  self.equal = function (other) {
    var equal = true;

    for (var y = 0; y < 3; y += 1) {
      for (var x = 0; x < 3; x += 1) {
        if (self.get(x, y) !== other.get(x, y)) {
          equal = false;
        }
      }
    }

    return equal;
  }
};

module.exports = Board;
