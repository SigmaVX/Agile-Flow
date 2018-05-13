// Requiring our topics and users models
var db = require("../models");

// import seeds
// const topicSeeds = require("../seeders/topic_seeds.js");
// const userSeeds = require("../seeders/user_seeds.js");


module.exports = function(app) {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  // ============================================================================
  // html GET ROUTES
  //

  // ----------------------------------------------------------------------------
  // get start page information
  // ----------------------------------------------------------------------------
  app.get("/", function (req, res) {
    var hbsObject = {};

    db.Topics.findAll({}).
    then(function (topicData) {
      hbsObject = {topics: topicData};
      db.Users.findAll({}).

      then(function (userData) {

        hbsObject.users = userData;
        
        console.log("hbs topics: " + JSON.stringify(hbsObject.topics));
        console.log("hbs users: " + JSON.stringify(hbsObject.users));

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
      hbsObject.openAndPending = topicData;

      db.Topics.findAll({"where": {"topic_state": "closed"}}).
      then(function (closedData) {
        hbsObject.closed = closedData;

        db.Users.findAll({}).
        then(function (uData) {
          hbsObject.users = uData;
          console.log("open and pending topics: " + JSON.stringify(hbsObject.openAndPending));
          console.log("closed topics: " + JSON.stringify(hbsObject.closed));
          console.log("users data: " + JSON.stringify(hbsObject.users));

          res.render("topics", hbsObject);
        });
      });
    });
  });

};