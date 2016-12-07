var loadChartTemplate = function(jsonChart) {


var number = getNumberOfLikes(jsonChart._id);

  $.get('mustache-templates/chart.template.html', function (template) {
    var html = Mustache.render($(template).html(), { title: jsonChart.title, description: jsonChart.description, author:jsonChart.author, number: number, });
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

    $('#remix-button').on('click', function() {
      window.sessionStorage.setItem('chart', JSON.stringify(jsonChart));
      window.location = "chart_editing.html";
    });

    $('#like-button').on('click', function() {


      likeChart(jsonChart._id);


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
      //TODO: DO DELETE
      alert("Deletes not implemented yet!");
    });
    }//end if

  });
};