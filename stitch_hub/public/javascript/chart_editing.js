/**
* Handle the logic for chart editing page
*/
$(document).ready(function() {
  // fetch the chart JSON
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // store information about the type of chart into the type selector
  var standardSize = getStandardSize(jsonChart.type);
  var xscale = standardSize.cellWidth;
  var yscale = standardSize.cellHeight;
  var zoomset = 1;
  document.getElementById("typeSelect").value = jsonChart.type;

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var model = getChartFromJson(jsonChart);
  var view = ChartView(xscale * zoomset, yscale * zoomset, model, canvas);
  view.draw();

  // add event listener for coloring the canvas based on clicks
  $(canvas).on('click', function() {
    handleCellClick(view,model,document.getElementById("html5colorpicker").value);
  });

  // add event listener for zooming buttons
  $('#decrease').on('click', function() {
  	zoomset = 0.5;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });
  $('#nonecrease').on('click', function() {
  	zoomset = 1;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });
  $('#increase').on('click', function() {
  	zoomset = 2;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });

  // add event listener for type select
  $('#typeSelect').change(function() {
    standardSize = getStandardSize(document.getElementById('typeSelect').value);
    xscale = standardSize.cellWidth;
    yscale = standardSize.cellHeight;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });

  // add event listener so that post-chart-button will post when clicked
  $('#post-chart-button').on('click', function() {
    var stringifiedRows = JSON.stringify(model.getRows());
    var stringtags = document.getElementById("tags");
    var taglist = stringtags.split(",");


    $.ajax({
      url: '/charts',
      method: 'POST',
      data: {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        rowSize: model.getRowSize(),
        colSize: model.getColSize(),
        type: document.getElementById("typeSelect").value,
        rows: stringifiedRows,
        parent: jsonChart.id,
        nsfw: document.getElementById("NSFW").checked,
        tags: taglist,
        comments: [],
        author: req.user.username

      },
      success: function() {
        console.log("successfully posted chart");
        window.location.replace("/");
      },
      error: function(error) {
        console.log('Error posting charts');
        console.log(error);
      }
    });
  });
});