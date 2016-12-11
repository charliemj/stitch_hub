var doComment = function (chartID, text){

$.ajax({
        url: '/comment',
        method: 'POST',
        data: {
          chartID: chartID,
          text: text
          
        },
        success: function() {
          console.log("successfully commented");
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
        url: '/comment/' + chartID,
        method: 'get',
        async: false,
        data: {
          chartID: chartID
        },
        success: function(message) {
          console.log("successfully got comments");
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
