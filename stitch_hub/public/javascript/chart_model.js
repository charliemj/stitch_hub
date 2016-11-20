var ChartModel = function(rowSize, colSize) {
  var that = Object.create(ChartModel.prototype);

  var rows = []
  for (var i = 0; i < rowSize; i++){
    var row = [];
    for (var j = 0; j < colSize; j++){
      row.push("#FFFFFF");
    }
    rows.push(row);
  }

  /**
  * Returns row size.
  */
  that.getRowSize = function() {
    return rowSize;
  };

  /**
  * Returns column size.
  */
  that.getColSize = function() {
    return colSize;
  };

  /**
  * Get hex value (representing color) of a given cell.
  */
  that.getColor = function(row, col) {
    return rows[row][col];
  };

  /**
  * Sets hex value (representing color) of a given cell
  */
  that.setColor = function(row, col, color) {
    rows[row][col] = color;
  };

  Object.freeze(that);
  return that;
};