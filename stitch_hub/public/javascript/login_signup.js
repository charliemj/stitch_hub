/**
* Handle the logic for login/signup page
*/
$(document).ready(function() {
  
  

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
}


$('#LogButton').on('click', function() {
    var username = document.getElementById("SU_uname").value;
    var password = document.getElementById("SU_psw").value;


    $.ajax({
      url: '/login',
      method: 'POST',
      data: {
        username: username,
        password: password,


      },
      success: function() {
        console.log("successfully logged in");
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
    var bday = document.getElementById("bday").value;


    $.ajax({
      url: '/signup',
      method: 'POST',
      data: {
        username: username,
        password: password,
        email: email,
        bday: bday


      },
      success: function() {
        console.log("successfully registered");
      },
      error: function(error) {
        console.log('Error registering');
        console.log(error);
      }

    });//end ajax


  }); //end signup-button handler





});