var loadNavBarTemplate = function(currentUser) {
  $.get('mustache-templates/nav_bar.template.html', function (template) {
    var username = currentUser ? currentUser.username : null;
    var html = Mustache.render($(template).html(), {loggedIn: (currentUser != null), username: username });
    $('#nav-bar-template-container').append(html);
    if (currentUser) {
      var userProfileLink = $('#user-profile-link');
      if (userProfileLink) {
        userProfileLink.on('click', function() {
          window.sessionStorage.setItem('userProfileId', currentUser._id);
          window.location = 'user_profile.html';
        });
      }
    }
  });
}