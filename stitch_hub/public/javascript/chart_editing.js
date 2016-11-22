$(document).ready(function() {
  // fetch the chart JSON
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // store information about the type of chart into the type selector
  scaledata = getRatio(jsonChart.type);
  var xscale = scaledata[1];
  var yscale = scaledata[2];
  var TypeOfChart = jsonChart.type;
  document.getElementById("typeSelect").value = scaledata[1] +','+ scaledata[2] +','+ jsonChart.type;

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var chartType = jsonChart.type;
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
        type: TypeOfChart,
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


var changeType = function() {
  view = ChangeType(document.getElementById('typeSelect').value, model, canvas);
  var temporary = document.getElementById('typeSelect').value.split(',')[2];
  TypeOfChart = temporary;
  view.draw();
}