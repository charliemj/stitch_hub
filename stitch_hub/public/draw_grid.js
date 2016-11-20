function drawGrid() {

var xscale = 10;
var yscale = 10;

var type = document.getElementById("typeSelect").value;
if (type == "CrossStitch"){
yscale = 10;
}
if (type == "Knit"){
yscale = 20;
} 
if (type == "Crochet"){
yscale = 15;
}

var can = document.getElementById("canvas");
can.width = xscale * XDIM;
can.height = yscale * YDIM;

var canM = can.getContext("2d");
canM.clearRect(0,0,xscale*XDIM,yscale*YDIM);
//console.log(lifemodel.model[0][0]);
for (var i=0; i < XDIM; i++){
for (var j=0; j < YDIM; j++){
  colorToUse = canvasGrid.model[i][j];
  canM.fillStyle = colorToUse;
  canM.fillRect(xscale*i,yscale*j, xscale, yscale);
} 
}
}