$(document).ready(function () {
  var userId = window.sessionStorage.getItem('userId');

  // do we even need userId? Why not just user the username?
  // fetch information from the server regarding the user
  $.ajax({
    url: '/users/' + userId, // what do i need to do to get the specific user?
    method: 'GET',
    success: function(data) {
      // load user template
    },
    error: function(err) {

    },
  });

});