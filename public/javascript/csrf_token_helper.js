var getCsrfToken = function (callback) {
  $.ajax({
    url: '/csrf',
    method: 'GET',
    success: function(data) {
      console.log(data);
      callback(data.csrfToken);
    },
    error: function(err) {
      console.log(err);
      alert('Failed to get CSRF token');
    }
  });
};