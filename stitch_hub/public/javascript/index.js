/**
* Handles the logic for the charts news feed. This includes handling the templating
* so that charts will be loaded onto the page. It also provides logic to the remix
* button of each chart.
*/
$(document).ready(function() {
  $.ajax({
    url: '/charts',
    method: 'GET',
    success: function(charts) {
      // fill in the template with the charts and make sure each canvas stores the ID of the chart
      // so that the canvas can reference the chart JSON information
      var template = $('#charts-template').html();
      var html = Mustache.render(template, { charts: getRelevantChartsInfo(charts) });
      $('.charts-container').append(html);

      // draw each chart and add a link to its page
      $('.chart-canvas').each(function(i, canvas) {
        // add link to chart page
        $(canvas).on('click', function() {
          window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
          window.location = "chart_page.html"
        });

        var id = $(canvas).attr('data-id');
        var chartJson = findChartWithId(charts, id);
        var chartModel = getChartFromJson(chartJson);
        var standardSize = getStandardSize(chartJson.type);
        var chartView = ChartView(standardSize.cellWidth, standardSize.cellHeight, chartModel, canvas);
        // draw chart
        renderChartToFeed(canvas, chartView);

        $(canvas).on('mouseenter', function() {
          handleMouseEnterGrid(chartView);
        });
        $(canvas).on('mouseleave', function() {
          handleMouseLeaveGrid(chartView);
        });
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

      // upon window resize, rescale the chart sizes
      $ (window).resize(function() {
        $('.chart-canvas').each(function(i, canvas) {
          var id = $(canvas).attr('data-id');
          var chartJson = findChartWithId(charts, id);
          var chartModel = getChartFromJson(chartJson);
          var standardSize = getStandardSize(chartJson.type);
          var chartView = ChartView(standardSize.cellWidth, standardSize.cellHeight, chartModel, canvas);
          renderChartToFeed(canvas, chartView);
        });
      });
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });
});

/**
* Draws charts onto the feed so that they are scaled to fit inside its container.
* 
* @param canvas canvas to draw on
* @param chartView the view representing how the chart is displayed
*/
var renderChartToFeed = function(canvas, chartView) {
  // make sure that each chart fits into at most 80% of container
  var containerWidth = $(canvas).parent().width();
  if (containerWidth * 0.8 < canvas.width) {
    var factor = containerWidth * 0.8 / canvas.width;
    chartView.scale(factor, factor);
  } else {
    chartView.draw();
  }
}

/**
* Converts a list of charts (as returned as a response from GET /charts) to a
* different list of JSON objects whose information will be used by our template.
*/
var getRelevantChartsInfo = function(charts) {
  var chartsInfo = [];
  charts.forEach(function(chart) {
    chartsInfo.push({
      _id: chart._id,
      title: chart.title,
    });
  });
  return chartsInfo;
};

/**
* Given a list of charts (as returned as a response from GET /charts), finds
* the charts with a given value for _id.
*/
var findChartWithId = function(charts, id) {
  for (var i = 0; i < charts.length; i++) {
    var chartJson = charts[i];
    if (chartJson._id == String(id)) {
      return chartJson;
    }
  }
  throw "Should not get here"; // should not get here
};

/**
* Redirects to the form page for when a user wants to create a new chart.
*/
var makeChart = function() {
  window.location = "chart_form.html";
};