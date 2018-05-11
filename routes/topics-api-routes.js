var db = require("../models");

module.exports = function(app) {

  // ============================================================================
  // API GET ROUTES FOR TOPICS
  //

  // get all topics
  app.get("/api/topics", function (req, res) {
    // var hbsObject = {};

    db.Topics.findAll({}).
    then(function (topicData) {

        // hbsObject = {"users": userData};

        console.log("get api/users: " + JSON.stringify(topicData));

        res.json(topicData);
    });

  });

  // ============================================================================
  // API POST ROUTES FOR TOPICS
  //
  // Add Routes
  // post topics
  app.post("/api/topics", function(req, res) {
    // var condition = "user_name = '" + req.body.user_name + "'";

    db.Topics.create(req.body).then(function(topicData) {
        res.json(topicData);
    });

  });

};