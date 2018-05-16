var db = require("../models");

module.exports = function(app) {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  // ============================================================================
  // GET ROUTES for choices API choices
  //

  // ----------------------------------------------------------------------------
  // if choice_type equals 'vote' return total number of votes per topic id
  // if choice_type equals 'interest' returns 'total interests' per topic id
  // ----------------------------------------------------------------------------
  app.get("/api/choices/totals/:choice_type/:topic_id", function (req, res) {
    var topicId = parseInt(req.params.topic_id, 10),
        choiceType = req.params.choice_type,
        colName = "",
        totalValue = "",
        conditionObj = {};

    // first set variables depending on choiceTypes
    switch (choiceType) {
      case "interest":
        colName = "interest_state";
        totalValue = "total_interests";
        conditionObj = {
          interest_state: 1,
          topic_id: topicId
        };
        break;
      case "vote":
        colName = "vote_state";
        totalValue = "total_votes";
        conditionObj = {
          vote_state: 1,
          topic_id: topicId
        };
        break;
      default:
        break;
    }

    db.Choices.findAll({
        attributes:
        {
          include:
            [[Sequelize.fn("COUNT", Sequelize.col(colName)), totalValue]]
        },
          where: conditionObj
      }).then(function(data) {
        if (!data) {
          console.log("no " + totalValue + " found... strange");
        }

        res.json(data);
    });
  });

  // ----------------------------------------------------------------------------
  // get choice type state of current user_id and topic_id
  //  'choice type' has either a value of "interest" or "vote" (depends on what
  //  button user pressed on front end). When user clicks the interest or vote
  //  button, the first step is to obtain the value
  // ----------------------------------------------------------------------------
  app.get("/api/choices/:choice_type/:user_id/:topic_id", function (req, res) {
    var userId = parseInt(req.params.user_id, 10),
        topicId = parseInt(req.params.topic_id, 10),
        choiceType = req.params.choice_type,
        choiceObj = {};

    // find existing interests
    db.Choices.findOne({
      "where": {
                "user_id": userId,
                "topic_id": topicId
              }
    }).then(function (data) {
      switch (choiceType) {
        case "interest":
          if (data) {
            choiceObj.interest_state = data.interest_state;
          } else {
            choiceObj.interest_state = null;
          }
          break;
        case "vote":
          if (data) {
            choiceObj.vote_state = data.vote_state;
          } else {
            choiceObj.vote_state = null;
          }
          break;
        default:
          break;
      }

      res.json(choiceObj);
    });
  });


// Get all Choices where param matches user ID
// ========================================================
app.get("/api/interest/user/:user_id/", function (req, res) {
  var userId = parseInt(req.params.user_id, 10),
      choiceObj = {};

  // find existing interests
  db.Choices.findAll({
    "where": {
              "user_id": userId,
              "interest_state": true
            }
  }).then(function(data){
    choiceObj.choices = data;
    res.json(choiceObj);
  });
});



// Get all Choices where param matches user ID
// ========================================================
app.get("/api/votes/user/:user_id/", function (req, res) {
  var userId = parseInt(req.params.user_id, 10),
      choiceObj = {};

  // find existing interests
  db.Choices.findAll({
    "where": {
              "user_id": userId,
              "vote_state": true
            }
  }).then(function(data){
    choiceObj.choices = data;
    res.json(choiceObj);
  });
});


  // ============================================================================
  // UPDATE ROUTES for choices API choices
  //

  // ----------------------------------------------------------------------------
  // put route for updating choice type on vote_state or interest_state in 
  // Choices through table
  // ----------------------------------------------------------------------------
  app.put("/api/choices/updates/:choice_type", function(req, res) {
    // this function expects the put request from the front end to include
    // vote_state, user_id, topic_id in req.body if updating a vote value;
    // if there is an update for an interest value, the put request requires
    // interest_state, user_id, and topic_id
    db.Choices.update(
        req.body,
        {
          "where": {
                  "user_id": req.body.user_id,
                  "topic_id": req.body.topic_id
        }
      }
    ).then(function(data) {
      console.log("choices table updated successfully.");

      res.json(data);
    });
  });

};