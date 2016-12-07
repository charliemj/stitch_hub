var deleteChart = function (chartID){

$.ajax({
        url: '/charts/',
        method: 'PUT',
        data: {
          chartID: chartID,
          
        },
        success: function() {
          console.log("successfully deleted it");
        },
        error: function(error) {
          console.log('Error deleting');
          console.log(error);
        }

      });//end ajax

}