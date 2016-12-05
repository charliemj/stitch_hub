/**
* Handles the logic for a chart page. This involves storing and displaying
* information about the chart. It also adds logic to the remix button
*/
$(document).ready(function() {
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));










  // load template into #chart-container
  loadChartTemplate(jsonChart);

  var comments = jsonChart.comments;

  var comments = ["test comment", "test comment 2", "test comment 3"];

  for (var i = 0; i<comments.length; i++){
  	console.log(comments[i]);
  	$('#comments-container').append(comments[i]);
  	$('#comments-container').append("<hr>");

  }


  $('#saveComment-button').on('click', function() {
    //TODO: make put request to server to add comment.
    	alert("Comment Adding Not Implemented Yet");

  });

  

});
