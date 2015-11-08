"use strict";

var _ = require("underscore");

var CloudsAnimator = function (retina) {
  var self = this;
  var frame = 0;

  var cloudCells = [
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },

    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 7, y: 1 },
    { x: 8, y: 1 },

    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },

    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
    { x: 7, y: 3 },
    { x: 8, y: 3 },

    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 6, y: 4 },
    { x: 7, y: 4 },
    { x: 8, y: 4 },
    { x: 9, y: 4 },

    { x: 0, y: 5 },
    { x: 1, y: 5 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },

    { x: 0, y: 6 },
    { x: 1, y: 6 },
    { x: 2, y: 6 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 6 },
    { x: 8, y: 6 },
    { x: 9, y: 6 },

    { x: 1, y: 7 },
    { x: 2, y: 7 },
    { x: 3, y: 7 },
    { x: 4, y: 7 },
    { x: 5, y: 7 },
    { x: 6, y: 7 },
    { x: 7, y: 7 },
    { x: 8, y: 7 },
    { x: 9, y: 7 }
  ];


  var clouds = [
    { position: { x: 0, y: 7 }, cells: cloudCells, speed: 1 },
    { position: { x: 25, y: 9 }, cells: cloudCells, speed: 1 },
    { position: { x: 50, y: 11 }, cells: cloudCells, speed: 1 },
    { position: { x: 75, y: 9 }, cells: cloudCells, speed: 1 },

    { position: { x: 10, y: 37 }, cells: cloudCells, speed: 2 },
    { position: { x: 35, y: 35 }, cells: cloudCells, speed: 2 },
    { position: { x: 60, y: 33 }, cells: cloudCells, speed: 2 },
    { position: { x: 85, y: 35 }, cells: cloudCells, speed: 2 },
  ];

  self.nextFrame = function () {
    clear();

    _.each(clouds, function (cloud) {
      _.each(cloud.cells, function (cell) {
        retina.set({
          x: (cell.x + cloud.position.x + (frame * cloud.speed)) % retina.width,
          y: cell.y + cloud.position.y,
          dark: 0
        });
      });
    });

    frame += 1;
  };

  var clear = function () {
    for (var y = 0; y < retina.height; y += 1) {
      for (var x = 0; x < retina.width; x += 1) {
        retina.set({ x: x, y: y, dark: 1 });
      }
    }
  };
};

module.exports = CloudsAnimator;
