var loadUserProfileHeaderTemplate = function(userProfileId) {
  $.get('mustache-templates/user_profile_header.template.html', function (template) {
    $.ajax({
      url: '/users/' + userProfileId,
      method: 'GET',
      success: function(data) { // expects to get the user back
        console.log(data);
        var html = Mustache.render($(template).html(), {username: data.user.username});
        $('#user-profile-header-template-container').append(html);
      },
      error: function(err) {
        console.log("Error getting the user with ID " + userProfileId);
        console.log(err);
      },
    });
  });
}