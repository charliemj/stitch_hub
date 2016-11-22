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



var makeChart = function() {
  window.location = "chart_form.html";
};