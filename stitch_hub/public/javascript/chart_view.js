var ChartView = function(cellWidth, cellHeight, model, canvas) {
  var that = Object.create(ChartView.prototype);

  var rowSize = model.getRowSize();
  var colSize = model.getColSize();
  canvas.width = cellWidth * colSize;
  canvas.height = cellHeight * rowSize;

  // Initialize by clearing the canvas first
  var canM = canvas.getContext("2d");
  canM.clearRect(0, 0, canvas.width, canvas.height);
  for (var i=0; i < colSize; i++) {
      for (var j=0; j < rowSize; j++) {
        canM.fillStyle = '#000000';
        canM.fillRect(cellWidth*i,cellHeight*j, cellWidth, cellHeight);
        canM.fillStyle = '#FFFFFF';
        canM.fillRect((cellWidth)*i + 1 ,(cellHeight)*j + 1, (cellWidth-1), (cellHeight-1));
      }
    }



  that.draw = function() {
    for (var i=0; i < colSize; i++) {
      for (var j=0; j < rowSize; j++) {
        colorToUse = model.getColor(j, i);
        // canM.fillStyle = colorToUse;
        // canM.fillRect(cellWidth*i,cellHeight*j, cellWidth, cellHeight);

        canM.fillStyle = '#000000';
        canM.fillRect(cellWidth*i,cellHeight*j, cellWidth, cellHeight);
        canM.fillStyle = colorToUse;
        canM.fillRect((cellWidth)*i + 1 ,(cellHeight)*j + 1, (cellWidth-1), (cellHeight-1));
      }
    }
  };

  that.colorCell = function(row, col, color) {
    canM.fillStyle = '#000000';
    canM.fillRect(cellWidth*col,cellHeight*row, cellWidth, cellHeight);
    canM.fillStyle = color;
    canM.fillRect((cellWidth)*col + 1 ,(cellHeight)*row + 1, (cellWidth-1), (cellHeight-1));
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