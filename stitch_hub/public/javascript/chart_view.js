var ChartView = function(cellWidth, cellHeight, model, canvas) {
  var that = Object.create(ChartView.prototype);

  var gapSize = 1;
  var rowSize = model.getRowSize();
  var colSize = model.getColSize();
  canvas.width = cellWidth * colSize + (colSize + 1) * gapSize;
  canvas.height = cellHeight * rowSize + (rowSize + 1) * gapSize;

  // Initialize by clearing the canvas first
  var canM = canvas.getContext("2d");

  that.draw = function() {
    for (var i=0; i < colSize; i++) {
      for (var j=0; j < rowSize; j++) {
        colorToUse = model.getColor(j, i);
        that.colorCell(j, i, colorToUse);
      }
    }
  };

  that.colorCell = function(row, col, color) {
    canM.fillStyle = color;
    var x = col * (gapSize + cellWidth) + gapSize;
    var y = row * (gapSize + cellHeight) + gapSize;
    canM.fillRect(x, y, cellWidth, cellHeight);
  };

  that.getCanvas = function() {
    return canvas;
  };

  that.getCell = function(mouseEvt) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = Math.floor(mouseEvt.clientX - rect.left);
    var mouseY = Math.floor(mouseEvt.clientY - rect.top);
    if ((mouseX % (gapSize + cellWidth)) < gapSize) {
      return null;
    } else if ((mouseY % (gapSize + cellHeight)) < gapSize) {
      return null;
    } else {
      return { 
        col: Math.floor(mouseX / (gapSize + cellWidth)), 
        row: Math.floor(mouseY / (gapSize + cellHeight))
      };
    }
  };

  // clear and initialize grid color
  canM.clearRect(0, 0, canvas.width, canvas.height);
  canM.fillStyle = '#000000';
  canM.fillRect(0, 0, canvas.width, canvas.height);
  for (var i=0; i < colSize; i++) {
    for (var j=0; j < rowSize; j++) {
      that.colorCell(j, i, '#FFFFFF');
    }
  }

  Object.freeze(that);
  return that;
};

// subclasses
var CrossStitchChartView = function(model, canvas) {
  return ChartView(12, 12, model, canvas);
};

var KnitChartViewVert = function(model, canvas) {
  return ChartView(12, 15, model, canvas);
};

var CrochetChartViewVert = function(model, canvas) {
  return ChartView(12, 16, model, canvas);
};

var KnitChartViewHoriz = function(model, canvas) {
  return ChartView(15, 12, model, canvas);
};

var CrochetChartViewHoriz = function(model, canvas) {
  return ChartView(16, 12, model, canvas);
};