/**
* Sets the color of a cell in a chart to a specific color
*
* @param view the view representing how the chart looks
* @param model the model representing the data of the chart
* @param color the color to use
*/
var clickCell = function (view, model, color){
	var cell = view.getCell(event);
  if (cell != null) {
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
  }
}