var gridmodel = Grid();
var xscale = 10;
var yscale = 10;

//draws the model onto a canvas
function drawGrid() {

var can = document.getElementById("Grid");
var canM = can.getContext("2d");
canM.clearRect(0,0,xscale*XDIM,yscale*YDIM);
for (var i=0; i < XDIM; i++){
	for (var j=0; j < YDIM; j++){
		colorToUse = gridmodel.model[i][j]
		canM.fillStyle = colorToUse;
		canM.fillRect(xscale*i,yscale*j, xscale, yscale);
		}


	}
}




drawGrid();



// resets the simulation to blank state
function resetIt() {
	gridmodel.resetZero();
	drawGrid();
}


//changes model when click on canvas.
function clickChange(event){
	var xcor = event.clientX;
	var ycor = event.clientY;
	var thisBox = document.getElementById("Grid");
	xcor -= thisBox.offsetLeft;
	ycor -= thisBox.offsetTop;
	var xGrid = Math.floor(xcor/xscale);
	var yGrid = Math.floor(ycor/yscale);
	var colorToUse = document.getElementById("html5colorpicker").value;
	gridmodel.setCellColor(xGrid,yGrid,colorToUse);
	drawGrid();


}



