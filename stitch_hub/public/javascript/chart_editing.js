var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

scaledata = getRatio(jsonChart.type);
var xscale = scaledata[1];
var yscale = scaledata[2];
var TypeOfChart = jsonChart.type;
document.getElementById("typeSelect").value = scaledata[1] +','+ scaledata[2] +','+ jsonChart.type;


var XDIM = jsonChart.rowSize;
var YDIM = jsonChart.colSize;


var canvas = document.getElementById("canvas");
var chartType = jsonChart.type;
var model = getChartFromJson(jsonChart);
var view = ChartView(xscale,yscale,model,canvas);
view.draw();


var changeType = function() {
  view = ChangeType(document.getElementById('typeSelect').value, model, canvas);
  var temporary = document.getElementById('typeSelect').value.split(',')[2];
  TypeOfChart = temporary;
  view.draw();
}

var PostChart = function(){

$(document).ready(function() {

  var stringifiedRows = JSON.stringify(model.getRows());
  $.ajax({
    url: '/charts',
    method: 'POST',
    data: {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      rowSize: XDIM,
      colSize: YDIM,
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
};
