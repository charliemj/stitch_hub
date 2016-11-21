var ClickChange = function (view, model, color){
	var cell = view.getCell(event);
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
}

var ChangeType = function (scale, model, canvas){
	var temp = scale.split(',');
	var xscale = temp[0];
	var yscale = temp[1];

	return ChartView(xscale, yscale, model, canvas)
}



//This function tests the values that will be sent to the DB. Should remove this later.
var checkVals = function(){

	var t = document.getElementById('title').value;
	var d = document.getElementById('description').value;
	var rs = document.getElementById('rowSize').value;
	var cs = document.getElementById('colSize').value;
	var ct = document.getElementById('type').value;
	var r = document.getElementById('rows').value;
	var p = document.getElementById('parent').value;

	console.log("Title", t,d);
	console.log("ChartType", ct);
	console.log("Rows", r);
	console.log("Parent", p);
}