var loadNavBarTemplate = function() {
  $.get('mustache-templates/nav_bar.template.html', function (template) {
    var username = window.sessionStorage.getItem('sessionUsername');
    var html = Mustache.render($(template).html(), {loggedIn: (username != null), username: username });
    $('#nav-bar-template-container').append(html);
    var userProfileLink = $('#user-profile-link');
    if (userProfileLink) {
      userProfileLink.on('click', function() {
        window.sessionStorage.setItem('userProfileId', window.sessionStorage.getItem('sessionUserId'));
        window.location = 'user_profile.html';
      });
    }
  });
}