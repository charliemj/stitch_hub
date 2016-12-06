var loadLoginSignupWidget = function() {
  $.get('mustache-templates/login_signup.template.html', function(template) {
    var html = $(template).html();
    $('#login-signup-container').append(html);

    // Get the login modal
    var loginmodal = document.getElementById('loginbox');

    // Get the signup modal
    var signupmodal = document.getElementById('signupbox');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == loginmodal) {
          loginmodal.style.display = "none";

      } else if (event.target == signupmodal) {
          signupmodal.style.display = "none";
      }
    };


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
<<<<<<< Updated upstream
            console.log(username,"hi!", data.userId);
=======
<<<<<<< HEAD
            // console.log(data.userId,"Hi!");
            // window.sessionStorage.setItem('sessionUserId', data.userId);
            window.sessionStorage.setItem('sessionUsername', username);
            console.log(username,"bye!");
=======
            windows.sessionStorage.setItem('userId', data.userId);
>>>>>>> bc9c9714d76516a7e6fd253115d129ff57f7249b
>>>>>>> Stashed changes
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


    $('#RegButton').on('click', function() {
      var username = document.getElementById("SU_uname").value;
      var password = document.getElementById("SU_psw").value;
      var email = document.getElementById("email").value;
      var dob = document.getElementById("dob").value;


      $.ajax({
        url: '/users',
        method: 'POST',
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


    }); //end signup-button handler
  })
}