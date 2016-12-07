var loadChartTemplate = function(jsonChart) {

var number = getNumberOfLikes(jsonChart._id);
jsonChart.number = number;
jsonChart.tagsConcatenated = jsonChart.tags.join(' ');

  $.get('mustache-templates/chart.template.html', function (template) {
    console.log(jsonChart);
    var html = Mustache.render($(template).html(), jsonChart);
    $('#chart-container').append(html);

    // color the canvas based on the given chart
    var canvas = document.getElementById("canvas");
    var model = getChartFromJson(jsonChart);
    var standardSize = getStandardSize(jsonChart.type);
    var view = ChartView(standardSize.cellWidth, standardSize.cellHeight, model, canvas);
    view.draw();

    // add a link to the user when clicked in the username
    $('#user-profile-link').on('click', function() {
      window.sessionStorage.setItem('userProfileId', jsonChart.author);
      window.location = "user_profile.html";
    });

    // make the chart description editable
    // Find all editable content.
    // http://stackoverflow.com/questions/6256342/trigger-an-event-when-contenteditable-is-changed
    $('#chart-description')
        // When you click on item, record into data("initialText") content of this item.
        .focus(function() {
            $(this).data("initialText", $(this).html());
        })
        // When you leave an item...
        .blur(function() {
            // ...if content is different...
            if ($(this).data("initialText") !== $(this).html()) {
                // ... do something.
                $('#edit-description-button').show();
                //console.log('New data when content change.');
                //console.log($(this).html());
            }
        });
    // save when clicking on the edit description button
    $('#edit-description-button').on('click', function() {
      var newDescription = $('#chart-description').html();
      $.ajax({
        url: '/charts/' + jsonChart._id + '/description',
        data: {
          description: newDescription,
        },
        method: 'PUT',
        success: function(data) {
          if (data.updated) {
            // need to change what is stored locally as well to handle refreshes
            jsonChart.description = newDescription;
            window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
            alert('Successfully saved chart description!');
            $('#edit-description-button').hide();
          } else {
            alert('Failed to save chart description!');
          }
        },
        error: function(err) {
          console.log('Error in editing chart description');
          console.log(err);
        },
      });
    });

    // make the chart description editable
    // Find all editable content.
    // http://stackoverflow.com/questions/6256342/trigger-an-event-when-contenteditable-is-changed
    $('#chart-tags')
        // When you click on item, record into data("initialText") content of this item.
        .focus(function() {
            $(this).data("initialText", $(this).html());
        })
        // When you leave an item...
        .blur(function() {
            // ...if content is different...
            if ($(this).data("initialText") !== $(this).html()) {
                // ... do something.
                $('#edit-tags-button').show();
                //console.log('New data when content change.');
                //console.log($(this).html());
            }
        });
    // save when clicking on the edit description button
    $('#edit-tags-button').on('click', function() {
      var newTags = $('#chart-tags').html().split(' ')
      .filter(function (tag) {
        return tag != ''; // keep only if non-empty
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos; // remove duplicates
      });
      if (newTags.length == 0) {
        alert('Must have at least one tag');
        return;
      }

      $.ajax({
        url: '/charts/' + jsonChart._id + '/tags',
        data: {
          tags: newTags,
        },
        method: 'PUT',
        success: function(data) {
          if (data.updated) {
            // need to change what is stored locally as well to handle refreshes
            jsonChart.tags = newTags;
            window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
            alert('Successfully saved chart tags!');
            $('#edit-tags-button').hide();
          } else {
            alert('Failed to save chart tags!');
          }
        },
        error: function(err) {
          console.log('Error in editing chart tag');
          console.log(err);
        },
      });
    });

    $('#remix-button').on('click', function() {
      window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
      window.location = "chart_editing.html";
    });

    getCurrentUserLike(jsonChart._id, function(err, like) {
      // set the initial state of the button
      var liked = like ? true : false;
      $('#like-button').text(liked ? 'Unlike' : 'Like');
      // set the onclick listener of the button
      $('#like-button').on('click', function() {
        if (liked) {
          $('#like-button').text('Like');
          unlikeChart(jsonChart._id, jsonChart.author);
          liked = false;
        } else {
          $('#like-button').text('Unike');
          likeChart(jsonChart._id);
          liked = true;
        }
        window.location.reload();
      });
    });

    $('#like-button').on('click', function() {
      likeChart(jsonChart._id);
    });

    $('#parent-button').on("click", function () {
      goToParent();
    });

    // NEED TO DO: complete this part which should make it so we only display a delete button
    // to user if their ID matches the ID of chart creator
    
    var chart_id = jsonChart._id;
    var author = jsonChart.author;
    var user = window.sessionStorage.getItem('sessionUserId'); //TODO get current user!
    
    console.log("user",user,"author",author); //user is null for some reason.... so button never displayed
    
    if (user == author){
      $('#delete-button').removeClass("hidden").addClass("shown").on('click', 
        function() {
          deleteChart(jsonChart._id);
      });
    }//end if

  });
};