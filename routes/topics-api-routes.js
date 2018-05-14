var db = require("../models");

module.exports = function(app) {

  // ============================================================================
  // API GET ROUTES FOR TOPICS
  //

  // ----------------------------------------------------------------------------
  // get all topics
  // ----------------------------------------------------------------------------
  app.get("/api/topics", function (req, res) {
    db.Topics.findAll({}).
    then(function (topicData) {
      console.log("# get api/topics: " + topicData.length);

      res.json(topicData);
    });
  });

  // ----------------------------------------------------------------------------
  // get specific topic by topicId req.param
  // ----------------------------------------------------------------------------
  app.get("/api/topics/:topicId", function(req, res) {
    db.Topics.findAll({"where": {"id": req.params.topicId}}).
    then(function (topicData) {
      // return 404 if no row was found, this means topicId does not exist
      if (!topicData) return res.status(404).end();
      console.log(topicData[0]);
      res.json(topicData);
    });
  });

  // ----------------------------------------------------------------------------
  // get open topics by topic state
  // ----------------------------------------------------------------------------
  app.get("/api/topics/:topic_state", function(req, res) {
    var topicState = req.params.state.toString();

    db.Topics.findAll({"where": {"topic_state": topicState}}).
    then(function (topicData) {
      // return 404 if no row was found, this means id does not exist
      if (!topicData) return res.status(404).end();

      res.json(topicData);
    });
  });


  // ============================================================================
  // API POST ROUTES FOR TOPICS
  //

  // ----------------------------------------------------------------------------
  // post topics when a topic is created
  // ----------------------------------------------------------------------------
  app.post("/api/topics", function(req, res) {
    db.Topics.create(req.body).then(function(topicData) {
      console.log("topic_id " + topicData.id + " created successfully.");

      res.json(topicData);
    });

  });


  // ----------------------------------------------------------------------------
  // put route for updating topics
  // ----------------------------------------------------------------------------
  app.put("/api/topics", function(req, res) {

    console.log("put id", req.body.id);
    db.Topics.update(
      req.body,
      {"where": {"id": req.body.id}}
    ).then(function(dbTopic) {
      console.log("topic_id " + req.body.id + " updated successfully.");

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
    db.Topics.destroy({"where": {"id": req.params.id}}).
    then(function(dbPost) {
      console.log("topic_id " + req.params.id + " deleted successfully");

      res.json(dbPost);
    });
  });

};