var getCurrentUser = function(callback) {
  $.ajax({
    url: '/currentUser',
    method: 'GET',
    success: function(data) {
      callback(data.user)
    },
    error: function (err) {
      console.log(err);
      alert('Failed to get current user');
    }
  });
}