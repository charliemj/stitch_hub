$(document).ready(function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var model = getChartFromJson(jsonChart);
  scaleData = getRatio(jsonChart.type);
  var xscale = scaleData[1]*2;
  var yscale = scaleData[2]*2;
  console.log("param for ChartView: " + xscale + " " + yscale + " " + model + " " + canvas);
  var view = ChartView(xscale,yscale,model,canvas);
  view.draw();

  $('.remix-button').each(function(i, button) {
    var jbutton = $(button);
    var id = jbutton.attr('data-id');
    jbutton.on('click', function() {
      window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
      window.location = "chart_editing.html";
    });
  });

});