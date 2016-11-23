var clickCell = function (view, model, color){
	var cell = view.getCell(event);
  if (cell != null) {
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
  }
}