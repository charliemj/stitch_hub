var loadSignupTemplate = function() {
  $.get('mustache-templates/signup.template.html', function(template) {
    var html = $(template).html();
    $('#signup-container').append(html);

    // Get the signup modal
    var signupmodal = document.getElementById('signupbox');

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
      if (event.target == signupmodal) {
          signupmodal.style.display = "none";
      }
    });

    $('#RegButton').on('click', function() {
      var username = document.getElementById("SU_uname").value;
      var password = document.getElementById("SU_psw").value;
      var email = document.getElementById("email").value;
      var dob = document.getElementById("dob").value;


      $.ajax({
        url: '/users',
        method: 'POST',
        async: false,
        data: {
          username: username,
          password: password,
          email: email,
          dob: dob


        },
        success: function() {
          alert("successfully registered");
        },
        error: function(error) {
          console.log('Error registering');
          console.log(error);
        }



      });//end ajax

      $.ajax({
        url: '/login',
        method: 'POST',
        async: false,
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
      window.location.reload();

    }); //end signup-button handler
  })
}