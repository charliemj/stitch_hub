var doComment = function (chartID, currentUser, text){
  $.ajax({
    url: '/comments',
    method: 'POST',
    data: {
      chartId: chartID,
      userId: currentUser._id,
      text: text          
    },
    success: function() {
    },
    error: function(error) {
      console.log('Error commenting');
      console.log(error);
    }

  });//end ajax

};

var getComments = function(chartID){
var result;
$.ajax({
        url: '/comments/chart/' + chartID,
        method: 'get',
        async: false,
        data: {
          chartID: chartID
        },
        success: function(message) {
          result = message.message;
        },
        error: function(error) {
          console.log('Error getting comments');
          console.log(error);
        }
      });//end ajax
      if (result == null){
        return [];
      }
      return result;
};
