var loadUserProfileHeaderTemplate = function(user) {
  $.get('mustache-templates/user_profile_header.template.html', function (template) {
    var userProfileId = user._id;
    var username = user.username;
    var html = Mustache.render($(template).html(), {username: username});
    $('#user-profile-header-template-container').append(html);

    $('#follow-button').on('click', function() {
      var userId = window.sessionStorage.getItem('sessionUserId');
      if (userId == 'null') {
        alert('You must be logged in to follow someone!');
        return;
      }
      if (userId == userProfileId) {
        alert('You cannot follow yourself!');
        return;
      }

      $.ajax({
        url: '/users/user/' + userProfileId + '/following',
        method: 'PUT',
        success: function(data) {
          if (data.updated) {
            alert('successfully followed ' + username);
          } else {
            alert('failed to follow ' + username);
          }
        },
        error: function(err) {
          console.log('error in following ' + username);
          console.log(err);
        }
      });
    });


    // SHOW/HIDE THINGS IF NOT LOGGED IN
    if (window.sessionStorage.getItem('sessionUserId') != 'null'){
      //should be logged in
      $("#follow-button").show();
    }else{
      // not logged in
      $("#follow-button").hide();
    }

    if (window.sessionStorage.getItem('sessionUserId') == userProfileId){
      //should not show on user's own page

      console.log(window.sessionStorage.getItem('sessionUserId'));
      console.log(userProfileId)

      $("#follow-button").hide();
    }



  });
};