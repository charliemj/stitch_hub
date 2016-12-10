/**
* Handle the logic for chart editing page
*/
$(document).ready(function() {
  //load nav bar
  loadNavBarTemplate();
  // fetch the chart JSON
  var jsonChart = JSON.parse(window.sessionStorage.getItem('chart'));

  // store information about the type of chart into the type selector
  var standardSize = getStandardSize(jsonChart.type);
  var xscale = standardSize.cellWidth;
  var yscale = standardSize.cellHeight;
  var zoomset = 1;
  document.getElementById("typeSelect").value = jsonChart.type;

  // color the canvas based on the given chart
  var canvas = document.getElementById("canvas");
  var model = getChartFromJson(jsonChart);
  var view = ChartView(xscale * zoomset, yscale * zoomset, model, canvas);
  view.draw();

  // add event listener for coloring the canvas based on clicks
  $(canvas).on('click', function() {
    handleCellClick(view,model,document.getElementById("html5colorpicker").value);
  });

  // add event listener for zooming buttons
  $('#zoomer').change( function() {
    zoomset = document.getElementById("zoomer").value;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });
  
  // add event listener for type select
  $('#typeSelect').change(function() {
    standardSize = getStandardSize(document.getElementById('typeSelect').value);
    xscale = standardSize.cellWidth;
    yscale = standardSize.cellHeight;
    view = ChartView(xscale*zoomset, yscale*zoomset, model, canvas);
    view.draw();
  });

  // add event listener for tag addition and deletion buttons
  $('#add-tag-button').on('click', function() {
    var allTagsWritten = areAllTagsWritten();
    $('#tags-container').append('<input type="text" class="tag" placeholder="tag">');
  });
  $('#delete-tag-button').on('click', function() {
    if ($('.tag').length > 1) {
      $('#tags-container .tag').last().remove();
    } else {
      alert('Must have at least one tag');
    }
  });

  // add event listener so that post-chart-button will post when clicked
  $('#post-chart-button').on('click', function() {
    var stringifiedRows = JSON.stringify(model.getRows());
    var stringtags = document.getElementById("tags");
    var tags = $('.tag').toArray().map(function (tag) {
      return $(tag).val(); // map javascript object to text
    }).filter(function (tag) {
      return tag != ''; // keep only if non-empty
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos; // remove duplicates
    });
    if (tags.length == 0) {
      alert('Must have at least one tag');
      return;
    }

    $.ajax({
      url: '/charts',
      method: 'POST',
      data: {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        rowSize: model.getRowSize(),
        colSize: model.getColSize(),
        type: document.getElementById("typeSelect").value,
        rows: stringifiedRows,
        parent: jsonChart._id,
        nsfw: document.getElementById("NSFW").checked,
        tags: JSON.stringify(tags),
        comments: [],

      },
      success: function() {
        console.log("successfully posted chart");
        window.location.replace("/");
      },
      error: function(error) {
        console.log('Error posting charts');
        console.log(error);
      }
    });
  });
});

var areAllTagsWritten = function() {
  var allTagsWritten = true;
  $('.tag').each(function (i, tag) {
    allTagsWritten = allTagsWritten && ($(tag).val() != '');
  });
  return allTagsWritten;
}