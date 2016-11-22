$(document).ready(function() {
  // fetch the chart JSON
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // store information about the type of chart into the type selector
  scaleData = getRatio(jsonChart.type);
  var xscale = scaleData[1];
  var yscale = scaleData[2];
  document.getElementById("typeSelect").value = jsonChart.type;

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var model = getChartFromJson(jsonChart);
  var view = ChartView(xscale,yscale,model,canvas);
  view.draw();

  // add event listener for coloring the canvas based on clicks
  $(canvas).on('click', function() {
    ClickChange(view,model,document.getElementById("html5colorpicker").value);
  });

  // add event listener for zooming buttons
  $('#decrease').on('click', function() {
    view = ChartView(xscale/2, yscale/2, model, canvas);
    view.draw();
  });
  $('#nonecrease').on('click', function() {
    view = ChartView(xscale, yscale, model, canvas);
    view.draw();
  });
  $('#increase').on('click', function() {
    view = ChartView(2*xscale, 2*yscale, model, canvas);
    view.draw();
  });

  // add event listener for type select
  $('#typeSelect').change(function() {
    scaleData = getRatio(document.getElementById('typeSelect').value);
    xscale = scaleData[1];
    yscale = scaleData[2];
    view = ChangeSize(xscale, yscale, model, canvas);
    view.draw();
  })

  // add event listener so that post-chart-button will post when clicked
  $('#post-chart-button').on('click', function() {
    var stringifiedRows = JSON.stringify(model.getRows());
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
        parent: jsonChart.id
      },
      success: function() {
        console.log("successfully posted chart");
        window.location.replace("/");
      },
      error: function(error) {
        console.log('Error posting charts');
        console.log(error);
      },
    });
  });
});