var db = require("../models");

module.exports = function(app) {

  // ============================================================================
  // API GET ROUTES FOR TOPICS
  //

  // ----------------------------------------------------------------------------
  // get all topics
  // ----------------------------------------------------------------------------
  app.get("/api/topics", function (req, res) {
    // var hbsObject = {};

    db.Topics.findAll({}).
    then(function (topicData) {

        // hbsObject = {"users": userData};

        console.log("get api/users: " + JSON.stringify(topicData));

        res.json(topicData);
    });

  });

  // ----------------------------------------------------------------------------
  // get specific topic by topicId req.param
  // ----------------------------------------------------------------------------
  app.get("/api/topics/:topicId", function(req, res) {
    db.Topics.findAll({"where": {"topic_state": req.params.topicId}}).
    then(function (topicData) {
      if (topicData.length === 0) {
        // return 404 if no row was found, this means id does not exist
        return res.status(404).end();
      }

      res.json(topicData);

      return true;
      });
  });

  // ----------------------------------------------------------------------------
  // get open topics by topic state
  // ----------------------------------------------------------------------------
  app.get("/api/topics/:topic_state", function(req, res) {
    var topicState = req.params.state.toString();

    db.Topics.findAll({"where": {"topic_state": topicState}}).
    then(function (topicData) {
      if (topicData.length === 0) {
        // return 404 if no row was found, this means id does not exist
        return res.status(404).end();
      }

      res.json(topicData);

      return true;
      });
  });

  // ============================================================================
  // API POST ROUTES FOR TOPICS
  //

  // ----------------------------------------------------------------------------
  // post topics when a topic is created
  // ----------------------------------------------------------------------------
  app.post("/api/topics", function(req, res) {
    // var condition = "user_name = '" + req.body.user_name + "'";

    db.Topics.create(req.body).then(function(topicData) {
        res.json(topicData);
    });

  });


  // ----------------------------------------------------------------------------
  // put route for updating topics
  // ----------------------------------------------------------------------------
  app.put("/api/topics", function(req, res) {
    db.Topics.update(
      req.body,
      {"where": {"id": req.body.id}}
    ).then(function(dbTopic) {
      res.json(dbTopic);
    });
  });


  // ============================================================================
  // API DELETE ROUTES FOR TOPICS
  //

  // ----------------------------------------------------------------------------
  // delete topics route
  // ----------------------------------------------------------------------------
  app.delete("/api/topics/:id", function(req, res) {
    db.Post.destroy({"where": {"id": req.params.id}}).
    then(function(dbPost) {
      res.json(dbPost);
    });
  });

};