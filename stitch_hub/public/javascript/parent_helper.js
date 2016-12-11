var goToParent = function(jsonChart) {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));
  $.ajax({
    url: '/charts/' + jsonChart.parent,
    method: 'GET',
    data: {
      chartId: jsonChart.parent
    },
    success: function(res) {
      if (!res.message){
        alert("This chart has no Parent.");
        return;
      }
      goToChartPage(JSON.parse(res.message));
    }
  });//end ajax
};