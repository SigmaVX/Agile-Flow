$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#login-form");
  var emailInput = $("input#login-email");
  var passwordInput = $("input#login-password");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    clearLoginInfo();
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).done(function (data) {
      console.log("login data: " + JSON.stringify(data));
      $("#at-login").modal("hide");
      $("#session-logout").show();
      window.location.replace(data);
      // If there's an error, log the error
    }).fail(function (err) {
      console.log(err);
    });
  }

  // --------------------------------------------------------------------------------------------------
  // clear login info
  function clearLoginInfo() {
    $("input#login-email").val("");
    $("input#login-password").val("");
  }

});