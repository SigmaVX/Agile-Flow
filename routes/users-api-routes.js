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

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup/user", function (req, res) {

    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files.photo);

      if (files.photo) {
        // upload file to cloudinary, which'll return an object for the new image
        cloudinary.uploader.upload(files.photo.path, function (result) {
          console.log(result);
          // create new user
          db.Users.create({
            user_name: fields.userName,
            first_name: fields.firstName,
            last_name: fields.lastName,
            email: fields.email,
            user_pw: fields.password,
            user_photo: result.secure_url
          }).then(function () {
            res.json(true);
            // res.json("/login");
          }).catch(function (err) {
            console.log(err);
            res.json(err);
          });
        });
      } else {
        db.Users.create({
          user_name: fields.userName,
          email: fields.email,
          user_pw: fields.password,
          first_name: fields.firstName,
          last_name: fields.lastName
        }).then(function () {
          res.json(true);
          // res.redirect(307, "/api/login");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
      }
    });

  });

};