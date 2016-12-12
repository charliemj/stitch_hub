var loadFollowingTemplate = function(user) {
  $.get('mustache-templates/following.template.html', function (template) {

  	user.followedUserNames = [];
  	console.log(user.following);

  	user.following.forEach(
  		function (ID) {
  			user.followedUserNames.push(getUsernameFromID(ID));
  		})


    var html = Mustache.render($(template).html(), user);
    



    $('#following-template-container').append(html);
  });
}