var makeChart = function() {
  var title = $('#title').val();
  var description = $('#description').val();
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
    title: title,
    description: description,
    rowSize: rowSize,
    colSize: colSize,
    rows: rows,
    type: type
  };
  window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
  window.location = "chart_editing.html";
};