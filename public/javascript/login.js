// ===========================================================================================
//
// File name: login.js
// Date: May, 2018
// Description: Front end interface to login consoles. Handles login modal processing for
//  app. Interacts with login api. The front end authorization suite includes login.js,
//  signup.js and member.js
//
// ===========================================================================================

$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#login-form");
  var loginError = $("login-error");
  var emailInput = $("input#login-email");
  var passwordInput = $("input#login-password");
  var loginEmailError = $("#login-email-error");
  var loginPswdError = $("#login-password-error");

  // hide login error divs
  hideLoginErrorDivs();


  // --------------------------------------------------------------------------------
  // When the form is submitted, we validate there's an email and password entered
  //
  loginForm.on("submit", function (event) {
    var validLoginInfo = true;

    event.preventDefault();

    clearLoginErrorDivs();
    hideLoginErrorDivs();

    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // validation
    if (!userData.email || !userData.password) {
      displayErrorMessage(loginError, "Please enter email and password.");
      validLoginInfo = false;
    }

    if (!validEmail(userData.email)) {
      displayErrorMessage(loginEmailError, "Please enter valid email.");
      validLoginfInfo = false;
    }

    if (!validPassword(userData.password)) {
      displayErrorMessage(loginPswdError, "Password must be at least 7 characters and contain at least one letter and one digit.");
      validLoginfInfo = false;
    }

    // If we have an email and password we run the loginUser function and clear the form
    if (validLoginInfo) loginUser(userData.email, userData.password);
    clearLoginInfo();
  });

  // ------------------------------------------------------------------------------------------
  // loginUser does a post to our "api/login" route and if successful, redirects to index page
  //
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).done(function (data) {
       // console.log("login data: " + JSON.stringify(data));
      $("#at-login").modal("hide");
      $(".session-logout").show();
      location.reload();
      // If there's an error, log the error
    }).fail(function(xhr, textStatus, err) {
      console.log(err);
      $("#login-error").removeClass("bg-white").
                        addClass("bg-danger").
                        html("Please enter correct username and password.");
    });
  }

  // --------------------------------------------------------------------------------------------------
  // clearLoginInfo() clears out login info
  //
  function clearLoginInfo() {
    $("input#login-email").val("");
    $("input#login-password").val("");
  }

  // ------------------------------------------------------------------------------------------------
  // clearLoginErrorDivs empties out error validation divs
  //
  function clearLoginErrorDivs() {
    $(loginEmailError, loginPswdError, loginError).removeClass("bg-danger").
                                                   addClass("bg-white").
                                                   empty();

  }

  // --------------------------------------------------------------------------------------------------
  // hide login error divs
  //
  function hideLoginErrorDivs() {
    $(loginEmailError).hide();
    $(loginPswdError).hide();
  }

});