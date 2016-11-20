var ChartController = function(view, model, colorPicker) {
  var that = Object.create(ChartController.prototype);

  canvas.addEventListener('mouseclick', function(evt) {
    var cell = view.getCell(evt);
    var color = colorPicker.value;
    view.colorCell(cell.row, cell.col, color);
    model.setColor(cell.row, cell.col, color);
  });

  Object.freeze(that);
  return that;
};