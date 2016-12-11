var getUsernameFromID = function(ID){
	var name;
	$.ajax({
        url: '/users/'+ID,
        method: 'GET',
        async: false,
        success: function(res) {
          name = res.user.username;
          
        },
        error: function(error) {
          console.log(error);
        }

      });//end ajax
		return name;
};