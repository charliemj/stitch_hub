/**
* A caller of this method intends to handle a cell click.
* The effect of this method is to color the cell with a
* given color.
*
* @param view the view representing how the chart looks
* @param model the model representing the data of the chart
* @param color the color to use
*/
var handleCellClick = function (view, model, color){
	var cell = view.getCell(event);
  if (cell != null) {
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
  }
}

/**
* A caller of this method intends to handle a mouseenter
* event into the grid. This will make the grid slightly
* transparent.
*
* @param view the view representing how the chart looks
*/
var handleMouseEnterGrid = function(view) {
  view.changeOpacity(0.5);
}

/**
* A caller of this method intends to handle a mouseleave
* event out of the grid. This will make the grid slightly
* transparent.
*
* @param view the view representing how the chart looks
*/
var handleMouseLeaveGrid = function(view) {
  view.changeOpacity(1.0);
}