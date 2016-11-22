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