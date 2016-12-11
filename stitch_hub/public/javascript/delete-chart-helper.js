var deleteChart = function (chartID){
var newChart;
$.ajax({
        url: '/charts/' + chartID + '/is_deleted',
        method: 'PUT',
        async: false,
        data: {
          chartID: chartID,
          
        },
        success: function(result) {
          newChart = result.message;


       },
        error: function(error) {
          console.log('Error deleting');
          console.log(error);
        }

      });//end ajax
      window.sessionStorage.setItem('chart', JSON.stringify(newChart));
      window.location.reload();

}