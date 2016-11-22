$(document).ready(function() {
  $.ajax({
    url: '/charts',
    method: 'GET',
    success: function(charts) {
      charts.forEach(function(chartJson) {
        addChart(chartJson);
      });
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });
});

var addChart = function(chartJson) {
  var template = chartTemplate(chartJson);
  $('.charts-container').append(template);
};

var chartTemplate = function(chartJson) {
  // div for representing the chart
  var div = document.createElement('div');
  div.setAttribute('data-id', chartJson.id);

  // canvas for rendering the chart
  var canvas = document.createElement('canvas');
  div.append(canvas);

  // render the chart
  var chartModel = getChartFromJson(chartJson);
  var chartView = CrossStitchChartView(chartModel, canvas);
  chartView.draw();

  div.append(document.createElement('br')); // add seperator between this and 

  // add a button for remixing the view
  var button = document.createElement('button');
  div.append(button);
  $(button).text('Remix this chart!');
  button.onclick = function() {
    window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
    window.location = "chart_editing.html";
  }

  return div;
}

var makeChart = function() {
  window.location = "chart_form.html";
}