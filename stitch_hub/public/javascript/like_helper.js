var getNumberOfLikes = function (chartID){
  var result;
  $.ajax({
        url: '/like/likes/',
        method: 'GET',
        async: false,
        data: {
          chartID: chartID          
        },
        success: function(number) {
          console.log("likehelper");
          console.log(chartID);
          console.log("successfully counted likes");
          result = number.message;
        },
        error: function(error) {
          console.log('Error counting likes');
          console.log(error);
        }

      });//end ajax
      return result;
}


var getLikedCharts = function(userID){

  //TODO
}