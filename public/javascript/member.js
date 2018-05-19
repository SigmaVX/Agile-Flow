$(document).ready(function() {

  var logoutBtn = $("#session-logout");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    var usrImg = $("<img>"),
        userId;

    console.log(data);
    initSessionRoutine();

    // display user email
    $("#appuser-name").html(data.email);

    // prepend an image to user navbar
    usrImg.attr("src", data.photo).
      attr("alt", "user image photo").
      attr("id", "user-image-photo").
      addClass("img-fluid").
      css("border-radius", "25px").
      css("float","left").
      css("margin-right", "10px");
    $("#user").prepend(usrImg);

    // set logged in user's data attributes
    console.log("data.id: " + data.id);
    $("#user").data("data-id", data.id);

    // verify user id number from data attribute
    userId = $("#user").data("data-id");

    console.log("verify userId: " + userId);
  });


  // nest within req.user
  logoutBtn.on("click", function (event) {

    event.preventDefault();

    $.get("/logout").then(function(data) {
      console.log("in /logout");

      // empty user name area
      $("#appuser-name").empty();

      // remove user photo from dom
      $("#user-image-photo").remove();

      // redisplay login and signup buttons on navbar, hide logout button
      $("#modalLogin").show();
      $("#modalSignup").show();
      $("#session-logout").hide();

    });
  });

  function initSessionRoutine() {
    // since user has successfully logged in hide login modal and
    // show logout button, also hide login and signup buttons
    $("#at-login").modal("hide");
    $("#session-logout").show();
    $("#modalLogin").hide();
    $("#modalSignup").hide();

  }
});