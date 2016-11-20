
GridModel = function() {
var that = Object.create(GridModel.prototype);

var rows = []
for (var i = 0; i < YDIM; i++){
	var col = [];
	for (var j=0; j<XDIM; j++){
		col.push("#FFFFFF");
	}
	rows.push(col);
}
that.model = rows;

return that;
}


GridModel.prototype = {

setCellColor : function(x,y,colorHexValue) { 
this.model[x][y] = colorHexValue;
},

setAllColor : function(newColors){
this.model = newColors;
},


resetZero : function() {
this.model = GridModel().model;
},
}