var getUsernameFromID = function(ID){
	var name;
	$.ajax({
        url: '/users/'+ID,
        method: 'GET',
        async: false,
        success: function(res) {
          name = res.user.username;
          console.log("successfully got username;");
          
        },
        error: function(error) {
          console.log('Error liking it');
          console.log(error);
        }

      });//end ajax
		console.log(name);
		return name;
};