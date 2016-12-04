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
      loadChartFeedTemplate(charts);
    },
    error: function(error) {
      console.log('Error fetching charts');
      console.log(error);
    }
  });
});

/**
* Redirects to the form page for when a user wants to create a new chart.
*/
var makeChart = function() {
  window.location = "chart_form.html";
};