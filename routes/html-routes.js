// Requiring our topics and users models
var db = require("../models");

// import seeds
// const topicSeeds = require("../seeders/topic_seeds.js");
// const userSeeds = require("../seeders/user_seeds.js");


module.exports = function(app) {

  // Add Routes
  // get all users and topics
  app.get("/", function (req, res) {
    var hbsObject = {};

    db.Topics.findAll({}).
    then(function (topicData) {
      hbsObject = {topics: topicData};
      db.Users.findAll({}).

      then(function (userData) {

        hbsObject = {
          topics: topicData,
          users: userData
        };
        hbsObject.users = userData;

        console.log("hbs topics: " + JSON.stringify(hbsObject.topics));
        console.log("hbs users: " + JSON.stringify(hbsObject.users));

        res.render("index", hbsObject);
      });
    });
  });

};