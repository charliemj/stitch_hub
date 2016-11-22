var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

document.getElementById("parent").value = jsonChart.id;
document.getElementById("type").value = jsonChart.type;
scaledata = getRatio(jsonChart.type);
var xscale = scaledata[1];
var yscale = scaledata[2];
document.getElementById("typeSelect").value = scaledata[1] +','+ scaledata[2] +','+ jsonChart.type;


var XDIM = jsonChart.rowSize;
var YDIM = jsonChart.colSize;
document.getElementById("rowSize").value = XDIM;
document.getElementById("colSize").value = YDIM;
document.getElementById("rows").value = jsonChart.rows;


var canvas = document.getElementById("canvas");
var chartType = jsonChart.type;
var model = getChartFromJson(jsonChart);
document.getElementById("rows").value = model.getRows();
var view = ChartView(xscale,yscale,model,canvas);
view.draw();