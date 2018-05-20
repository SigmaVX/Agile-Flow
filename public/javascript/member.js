// ===========================================================================================
//
// File name: member.js
// Date: May, 2018
// Description: member.js retreives an authenticated user's information using the 
// /api/user-data routes. This file also handles logging out a user. The front end 
// authorization suite includes login.js, signup.js and member.js .
//
// ===========================================================================================

$(document).ready(function() {

  var logoutBtn = $(".session-logout");

  // -------------------------------------------------------------------------------------
  // isEmptyObject returns true if object is empty, false otherwise
  //
  function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;
  }

  // ----------------------------------------------------------------------------------------
  // This function does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    var usrImg = $("<img>"),
        userId;

    if (!isEmptyObject(data)) {
      // user is signed in

      initSessionRoutine();
      // prepend user's profile image to user navbar
      usrImg.attr("src", data.photo).
        attr("alt", "user image photo").
        attr("id", "user-image-photo").
        addClass("img-fluid").
        css("border-radius", "25px").
        css("float","left").
        css("margin-right", "10px");
      $("#user-image").prepend(usrImg);

      // set logged in user's data attributes
      // console.log("data.id: " + data.id);
      $("#user").data("user-id", data.id);
      $("#user").data("data-id", data.id);

      // verify user id number from data attribute
      userId = $("#user").data("user-id");

      console.log("verify userId: " + userId);

      // display user email
      $("#appuser-name").html(data.email);

    } // temporary fix to hardcode user id as 1
    else {
      $("#user").data("user-id", 1);
      $("#user").data("data-id", 1);
      userId = $("#user").data("user-id");
      console.log("verify userId: " + userId);
    }

  });

  // ------------------------------------------------------------------------------------------
  // logout user. When user is successfully logged out, the top navbar is also manipulated
  //  to reflect the logout event. The logout button disappears and the signup and login
  //  buttons reappear.
  //
  logoutBtn.on("click", function (event) {

    event.preventDefault();

    $.get("/logout").then(function(data) {

      // empty user name area
      $("#appuser-name").empty();

      // remove user photo from dom
      $("#user-image").empty();
      $("#user-image-photo").remove();

      // redisplay login and signup buttons on navbar, hide logout button
      $("#modalLogin").show();
      $("#modalSignup").show();
      $(".session-logout").hide();

      // reload to send back to default public user view
      location.reload();

    });
  });

  // ------------------------------------------------------------------------------------------
  // initSessionRoutine() modifies the top navbar login/logout/signup buttons when a user
  //  successfully logs in.
  //
  function initSessionRoutine() {
    // since user has successfully logged in hide login modal and
    // show logout button, also hide login and signup buttons
    console.log("in initSession Routine()");
    $("#at-login").modal("hide");
    $(".session-logout").show();
    $("#modalLogin").hide();
    $("#modalSignup").hide();

  }
});