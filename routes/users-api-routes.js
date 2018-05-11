var db = require("../models");

module.exports = function(app) {

  // get all users
  app.get("/api/users", function (req, res) {
    // var hbsObject = {};

    db.Users.findAll({}).
    then(function (userData) {

        // hbsObject = {"users": userData};

        console.log("get api/users: " + JSON.stringify(userData));

        res.json(userData);
    });

  });

  // Add Routes
  // post or insert
  app.post("/api/users", function(req, res) {
    // var condition = "user_name = '" + req.body.user_name + "'";
    console.log("in /api/users data: " + JSON.stringify(req.body));

    db.Users.create(req.body).then(function(userData) {
      res.json(userData);
    });

  });

};