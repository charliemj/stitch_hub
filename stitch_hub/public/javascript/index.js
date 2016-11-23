$(document).ready(function() {
  $.ajax({
    url: '/charts',
    method: 'GET',
    success: function(charts) {
      // fill in the template with the charts
      var template = $('#charts-template').html();
      var html = Mustache.render(template, { charts: charts });
      $('.charts-container').append(html);

      // draw each chart
      $('.chart-canvas').each(function(i, canvas) {
        var jcanvas = $(canvas);
        var id = jcanvas.attr('data-id');
        var chartJson = findChartWithId(charts, id);
        jcanvas.on('click', function() {
          window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
          window.location = "chart_page.html"
        });
        var chartModel = getChartFromJson(chartJson);
        //TODO scale chartView for feed
        var chartView = CrossStitchChartView(chartModel, canvas);
        chartView.draw();
      });
      // add remix button for each chart
      $('.remix-button').each(function(i, button) {
        var jbutton = $(button);
        var id = jbutton.attr('data-id');
        var chartJson = findChartWithId(charts, id);
        jbutton.on('click', function() {
          window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
          window.location = "chart_editing.html";
        });
      });
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });
});

var findChartWithId = function(charts, id) {
  for (var i = 0; i < charts.length; i++) {
    var chartJson = charts[i];
    if (chartJson._id == String(id)) {
      return chartJson;
    }
  }
  throw "Should not get here"; // should not get here
};

var makeChart = function() {
  window.location = "chart_form.html";
};