var getChartFromJson = function(chartJson) {
  var rowSize = chartJson.rowSize;
  var colSize = chartJson.colSize;

  var chart = ChartModel(rowSize, colSize);
  for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < colSize; j++) {
      chart.setColor(i, j, chartJson.rows[i][j]);
    }
  }

  return chart;
};