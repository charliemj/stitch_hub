/**
* Handles the form input for when users want to create a new chart.
* 
* The row size, column size, rows, and type information is stored into
* windws.sessionStorage for the item 'chart'. 
* Furthermore, will redirect to the chart editing page.
*/
var makeChart = function() {
  var type = $('#typeSelect').val();
  var rowSize = parseInt($('#rowSize').val());
  var colSize = parseInt($('#colSize').val());
  var rows = [];
  for (var i = 0; i < rowSize; i++) {
    var row = [];
    for (var j = 0; j < colSize; j++) {
      row.push('#FFFFFF');
    }
    rows.push(row);
  }
  var chartJson = 
  {
    rowSize: rowSize,
    colSize: colSize,
    rows: rows,
    type: type
  };
  window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
  window.location = "chart_editing.html";
};