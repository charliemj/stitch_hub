function ClickChange(view, model, color){
	var cell = view.getCell(event);
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
}

function ChangeType(scale, model, canvas){
	var temp = scale.split(',');
	var xscale = temp[0];
	var yscale = temp[1];

	return ChartView(xscale, yscale, model, canvas)
}


function Save(){

	console.log(document.getElementById('typeSelect').value.split(',')[2]);




	var t = document.getElementById('title').value;
	var d = document.getElementById('description').value;
	var rs = document.getElementById('rowSize').value;
	var cs = document.getElementById('colSize').value;
	var ct = document.getElementById('type').value;
	var r = document.getElementById('rows').value;

	console.log("Title", t,d);
	console.log("ChartType", ct);
	console.log("Rows", r);
}