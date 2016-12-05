/**
* Handle the logic for login/signup page
*/
$(document).ready(function() {
  
  

  // add event listener so that login-button will login when clicked
  $('#login-button').on('click', function() {
    var username = document.getElementById("loguname");
    var password = document.getElementById("logpsw");


    $.ajax({
      url: '/login',
      method: 'POST',
      data: {
        username: document.getElementById("title").value,
        password: document.getElementById("description").value,

      },
      success: function() {
        console.log("successfully logged in");
        window.location.replace("/");
      },
      error: function(error) {
        console.log('Error logging in');
        console.log(error);
      }

    });//end ajax


  }); //end login-button handler


});