var loadLogoutTemplate = function() {
  $.get('mustache-templates/logout.template.html', function(template) {
    var html = $(template).html();
    $('#logout-container').append(html);

    $('#logout-button').on('click', function() {
      // prevent logging out if user has not logged in
      // TODO(denisli): How do we avoid using 'null' here? It's a string.
      if (window.sessionStorage.getItem('sessionUserId') == 'null') { // true when null
        alert('You have not yet logged in!');
        return;
      }
      // otherwise make a request to log out
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function(data) {
          if (data.loggedOut) {
            window.sessionStorage.setItem('sessionUsername', null);
            window.sessionStorage.setItem('sessionUserId', null);
            alert("successfully logged out");
          } else {
            alert("failed to log out");
          }
        },
        error: function(error) {
          console.log('Error logging out');
          console.log(error);
        }

      });//end ajax
      window.location.reload();

    }); //end login-button handler
  })
}