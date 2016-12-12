var goToParent = function(jsonChart, currentUser) {
  $.ajax({
    url: '/charts/' + jsonChart.parent,
    method: 'GET',
    success: function(res) {
      if (!res.message){
        alert("This chart has no Parent.");
        return;
      }
      console.log(res.message);

      var birthday = +new Date(currentUser.dob);
      var age = ~~((Date.now() - birthday) / (31557600000));
      var isAdult = age >= 18;
      
      goToChartPage(JSON.parse(res.message), isAdult);
    }
  });//end ajax
};