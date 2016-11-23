/**
* Handles the logic for a chart page. This involves storing and displaying
* information about the chart. It also adds logic to the remix button
*/
$(document).ready(function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var model = getChartFromJson(jsonChart);
  var standardSize = getStandardSize(jsonChart.type);
  var view = ChartView(standardSize.cellWidth, standardSize.cellHeight, model, canvas);
  view.draw();

  $('<h1>'+jsonChart.title+'</h1>').appendTo('#chart-info');
  $('<p>'+jsonChart.description+'</p>').appendTo('#chart-info');

  $('.remix-button').each(function(i, button) {
    var jbutton = $(button);
    var id = jbutton.attr('data-id');
    jbutton.on('click', function() {
      window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
      window.location = "chart_editing.html";
    });
  });

});
