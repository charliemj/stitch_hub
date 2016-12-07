goToParent = function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));
  console.log("find my parent: " + jsonChart.parent);
  $.ajax({
    url: '/charts/'+jsonChart.parent,
    method: 'GET',
    data: {
      chartId: jsonChart.parent
    },
    success: function(res) {
        console.log("Found parent");
        console.log("here's my mom: " + JSON.stringify(res));
        window.sessionStorage.setItem('chart', JSON.stringify(res.message));
        window.location = "chart_page.html";
      }
   });//end ajax

  // $.get('/charts/:chartId', {chartId:jsonChart.parent}, function(res){
  //   console.log("Found parent");
  //   console.log("here's my mom: " + JSON.stringify(res));
  //   window.sessionStorage.setItem('chart', JSON.stringify(res));
  //   window.location = "chart_page.html";
  // });

  // $.ajax({
  //   url: '/charts',
  //   method: 'GET',
  //   data: {},
  //   success: function(res) {
  //     console.log("BIG" +res);
  //     if (res.success) {
  //       console.log("WOOP")
  //     } else {
  //       console.log("not found.");
  //     }
  //   }
  // });//end ajax
};