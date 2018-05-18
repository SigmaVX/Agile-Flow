// import formidable
var formidable = require("formidable");
var cloudinary = require("cloudinary");

require("dotenv").config();

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = function(app) {

  // ============================================================================
  // API GET ROUTES FOR USERS
  //
  // get all users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).
    then(function (userData) {
        // return 404 if no row was found, this means no data exists
        if (!userData) return res.status(404).end();

        console.log("# of api/users: " + userData.length);
        res.json(userData);
    });

  });

  // get specific user
  app.get("/api/users/:id", function(req, res) {
    db.Users.findAll({"where": {"id": req.params.id}}).
    then(function (userData) {
      // return 404 if no row was found, this means id does not exist
      if (userData.length === 0) return res.status(404).end();

      res.json(userData);
    });
  });


  // ============================================================================
  // API POST ROUTES FOR USERS
  //
  // Add Routes
  // post or insert
  app.post("/api/users", function(req, res) {
    // var condition = "user_name = '" + req.body.user_name + "'";
    console.log("in /api/users data: " + JSON.stringify(req.body));

    db.Users.create(req.body).then(function(userData) {
      console.log("user_id " + userData.id + " created successfully");
      res.json(userData);
    });

  });

};