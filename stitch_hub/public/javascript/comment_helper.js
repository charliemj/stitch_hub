var doComment = function (chartID, text){

$.ajax({
        url: '/comment/chart/' + chartID + '/user/' + window.sessionStorage.getItem('sessionUserId'),
        method: 'POST',
        data: {
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
        url: '/comment/' + chartID,
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
