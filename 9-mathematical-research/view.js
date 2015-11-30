var View = function (canvas) {
  var self = this;
  var width = 900;
  var height = 600;
  var context = canvas.getContext("2d");
  var data = new Array(width * height * 4);

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
  };
};
