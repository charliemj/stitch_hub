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


var likeChart = function (chartID){

$.ajax({
        url: '/like',
        method: 'POST',
        data: {
          chartID: chartID,
          
        },
        success: function() {
          console.log("successfully liked it");
        },
        error: function(error) {
          console.log('Error liking it');
          console.log(error);
        }

      });//end ajax

}
var getLikedCharts = function(userID){

  //TODO
}