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











});