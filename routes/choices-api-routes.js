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
  app.get("/api/choices/Xchoice_type/:user_id/:topic_id", function (req, res) {
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


// Check if user and topic id exist
// ========================================================
app.get("/api/choices/check/:user_id/:topic_id", function (req, res) {
  userId = parseInt(req.params.user_id),
  topicId = parseInt(req.params.topic_id),
  choiceObj = {};

  db.Choices.findOne({
    "where": {
              "user_id": userId,
              "topic_id": topicId
            }
  }).then(function(data){
    if(data == null){
      choiceObj.exists = false;
    } else{
      choiceObj.exists = true;
    }
    // console.log("Data Exists: ", choiceObj.exists);
    res.json(choiceObj.exists);
  });
});


// Create new Choice when user votes
app.post("/api/choices/updates/vote", function(req, res) {    
  db.Choices.create(
      {
      "vote_state": req.body.vote_state,
      "user_id": req.body.user_id,
      "topic_id": req.body.topic_id
    }
  ).then(function(data) {
    console.log("choices table updated successfully.");
    res.json(data);
  });
});


// Create new Choice when user votes
app.post("/api/choices/updates/interest", function(req, res) {    
  db.Choices.create(
      {
      "interest_state": req.body.vote_state,
      "user_id": req.body.user_id,
      "topic_id": req.body.topic_id
    }
  ).then(function(data) {
    console.log("choices table updated successfully.");
    res.json(data);
  });
});


  // ============================================================================
  // UPDATE ROUTES for choices API choices
  //

  // ----------------------------------------------------------------------------
  // put route for updating choice type on vote_state or interest_state in 
  // Choices through table
  // ----------------------------------------------------------------------------
  app.put("/api/choices/updates/vote", function(req, res) {
    
    db.Choices.update(
        {"vote_state": req.body.vote_state},
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



  // ----------------------------------------------------------------------------
  // put route for updating interest_state 
  // ----------------------------------------------------------------------------
  app.put("/api/choices/updates/interest", function(req, res) {
    
    db.Choices.update(
        {"interest_state": req.body.interest_state},
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