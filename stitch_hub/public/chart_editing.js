var XDIM = 25;
    var YDIM = 25;


    times = function (i, f) {
      if (i === 0) return;
      f(); times (i-1, f)
    }


    GridModel = function() {
      var that = Object.create(GridModel.prototype);
    
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


    GridModel.prototype = {

    setCellColor : function(x,y,colorHexValue) { 
      this.model[x][y] = colorHexValue;
      },

    
    resetZero : function() {
      this.model = GridModel().model;
      },
    }


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
        colorToUse = canvasGrid.model[i][j]
        canM.fillStyle = colorToUse;
        canM.fillRect(xscale*i,yscale*j, xscale, yscale);
      } 
    }
  }

  function resetIt() {
    canvasGrid.resetZero();
    drawGrid();
  }

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
  var canvasGrid = GridModel();
  drawGrid();