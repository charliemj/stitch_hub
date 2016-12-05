/**
* Handles the logic for the charts news feed. This includes handling the templating
* so that charts will be loaded onto the page. It also provides logic to the remix
* button of each chart.
*/
$(document).ready(function() {
  // LOAD TEMPLATES
  loadLoginSignupWidget();

  $.ajax({
    url: '/charts',
    method: 'GET',
    success: function(charts) {
      // loads the chart feed into #charts-container div and sets all controllers
      // for the chart feed
      loadChartFeedTemplate(charts);
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });

  // NON-TEMPLATE CONTROLLERS
  $('#make-chart-button').on('click', function() {
    window.location = "chart_form.html";
  });
});