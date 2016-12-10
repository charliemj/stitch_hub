goToParent = function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));
  console.log("find my parent: " + jsonChart.parent);
  $.ajax({
    url: '/charts',
    method: 'GET',
    data: {
      chartId: jsonChart.parent
    },
    success: function(res) {
        console.log("Found parent");
        console.log("here's my mom: " + JSON.stringify(res.message));
        if (!res.message){
          alert("This chart has no Parent.");
          return;
        }

        window.sessionStorage.setItem('chart', JSON.stringify(res.message));
        window.location = "chart_page.html";
      }
   });//end ajax
};