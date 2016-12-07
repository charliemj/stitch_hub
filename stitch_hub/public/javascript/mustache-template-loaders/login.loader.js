var loadLoginTemplate = function() {
  $.get('mustache-templates/login.template.html', function(template) {
    var html = $(template).html();
    $('#login-container').append(html);

    // Get the login modal
    var loginmodal = document.getElementById('loginbox');

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
      if (event.target == loginmodal) {
          loginmodal.style.display = "none";
      }
    });


    $('#LogButton').on('click', function() {
      var username = document.getElementById("uname").value;
      var password = document.getElementById("psw").value;


      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          username: username,
          password: password
        },
        success: function(data) {
          if (data.loggedIn) {
            window.sessionStorage.setItem('sessionUsername', username);
            window.sessionStorage.setItem('sessionUserId', data.userId);
            alert("successfully logged in");
          } else {
            alert("failed to log in");
          }
        },
        error: function(error) {
          console.log('Error logging in');
          console.log(error);
        }

      });//end ajax


    }); //end login-button handler
  })
}