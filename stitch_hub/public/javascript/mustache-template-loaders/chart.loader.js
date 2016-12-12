var loadChartTemplate = function(jsonChart, currentUser) {

var number = getNumberOfLikes(jsonChart._id);
jsonChart.number = number;
jsonChart.authorname = getUsernameFromID(jsonChart.author);
jsonChart.tagsConcatenated = jsonChart.tags.join(' ');


  $.get('mustache-templates/chart.template.html', function (template) {
    var html = Mustache.render($(template).html(), jsonChart);
    $('#chart-container').append(html);

    if (!jsonChart.is_deleted){
          // color the canvas based on the given chart
          var canvas = document.getElementById("canvas");
          var model = getChartFromJson(jsonChart);
          var standardSize = getStandardSize(jsonChart.type);
          var view = ChartView(standardSize.cellWidth, standardSize.cellHeight, model, canvas);
          view.draw();

          // add a link to the user when clicked in the username
          $('#author-profile-link').on('click', function() {
            window.sessionStorage.setItem('userProfileId', jsonChart.author);
            window.location = "user_profile.html";
          });

          if (currentUser == null || (currentUser._id != jsonChart.author)) {
              document.getElementById('chart-description').contentEditable='false';
              document.getElementById('chart-tags').contentEditable='false';
          }


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
              }
            });
          });

          // make the chart tags editable
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
          // save when clicking on the edit tags button
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
            console.log(newTags);
            $.ajax({
              url: '/charts/' + jsonChart._id + '/tags',
              data: {
                tags: JSON.stringify(newTags),
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
            if (currentUser == null){

               alert("You are not logged in");
            }else{
              window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
              window.location = "chart_editing.html";
            }
          });

          getCurrentUserLike(jsonChart._id, currentUser, function(err, liked) {
            // set the initial state of the button
            $('#like-button').text(liked ? 'Unlike' : 'Like');
            // set the onclick listener of the button
            $('#like-button').on('click', function() {
              if (liked) {
                $('#like-button').text('Like');
                unlikeChart(jsonChart._id);
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
            goToParent(jsonChart,currentUser);
          });

          $('#report-button').on("click",function() {
            console.log("REPORT!");
            window.location = 'contact.html'
          });

          // NEED TO DO: complete this part which should make it so we only display a delete button
          // to user if their ID matches the ID of chart creator
          
          var chart_id = jsonChart._id;
          var author = jsonChart.author;
          
          if (currentUser != null && (currentUser._id == author)){
            $('#delete-button').removeClass("hidden").addClass("shown").on('click', 
              function() {
                deleteChart(jsonChart._id);
            });
          }//end if
        }//end if not deleted
        else{
          $('#parent-button').on("click", function () {
            goToParent(jsonChart,currentUser);
          });
        }

        if (jsonChart.parent == null){
          $('#parent-button').hide()
        }

        var comments = getComments(jsonChart._id);

  //var comments = ["test comment", "test comment 2", "test comment 3"];

  for (var i = 0; i<comments.length; i++){
    $('#comments-container').append("<b>" +getUsernameFromID(comments[i].user) + ": </b><br>");
    $('#comments-container').append(comments[i].text);
    $('#comments-container').append("<hr>");

  }

  // SHOW/HIDE THINGS IF NOT LOGGED IN
  if (currentUser){
    //should be logged in
    $("#like-button").show();
    $('#comment-making-block').show();
    $('#remix-button').show();
  }else{
    //should be not logged in
    $("#like-button").hide();
    $('#comment-making-block').hide();
    $('#remix-button').hide();
  }

  console.log("REACHED THE CHART PAGE");
  $('#saveComment-button').on('click', function() {
    if (currentUser == null) {
      alert('You must be logged in to comment!');
      return;
    }
    console.log("Is this really clicked?");
    var text = document.getElementById('newComment').value;
    doComment(jsonChart._id, currentUser, text);
    window.location.reload();
  });
  });
};