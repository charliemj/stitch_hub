function clickChange(event){
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


var xcor = event.clientX;
var ycor = event.clientY;
var thisBox = document.getElementById("canvas");
xcor -= thisBox.offsetLeft;
ycor -= thisBox.offsetTop;
var xGrid = Math.floor(xcor/xscale);
var yGrid = Math.floor(ycor/yscale);
var colorToUse = document.getElementById("html5colorpicker").value;
canvasGrid.setCellColor(xGrid,yGrid,colorToUse);
drawGrid();
}
