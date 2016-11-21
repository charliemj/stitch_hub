$(document).ready(function() {
  chartJson =
  {
    id: 'id',
    title: 'chart title',
    description: 'best description',
    type: 'KNIT',
    rowSize: 2,
    colSize: 3,
    rows:
    [
      [ '#FF0000', '#00FF00', '#0000FF' ],
      [ '#00FF00', '#0000FF', '#FF0000' ],
    ],
    parent: 'parent id',
  };
  var canvas = document.createElement('canvas');
  $('.charts-container').append(canvas);
  var chartModel = getChartFromJson(chartJson);
  var chartView = KnitChartViewVert(chartModel, canvas);
  chartView.draw();
});