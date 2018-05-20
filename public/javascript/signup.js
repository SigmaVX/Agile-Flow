// ===========================================================================================
//
// File name: signup.js
// Date: May, 2018
// Description: This file is the handles the signup form and the update profile form.
//  These functions make use of the /api/signup/user and /api/update/user routes. The signup
//  and update routines display validation error messages. The front end authorization 
//  suite includes login.js, signup.js and member.js .
//
// ===========================================================================================

$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("#modal-signup-form"),
      saveProfile =  $("#myprofile-form"),
      firstNameInput = $("input#first-name"),
      lastNameInput = $("input#last-name"),
      userNameInput = $("input#user-name"),
      emailInput = $("input#user-email"),
      passwordInput = $("input#user-password"),
      confirmPassword = $("input#confirm-password"),
      // currentPasswordInput,
      newPasswordInput,
      confirmNewPasswordInput;

  var currentUserId;

  // -----------------------------------------------------------------------------------------
  // hide logout button
  //
  function displayLoginSignupButtons() {
    $(".session-logout").hide();
  }

  // clear signup success div in login modal
  $("#successful-signup").html("");

  // --------------------------------------------------------------------------------------
  // When the signup button is clicked, we validate the email and password are not blank.
  // signUpForm builds 'formidable' form data (necessary because of the cloudinary photo
  // element).
  //
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    $("#signup-error").empty().
                       removeClass("bg-danger").
                       addClass("bg-white");

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
    // console.log($("#file-input").prop("files"));

    signUpUser(formData);
  });

  // -----------------------------------------------------------------------------------
  // signupUser() takes in the form data and does a post to the signup route. If 
  // successful, the page is reloaded with user info. Otherwise we log any errors
  //
  function signUpUser(formData) {
    var successText = "";

    // console.log(JSON.stringify(formData));
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

      clearSigninInput();
      // If there's an error, handle it by displaying validation error
    }).fail(function(xhr, textStatus, errorThrown) {
      $("#signup-error").removeClass("bg-white").
                         addClass("bg-danger").
                         html(xhr.statusText);
    });
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

  // -------------------------------------------------------------------------------------
  // saveProfile() builds the update profile form data. Since user can update profile
  // picture and 'files' are involved a 'formidable' form is constructed.
  //
  saveProfile.on("submit", function(event) {
    event.preventDefault();
    // empty error message area
    $("#update-profile-error").empty().
                              removeClass("bg-danger").
                              addClass("bg-white");

    // currentPasswordInput = $("input#update-password");
    newPasswordInput = $("input#confirm1-update-password");
    confirmNewPasswordInput = $("input#confirm2-update-password");

    // FormData constructor
    var updateForm = new FormData();

    // append orignal password to form (password: '12345')
    // updateForm.append("originalPassword", currentPasswordInput.val().trim());
    // append new password to form
    updateForm.append("newPassword", newPasswordInput.val().trim());
    // confirm new password to form
    updateForm.append("confirmNewPassword", confirmNewPasswordInput.val().trim());

    if ($("#update-file-input").prop("files")[0], $("#update-file-input").prop("files")[0]) {
      // append photo information to form (photo: {objOfPhotoInfo})
      updateForm.append("photo", $("#update-file-input").prop("files")[0], $("#update-file-input").prop("files")[0].name);
    }
    // console.log($("#update-file-input").prop("files"));

    updateUserInfo(updateForm);
  });

  // ----------------------------------------------------------------------------
  // updateUserInfo() does an update route. If successful, we are redirected to the
  // index page with new profile information. Otherwise we log any errors
  //
  function updateUserInfo(updateForm) {
    console.log(JSON.stringify(updateForm));
    $.ajax({
      url: "/api/updateprofile/user/" + currentUserId.toString(),
      data: updateForm,
      cache: false,
      // crossDomain: true,
      contentType: false,
      processData: false,
      method: "PUT"
    }).done(function (data) {
      // get new profile picture
      $.get("/api/new_photo").then(function(newData) {
        var usrImg = $("<img>");

        console.log(newData);

        if (!isEmptyObject(newData)) {
          // remove previous image from DOM
          $("#user-image").empty();

          // prepend new user image to user navbar
          usrImg.attr("src", newData.photo).
            attr("alt", "user image photo").
            attr("id", "user-image-photo").
            addClass("img-fluid").
            css("border-radius", "25px").
            css("float","left").
            css("margin-right", "10px");
          $("#user-image").prepend(usrImg);
        }
        // upon profile update, go back to index page
        window.location.replace("/");
      });

      // If there's an error, handle it by displaying validation error
    }).fail(function(xhr, textStatus, errorThrown) {
      $("#update-profile-error").removeClass("bg-white").
                                 addClass("bg-danger").
                                 html(xhr.statusText);
    });
  }

  // ----------------------------------------------------------------------------------
  // clear update form data
  //
  function clearUpdateInput() {
    // currentPassword.val("");
    newPassword.val("");
    confirmNewPassword.val("");
  }

  // -------------------------------------------------------------------------------------
  // must wait for user_data ajax query to return value
  //
  $.get("/api/user_data").then(function(data) {
    currentUserId = data.id;
    saveProfile =  $("#myprofile-form");
    // console.log("in signup.js currentUserId: " + currentUserId);
  });

  // -------------------------------------------------------------------------------------
  // isEmptyObject() returns true if object is empty, false otherwise
  //
  function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;
  }

});