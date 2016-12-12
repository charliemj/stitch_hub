var loadChartFeedTemplate = function(charts, currentUser) {
  $.get('mustache-templates/chart_feed.template.html', function (template) {
    $('.grid-pad').remove();
    $('.col-1-5').remove();
    var html = Mustache.render($(template).html(), { charts: getRelevantChartsInfo(charts) });
    $('#charts-container').append(html);

    // draw each chart and add a link to its page
    $('.chart-canvas').each(function(i, canvas) {
      var id = $(canvas).attr('data-id');
      var chartJson = findChartWithId(charts, id);
      var chartModel = getChartFromJson(chartJson);
      var standardSize = getStandardSize(chartJson.type);
      var chartView = ChartView(standardSize.cellWidth, standardSize.cellHeight, chartModel, canvas);
      // draw chart
      renderChartToFeed(canvas, chartView);

      // add link to chart page
      // var card = $(canvas).parent();
      // $(card).on('click', function() {
      //   goToChartPage(chartJson);
      // })
      // $(card).on('mouseenter', function() {
      //   $(card).css({opacity: 0.5});
      // })
      // $(card).on('mouseleave', function() {
      //   $(card).css({opacity: 1});
      // });
      // moved to top
      $(canvas).on('click', function() {
        goToChartPage(chartJson);
      });

      $(canvas).on('mouseenter', function() {
        handleMouseEnterGrid(chartView);
      });
      $(canvas).on('mouseleave', function() {
        handleMouseLeaveGrid(chartView);
      });
    });
    // add remix button for each chart
    $('.remix-button').each(function(i, button) {
      var jbutton = $(button);
      var id = jbutton.attr('data-id');
      var chartJson = findChartWithId(charts, id);
      jbutton.on('click', function() {
        if (currentUser == null){
          alert("You are not logged in");
        }else{
        window.sessionStorage.setItem('chart', JSON.stringify(chartJson));
        window.location = "chart_editing.html";
      }
      });
    });

    // add link to user profile for each chart author
    $('.author-name').each(function(i, button) {
      var jbutton = $(button);
      var id = jbutton.attr('data-id');
      var chartJson = findChartWithId(charts, id);
      var author = chartJson.author;
      jbutton.on('click', function() {
            window.sessionStorage.setItem('userProfileId', author);
            window.location = "user_profile.html";
             });
      });

    //add like button for each chart
    $('.like-button').each(function(i, button) {
      // get whether or not the user has currently liked this

      var jbutton = $(button);
      var id = jbutton.attr('data-id');
      var chartJson = findChartWithId(charts, id);

      if (currentUser == null){
        jbutton.hide()
      }

      getCurrentUserLike(id, currentUser, function(err, liked) {
        // set the initial state of the button
        jbutton.text(liked ? 'Unlike' : 'Like');
        // set the onclick listener of the button
        jbutton.on('click', function() {
          if (liked) {
            jbutton.text('Like');
            liked = false;
            unlikeChart(id);
          } else {
            jbutton.text('Unlike');
            liked = true;
            likeChart(id);
          }
        });
      });

    });



    // upon window resize, rescale the chart sizes
    $ (window).resize(function() {
      $('.chart-canvas').each(function(i, canvas) {
        var id = $(canvas).attr('data-id');
        var chartJson = findChartWithId(charts, id);
        var chartModel = getChartFromJson(chartJson);
        var standardSize = getStandardSize(chartJson.type);
        var chartView = ChartView(standardSize.cellWidth, standardSize.cellHeight, chartModel, canvas);
        renderChartToFeed(canvas, chartView);
      });
    });
  });
};

/**
* Draws charts onto the feed so that they are scaled to fit inside its container.
* 
* @param canvas canvas to draw on
* @param chartView the view representing how the chart is displayed
*/
var renderChartToFeed = function(canvas, chartView) {
  // make sure that each chart fits into at most 80% of container
  var containerWidth = $(canvas).parent().width();
  var containerHeight = $(canvas).parent().height();

  var xfactor = 1;
  var yfactor = 1;



  if (containerWidth * 0.8 < canvas.width) {
    var xfactor = containerWidth * 0.8 / canvas.width;
  }
  if(containerHeight * 0.5 <canvas.height){
    var yfactor = containerHeight * 0.5 / canvas.height;
  }
  var factor = Math.min(xfactor, yfactor);
  chartView.scale(factor,factor);
};

/**
* Converts a list of charts (as returned as a response from GET /charts) to a
* different list of JSON objects whose information will be used by our template.
*/
var getRelevantChartsInfo = function(charts) {
  var chartsInfo = [];
  charts.forEach(function(chart) {
    chartsInfo.push({
      _id: chart._id,
      title: chart.title,
      author: chart.author,
      likeCount: getNumberOfLikes(chart._id),
      authorname: getUsernameFromID(chart.author)
    });
  });
  return chartsInfo;
};

/**
* Given a list of charts (as returned as a response from GET /charts), finds
* the charts with a given value for _id.
*/
var findChartWithId = function(charts, id) {
  for (var i = 0; i < charts.length; i++) {
    var chartJson = charts[i];
    if (chartJson._id == String(id)) {
      return chartJson;
    }
  }
  throw "Should not get here"; // should not get here
};