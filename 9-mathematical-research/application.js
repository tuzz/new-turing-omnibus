var Application = function (canvas, span) {
  var self = this;
  var view = new View(canvas);
  var width = 600;
  var height = 900;
  var iterations = 0;
  var up = true;

  self.run = function () {
    setInterval(function () {
      if (up) {
        iterations += 1;
        if (iterations == 51) {
          up = false;
        }
      } else {
        iterations -= 1;
        if (iterations == 1) {
          up = true;
        }
      }

      self.draw();
      span.innerHTML = "Iterations: " + iterations;
    }, 100);
  }

  self.draw = function () {
    var acorn = -2.4;
    var bcorn = -1.2;
    var size = 2.4;

    for (var j = 0; j < height; j++) {
      for (var k = 0; k < width; k++) {
        var count = 0;
        var ca = acorn + j * size / 600;
        var cb = bcorn + k * size / 600;
        var zx = 0;
        var zy = 0;
        while (true) {
          count = count + 1;
          var x2 = zx * zx;
          var y2 = zy * zy;
          var xtemp = x2 - y2;
          zy = 2 * zx * zy + cb;
          zx = xtemp + ca;
          if (count === iterations || x2 + y2 > 4) {
            break;
          }
        }

        var darker = 255 - (count % 5) / 5 * 255;
        var lighter = (count % 5) / 5 * 255;

        if (count === iterations) {
          view.setPixel(j, k, { r: 0, g: 0, b: 0 });
        } else if (count < 5) {
          view.setPixel(j, k, { r: lighter, g: 0, b: 0 });
        } else if (count < 10) {
          view.setPixel(j, k, { r: 255, g: lighter, b: 0 });
        } else if (count < 15) {
          view.setPixel(j, k, { r: 255, g: 255, b: 0 });
        } else {
          view.setPixel(j, k, { r: 255, g: 255, b: 255 });
        }
      }
    }

    view.render();
  };
};
