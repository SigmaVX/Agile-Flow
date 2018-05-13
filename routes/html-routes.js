// Requiring our topics and users models
var db = require("../models");

module.exports = function(app) {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  // ============================================================================
  // html GET ROUTES
  //

  // ----------------------------------------------------------------------------
  // get start page information, returns topics and users
  // ----------------------------------------------------------------------------
  app.get("/", function (req, res) {
    var hbsObject = {};

    db.Topics.findAll({}).
    then(function (topicData) {
      // return 404 if no row was found, this means no data exists
      if (!topicData) return res.status(404).end();

      hbsObject.topics = topicData;
      db.Users.findAll({}).

      then(function (userData) {
        // return 404 if no row was found, this means no data exists
        if (!userData) return res.status(404).end();

        hbsObject.users = userData;

        console.log(hbsObject.topics.length + " topics found.");
        console.log(hbsObject.users.length + " users found. ");

        // for testing res.json(hbsObject);
        res.render("index", hbsObject);
      });
    });
  });


  // ----------------------------------------------------------------------------
  // get topics page information
  // ----------------------------------------------------------------------------
  app.get("/topics", function (req, res) {
    var hbsObject = {};

    db.Topics.findAll({"where": {"topic_state": {[Op.or]: ["open", "pending"]}}}).
    then(function (topicData) {
      if (!topicData) res.status(404).end();
      hbsObject.openAndPending = topicData;

      db.Topics.findAll({"where": {"topic_state": "closed"}}).
      then(function (closedData) {
        if (!closedData) res.status(404).end();
        hbsObject.closed = closedData;

        db.Users.findAll({}).
        then(function (uData) {
          if (!uData) res.status(404).end();
          hbsObject.users = uData;
          console.log(hbsObject.openAndPending.length + " Open And Pending items found.");
          console.log(hbsObject.closed.length + " Closed Topics found.");
          console.log(hbsObject.users.length + " users found.");

          // for testing res.json(hbsObject);
          res.render("topics", hbsObject);
        });
      });
    });
  });

};