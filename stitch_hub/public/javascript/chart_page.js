/**
* Handles the logic for a chart page. This involves storing and displaying
* information about the chart. It also adds logic to the remix button
*/
$(document).ready(function() {
  getCurrentUser(function (currentUser) {
    loadNavBarTemplate(currentUser);
    var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));
    var chartID = jsonChart._id;
      
    // load template into #chart-container
    loadChartTemplate(jsonChart, currentUser);
  });
  
});
