$(document).ready(function () {
  
  // hide logout button
  function displayLoginSignupButtons() {
    $("#session-logout").hide();
  }


  // Getting references to our form and input
  var signUpForm = $("#modal-signup-form"),
      firstNameInput = $("input#first-name"),
      lastNameInput = $("input#last-name"),
      userNameInput = $("input#user-name"),
      emailInput = $("input#user-email"),
      passwordInput = $("input#user-password"),
      confirmPassword = $("input#confirm-password");

  // clear signup success div in login modal
  $("#successful-signup").html("");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();

    // Use FormData constructor to build a new multipart form (for handling images)
    var formData = new FormData();

    // append user_name to form
    formData.append("userName", userNameInput.val().trim());
    // append first_name to form
    formData.append("firstName", firstNameInput.val().trim());
    // append last_name to form
    formData.append("lastName", lastNameInput.val().trim());
    // append email to form (email: 'alex@alex.com')
    formData.append("email", emailInput.val().trim());
    // append password to form (password: '12345')
    formData.append("password", passwordInput.val().trim());
    // append confirm password to form
    formData.append("confirmPassword", confirmPassword.val().trim());

    if ($("#file-input").prop("files")[0], $("#file-input").prop("files")[0]) {
      // append photo information to form (photo: {objOfPhotoInfo})
      formData.append("photo", $("#file-input").prop("files")[0], $("#file-input").prop("files")[0].name);
    }
    console.log($("#file-input").prop("files"));

    // if (!userData.email || !userData.password) {
    //   return;
    // }
    // If we have an email and password, run the signUpUser function
    signUpUser(formData);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(formData) {
    var successText = "";
    console.log(JSON.stringify(formData));
    $.ajax({
      url: "/api/signup/user",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST'
    }).done(function (data) {
      console.log(data);
      successText = "<h4>Successful signup.</h4><h5>Please login.</h5>";
      $("#at-signup-filling").modal("hide");
      $("#successful-signup").html(successText);
      $("#at-login").modal("show");
      $("#modalSignup").hide();
      // window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
      clearSigninInput();
    }).fail(function(xhr, textStatus, errorThrown) {
      // console.log(JSON.stringify(xhr));
      $("#signup-error").html(xhr.statusText);
    });
  }

  function handleLoginErr(err) {
    console.log(err);
    // $("#modal-signup-form").modal("toggle");
    $("#alert .msg").text(err);
    $("#alert").fadeIn(500);
  }

  // ----------------------------------------------------------------------------------
  // clear signin form data
  //
  function clearSigninInput() {
    $("input#first-name").val("");
    $("input#last-name").val("");
    $("input#user-name").val("");
    $("input#user-email").val("");
    $("input#user-password").val("");
    $("input#confirm-password").val("");
  }

  displayLoginSignupButtons();

});