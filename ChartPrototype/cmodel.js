//does f i times.
times = function (i, f) {
	if (i === 0) return;
	f(); times (i-1, f)
	}

var XDIM = 100;
var YDIM = 100;

//Model for Game of Life
//Initializes with XDIM x YDIM blank grid


Grid = function() {
    var that = Object.create(Grid.prototype);
    
    var rows = []
	times(XDIM, function() {
  		var col = [];
  		rows.push(col);
  		times(YDIM, function() {
    		col.push("#FFFFFF");
  		})
	})
	that.model = rows;

    return that;
}


Grid.prototype = {

    setCellColor : function(x,y,colorHexValue) { 
    	this.model[x][y] = colorHexValue;
      },

    
    resetZero : function() {
    	this.model = Grid().model;
      },




}