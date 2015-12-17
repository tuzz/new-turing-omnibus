var Application = function (params) {
  var self = this;
  var sourceCanvas = document.getElementById(params.sourceId);
  var targetCanvas = document.getElementById(params.targetId);
  var sourceContext = sourceCanvas.getContext("2d");
  var targetContext = targetCanvas.getContext("2d");
  var image = new Image(sourceCanvas.width, sourceCanvas.height);
  image.src = params.imageName;

  self.run = function () {
    image.onload = function () {
      resizeCanvas(sourceCanvas);
      resizeCanvas(targetCanvas);
      renderSourceImage();
      renderLoop();
    };
  }

  var resizeCanvas = function (canvas) {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
  };

  var renderSourceImage = function () {
    var context = sourceCanvas.getContext("2d");
    context.drawImage(image, 0, 0);
  };

  var renderLoop = function () {
    setInterval(function () {
      var point = randomPoint();

      if (sourceContains(point)) {
        setColor(point);
        drawPoint(point);
      }
    }, 1);
  };

  var randomPoint = function () {
    var x = Math.floor(Math.random() * targetCanvas.width);
    var y = Math.floor(Math.random() * targetCanvas.height);

    return { x: x, y: y };
  };

  var sourceContains = function (point) {
    var data = sourceContext.getImageData(point.x, point.y, 1, 1).data;
    return data[0] === 0 && data[1] === 0 && data[2] === 0;
  };

  var setColor = function (point) {
    var color = "#009900";

    if (point.y < 70) {
      color = "#cccc00";
    } else if (point.y > 270) {
      color = "#663300";
    }

    targetContext.fillStyle = color;
  };

  var drawPoint = function (point) {
    targetContext.fillRect(point.x, point.y, 1, 1);
  };
};
