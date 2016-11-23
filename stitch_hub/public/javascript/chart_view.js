/**
* View implementation for chart. Provides methods for drawing a chart.
* 
* @param cellWidth the number of pixels in the width of each cell
* @param cellHeight the number of pixels in the height of each cell
* @param model the chart model representing the data of the chart
* @param canvas the DOM element which we render on
*/
var ChartView = function(cellWidth, cellHeight, model, canvas) {
  var that = Object.create(ChartView.prototype);

  var gapSize = 1;
  var rowSize = model.getRowSize();
  var colSize = model.getColSize();
  canvas.width = cellWidth * colSize + (colSize + 1) * gapSize;
  canvas.height = cellHeight * rowSize + (rowSize + 1) * gapSize;

  // define canvas context
  var ctx = canvas.getContext("2d");

  /**
  * Draws the chart based on the information in the model.
  */
  that.draw = function() {
    for (var i=0; i < colSize; i++) {
      for (var j=0; j < rowSize; j++) {
        colorToUse = model.getColor(j, i);
        that.colorCell(j, i, colorToUse);
      }
    }
  };

  /**
  * Colors in a single cell at a given location.
  * 
  * @param row the row of location to color at
  * @param col the column of location to color at
  * @param color the color to use
  */
  that.colorCell = function(row, col, color) {
    ctx.fillStyle = color;
    var x = col * (gapSize + cellWidth) + gapSize;
    var y = row * (gapSize + cellHeight) + gapSize;
    ctx.fillRect(x, y, cellWidth, cellHeight);
  };

  /*
  * Returns the canvas we are drawing on.
  */
  that.getCanvas = function() {
    return canvas;
  };

  /**
  * Changes the opacity of the chart display.
  *
  * @param opacity a value from 0 to 1, where 0 is completely transparent
  *         and 1 is completely opaque
  */
  that.changeOpacity = function(opacity) {
    $(canvas).css({opacity: opacity});
  }

  /**
  * Scales the size of the chart.
  * 
  * @param factorX how much to multiplicatively scale the width dimension by
  * @param factorY how much to multiplicatively scale the height dimension by
  */
  that.scale = function(factorX, factorY) {
    // clear existing drawing and resize canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width *= factorX;
    canvas.height *= factorY;

    // set property that scales everything we draw
    ctx.scale(factorX, factorY);
    that.draw();
  }

  /**
  * Given a mouse event, gets cell at the location corresponding
  * to the mouse event.
  * 
  * @param mouseEvt mouse event
  * @return a JSON object containing 'row' and 'col' as keys.
  *           Their values are row and col in which the mouse
  *           location is pointing at.
  */
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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