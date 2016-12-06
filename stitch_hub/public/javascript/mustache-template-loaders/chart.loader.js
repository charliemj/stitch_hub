var loadChartTemplate = function(jsonChart) {
  $.get('mustache-templates/chart.template.html', function (template) {
    var html = Mustache.render($(template).html(), { title: jsonChart.title, description: jsonChart.description });
    $('#chart-container').append(html);

    // color the canvas based on the given chart
    var canvas = document.getElementById("canvas");
    var model = getChartFromJson(jsonChart);
    var standardSize = getStandardSize(jsonChart.type);
    var view = ChartView(standardSize.cellWidth, standardSize.cellHeight, model, canvas);
    view.draw();

    $('#remix-button').on('click', function() {
      window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
      window.location = "chart_editing.html";
    });

    $('#like-button').on('click', function() {
      //TODO: DO LIKE
      alert("Likes not implemented yet!");
    });

    //console.log(jsonChart._id);
    var chart_id = jsonChart._id;
    var author = jsonChart.author;
    var user = window.sessionStorage.getItem('sessionUserId');
    console.log(user,author);
    if (user == author){
      $('#delete-button').removeClass("hidden").addClass("shown").on('click', 
        function() {
      //TODO: DO DELETE
      alert("Deletes not implemented yet!");
    });
    }//end if

  });
}