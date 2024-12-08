var logInForm = document.querySelector(".login-form");
var logInEmail = document.getElementById("ex-email");
var logInPass = document.getElementById("ex-password");
var logInBtn = document.getElementById("btn-login");

var signUpForm = document.querySelector(".signup-form");
var signName = document.getElementById("new-name");
var signEmail = document.getElementById("new-email");
var signPass = document.getElementById("new-password");
var signUpBtn = document.getElementById("btn-signup");

var aSignIn = document.getElementById("a-signIn");
var aSignUp = document.getElementById("a-signUp");

var alertMsg = document.querySelector("#alert");
var alertLogMsg = document.querySelector("#log-alert");

var emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
var nameRegex = /^[a-z0-9_-]{3,15}$/;

var users = [];

// CHECKS FOR PREVIOUS STORAGE
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// SIGN UP BUTTON ON CLICK
signUpBtn.addEventListener('click' , function () {

  if (signName.value == "" || signEmail.value == "" || signPass.value == "" ) {
    alertMsg.innerHTML = " All fields are required ";
    return;
  }

  for (var i = 0; i < users.length; i++) { 
    
    if ( signName.value == users[i].userName ) {
      alertMsg.innerHTML = " Name already exists ";
      return;
      
    } else if ( signEmail.value == users[i].email ) {
      alertMsg.innerHTML = " Email already exists ";
      return;

    } else if ( signPass.value == users[i].password ) {
      alertMsg.innerHTML = " Password already exists ";
      return;

    } 
  } 

  if (!emailRegex.test(signEmail.value)) {

    alertMsg.innerHTML = "Email is not valid";

    return;
  }

  if (!nameRegex.test(signName.value)) {

    alertMsg.innerHTML = "Name is not valid";

    return;
  }

  var newUser = {
    userName: signName.value,
    email: signEmail.value,
    password: signPass.value
  };

  
  users.push(newUser);
  localStorage.setItem("users" , JSON.stringify(users));

  alertMsg.classList.replace("text-danger","text-success");
          alertMsg.innerHTML = " Success ";
          setTimeout(function() {
            showLogInForm();
          alertMsg.classList.replace("text-success","text-danger");
          alertMsg.innerHTML = "";
          }, 1000);
  
});

// LOG IN BUTTON ON CLICK
logInBtn.addEventListener('click' , function (){

  users = JSON.parse(localStorage.getItem("users"));


  for (var i = 0; i < users.length; i++) {

    if ( logInEmail.value === users[i].email && logInPass.value === users[i].password ) {

      localStorage.setItem("loggedInUser", users[i].userName);

      window.location.href = "home.html";

    } else if ( logInEmail.value != users[i].email && logInPass.value === users[i].password  ) {

      alertLogMsg.innerHTML = " Email is wrong ";

      return;

    } else if ( logInEmail.value === users[i].email && logInPass.value != users[i].password  ) {

      alertLogMsg.innerHTML = " Password is wrong ";

      return;

    } else if (!emailRegex.test(logInEmail.value)) {

      alertLogMsg.innerHTML = "Email is not valid";

      return;
    }
    
  }

});

// CLICK ON SIGN IN LINK
aSignIn.addEventListener('click' , function () {
  
  signUpForm.classList.replace("d-block" , "d-none");
  logInForm.classList.replace("d-none" , "d-block");

});

//CLICK ON SIGN UP LINK
aSignUp.addEventListener('click' , function () {
  signUpForm.classList.replace("d-none" , "d-block");
  logInForm.classList.replace("d-block" , "d-none");
  signPass.value = "";
  signName.value = "";
  signEmail.value = "";
});
