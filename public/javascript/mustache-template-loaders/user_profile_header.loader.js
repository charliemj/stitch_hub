var loadUserProfileHeaderTemplate = function(profileUser, currentUser, csrfToken) {
  $.get('mustache-templates/user_profile_header.template.html', function (template) {
    var userProfileId = profileUser._id;
    var username = profileUser.username;
    var html = Mustache.render($(template).html(), {username: username});
    $('#user-profile-header-template-container').append(html);

    $('#follow-button').on('click', function() {
      if (currentUser == null) {
        alert('You must be logged in to follow someone!');
        return;
      }
      if (currentUser._id == userProfileId) {
        alert('You cannot follow yourself!');
        return;
      }


      $.ajax({
        url: '/users/user/' + currentUser._id + '/following',
        method: 'PUT',
        data:{
          userIdToFollow: userProfileId,
          _csrf: csrfToken,
        },
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

    $('#unfollow-button').on('click', function() {
      if (currentUser == null) {
        alert('You must be logged in to follow someone!');
        return;
      }
      if (currentUser._id == userProfileId) {
        alert('You cannot follow yourself!');
        return;
      }
      

      $.ajax({
        url: '/users/user/' + currentUser._id + '/remove/following',
        method: 'PUT',
        data:{
          userIdToUnfollow: userProfileId,
          _csrf: csrfToken,
        },
        success: function(data) {
          if (data.updated) {
            alert('successfully unfollowed ' + username);
          } else {
            alert('failed to unfollow ' + username);
          }
        },
        error: function(err) {
          console.log('error in unfollowing ' + username);
          console.log(err);
        }
      });
    });

    // SHOW/HIDE THINGS IF NOT LOGGED IN

   
    if (currentUser == null || (currentUser._id == userProfileId)){
      //should not show on user's own page
      $("#follow-button").hide();
      $("#unfollow-button").hide();
    }



  });
};