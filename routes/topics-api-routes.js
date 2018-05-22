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
  app.get("/api/topics/one/:topicId", function(req, res) {
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
  app.get("/api/topics/one/:topic_state", function(req, res) {
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
  //  post topics when a topic is created
  //  make sure that the topic fills in the created_by field, based on the
  //  the user_id that effectively created the topic
  // ----------------------------------------------------------------------------
  app.post("/api/topics", function(req, res) {
    db.Topics.create(req.body).then(function(topicData) {
      console.log("topic_id " + topicData.id + " created successfully.");

      res.json(topicData);
    });

  });


  // ----------------------------------------------------------------------------
  // put route for updating topics - admin
  // ----------------------------------------------------------------------------
  app.put("/api/topics", function(req, res) {

    console.log("put id", req.body.id);
    db.Topics.update(
      {
        topic_title: req.body.topic_title,
        topic_body: req.body.topic_body,
        topic_answer: req.body.topic_answer,
        topic_video: req.body.topic_video,
        topic_answer_url: req.body.topic_answer_url
      },
      {"where": {"id": req.body.id}}
    ).then(function(dbTopic) {
      console.log("topic_id " + req.body.id + " updated successfully.");

      res.json(dbTopic);
    });
  });


    // ----------------------------------------------------------------------------
  // put route for updating open topics - user
  // ----------------------------------------------------------------------------
  app.put("/api/topics/open", function(req, res) {

    console.log("put id", req.body.id);
    db.Topics.update(
      {"topic_title": req.body.topic_title,
       "topic_body": req.body.topic_body},
      {"where": {"id": req.body.id}}
    ).then(function(dbTopic) {
      console.log("topic_id " + req.body.id + " updated successfully.");

      res.json(dbTopic);
    });
  });


  // ----------------------------------------------------------------------------
  // put route for updating topic total
  // ----------------------------------------------------------------------------
  app.put("/api/topics/total/votes", function(req, res) {

    var topicID = parseInt(req.body.id);

    console.log("put id", req.body.id);
    db.Topics.update(
      {"topic_votes": req.body.topic_votes},
      {"where": {"id": topicID}}
    ).then(function(dbTopic) {
      console.log("topic_id " + req.body.id + " updated successfully.");

      res.json(dbTopic);
    });
  });


  // ----------------------------------------------------------------------------
  // put route for updating topic total
  // ----------------------------------------------------------------------------
  app.put("/api/topics/total/interest", function(req, res) {

    var topicID = parseInt(req.body.id);

    console.log("put id", req.body.id);

    db.Topics.update(
      {"topic_interest": req.body.topic_interest},
      {"where": {"id": topicID}}
    ).then(function(dbTopic) {
      console.log("topic_id " + req.body.id + " updated successfully.");

      res.json(dbTopic);
    });
  });


  // ----------------------------------------------------------------------------
  // put route for updating topic status
  // ----------------------------------------------------------------------------
  // app.put("/api/topics/status", function(req, res) {

  //   var topicID = parseInt(req.body.id);

  //   console.log("put id", req.body.id);

  //   db.Topics.update(
  //     {
  //       "topic_state": req.body.topic_state,
  //       "topic_assigned_to": req.body.topic_assigned_to 
  //     },
  //     {"where": {"id": topicID}}
  //   ).then(function(dbTopic) {
  //     console.log("topic_id " + req.body.id + " updated successfully.");
  //     res.json(dbTopic);
  //   });
  // });


  // ----------------------------------------------------------------------------
  // put update route for changing topic states
  // ----------------------------------------------------------------------------
  app.put("/api/topics/status/:topic_id", function(req, res) {
    var topicId = parseInt(req.params.topic_id, 10),
        topicState = req.body.topic_state,
        userId = parseInt(req.body.user_id, 10),
        updateObj = {};

    console.log("Update topic state: " + topicState);
    // build the topic id object depending on whether it is an 'open', 'pending', or 'closed' topic 
    switch (topicState) {
      case "open":
        updateObj = {
          topic_assigned_to: null,
          topic_state: "open"
        };
        break;
      case "pending":
        updateObj = {
          topic_assigned_to: req.body.topic_assigned_to,
          topic_state: "pending"
        };
        break;
      case "closed":
        updateObj = {
          topic_video: req.body.topic_video,
          topic_answer: req.body.topic_answer,
          topic_answer_url: req.body.topic_answer_url,
          topic_state: "closed"
        };
        break;
      default:
        break;
    }

    console.log(JSON.stringify(updateObj));

    db.Topics.update(
      updateObj,
      {"where": {"id": topicId}}
    ).then(function(dbTopic) {
      if (!dbTopic) res.status(404).end();

      console.log("topic_id " + topicId + " updated successfully.");
      console.log(dbTopic + " records updated in Topics table");

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