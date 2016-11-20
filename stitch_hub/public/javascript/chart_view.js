var ChartView = function(cellWidth, cellHeight, model, canvas) {
  var that = Object.create(ChartView.prototype);

  var rowSize = model.getRowSize();
  var colSize = model.getColSize();
  canvas.width = cellWidth * colSize;
  canvas.height = cellHeight * rowSize;

  // Initialize by clearing the canvas first
  var canM = canvas.getContext("2d");
  canM.clearRect(0, 0, canvas.width, canvas.height);

  that.draw = function() {
    for (var i=0; i < colSize; i++) {
      for (var j=0; j < rowSize; j++) {
        colorToUse = model.getColor(j, i);
        canM.fillStyle = colorToUse;
        canM.fillRect(cellWidth*i,cellHeight*j, cellWidth, cellHeight);
      }
    }
  };

  that.colorCell = function(row, col, color) {
    canM.fillStyle = color;
    canM.fillRect(cellWidth*col,cellHeight*row, cellWidth, cellHeight);
  };

  that.getCanvas = function() {
    return canvas;
  };

  that.getCell = function(mouseEvt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = Math.floor(mouseEvt.clientX - rect.left);
    mouseY = Math.floor(mouseEvt.clientY - rect.top);
    return { 
      col: Math.floor(mouseX / cellWidth), 
      row: Math.floor(mouseY / cellHeight)
    };
  };

  Object.freeze(that);
  return that;
};

// subclasses
var CrossStitchChartView = function(model, canvas) {
  return ChartView(10, 10, model, canvas);
};

var KnitChartView = function(model, canvas) {
  return ChartView(10, 20, model, canvas);
};

var CrochetChartView = function(model, canvas) {
  return ChartView(10, 15, model, canvas);
};