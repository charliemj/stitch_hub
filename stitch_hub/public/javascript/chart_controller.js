var ClickChange = function (view, model, color){
	var cell = view.getCell(event);
  if (cell != null) {
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
  }
}

var ChangeSize = function (xscale, yscale, model, canvas){
	return ChartView(xscale, yscale, model, canvas)
}

//This function tests the values that will be sent to the DB. Should remove this later.
var checkVals = function(){

	var t = document.getElementById('title').value;
	var d = document.getElementById('description').value;
	var rs = XDIM;
	var cs = YDIM;
	var ct = TypeOfChart;
	var r = model.getRows();
	var p = jsonChart.id;

	console.log("Title", t,d);
	console.log("ChartType", ct);
	console.log("Rows", r);
	console.log("Parent", p);
}