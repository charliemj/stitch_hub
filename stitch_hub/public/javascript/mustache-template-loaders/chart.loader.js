var loadChartTemplate = function(jsonChart) {


var number = getNumberOfLikes(jsonChart._id);


  $.get('mustache-templates/chart.template.html', function (template) {
    var html = Mustache.render($(template).html(), { title: jsonChart.title, description: jsonChart.description, number: number, });
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
      $.ajax({
        url: '/like',
        method: 'POST',
        data: {
          chartID: jsonChart._id,
          
        },
        success: function() {
          console.log("successfully liked it");
        },
        error: function(error) {
          console.log('Error liking it');
          console.log(error);
        }

      });//end ajax
    });
  });
}