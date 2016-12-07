/**
* Handles the logic for a chart page. This involves storing and displaying
* information about the chart. It also adds logic to the remix button
*/
$(document).ready(function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));
  var chartID = jsonChart._id;
    
  // load template into #chart-container
  loadChartTemplate(jsonChart);

  var comments = getComments(chartID);

  //var comments = ["test comment", "test comment 2", "test comment 3"];

  for (var i = 0; i<comments.length; i++){
    $('#comments-container').append("<b>" +comments[i].user + ": </b><br>");
  	$('#comments-container').append(comments[i].text);
  	$('#comments-container').append("<hr>");

  }


  $('#saveComment-button').on('click', function() {
    var text = document.getElementById('newComment').value;
    doComment(chartID, text);
    window.location.reload();
  });

  

});
