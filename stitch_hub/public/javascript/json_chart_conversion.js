var getChartFromJson = function(chartJson) {
  var rowSize = chartJson.rowSize;
  var colSize = chartJson.colSize;

  var chart = ChartModel(rowSize, colSize);
  for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < colSize; j++) {

    	var index = i*colSize + j;
    	var colors = chartJson.rows[0].split(",");

      chart.setColor(i, j, colors[index]);
    }
  }

  return chart;
};