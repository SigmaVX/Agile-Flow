// Requiring our topics and users models
var db = require("../models");
console.log("Hello Test");
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// require moment library
var moment = require("moment");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  // ============================================================================
  // html GET ROUTES
  //

  // ----------------------------------------------------------------------------
  // get main landing page information
  // ----------------------------------------------------------------------------
  app.get("/", function (req, res) {
    var hbsObject = {};

    // default visitor sees public topics
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
          res.render("index", hbsObject);
        });
      });
    });
  });

 // ----------------------------------------------------------------------------
  // get myquestions page
  // ----------------------------------------------------------------------------
  app.get("/myquestions", function (req, res) {
      
      var userId = 1;
      var hbsObject = {};

      console.log("req.user: " + req.user);
      
      if (req.user !== undefined) {
        // res.redirect("/myquestions");
        userId = parseInt(req.user.id);
        console.log("User ID is: ", userId);
      }

      db.Topics.findAll({"where": {"topic_created_by": userId,"topic_state":"open"}}).
      then(function (topicData) {
        if (!topicData) res.status(404).end();
        hbsObject.openUser = topicData;

        db.Topics.findAll({"where": {"topic_assigned_to": userId,"topic_state":"pending"}}).
        then(function (pendingData) {
          if (!pendingData) res.status(404).end();
          hbsObject.pendingUser = pendingData;

        db.Topics.findAll({"where": {"topic_created_by": userId,"topic_state":"closed"}}).
        then(function (closedData) {
          if (!closedData) res.status(404).end();
          hbsObject.closedUser = closedData;

          db.Topics.findAll({"where": {"topic_assigned_to": userId,"topic_state":"closed"}}).
          then(function (toData) {
            if (!toData) res.status(404).end();
            hbsObject.closedAnswers = toData;

            console.log(hbsObject.openUser.length + " Open items found.");
            console.log(hbsObject.pendingUser.length + " Pending Topics found.");
            console.log(hbsObject.closedUser.length + " Closed found.");
            console.log(hbsObject.closedAnswers.length + " Answers found.");

            // for testing res.json(hbsObject);
            res.render("myquestions", hbsObject);
          });
        });
      });
    });
  });


  // ----------------------------------------------------------------------------
  // get /details route
  // ----------------------------------------------------------------------------
  app.get("/details", function(req, res) {
  // app.get("/details", function(req, res) {
    var topicId = parseInt(req.query.topicId, 10),
        hbsObject = {};

    db.Topics.findById(topicId).
    then(function (topicData) {

      // return 404 if no row was found, this means topicId does not exist
      if (!topicData) return res.status(404).end();

      // parse topicData object in order to add more variables to object 
      hbsObject.topicDetails = topicData;

      console.log("in /details " + JSON.stringify(hbsObject.topicDetails));

      res.render("details", hbsObject);
    });
  });

  // ----------------------------------------------------------------------------
  // get navbar (TESTING NAVBAR ROUTE!!!!!!!!)
  // get demouserprofile (TESTING USER PROFILE ROUTE!!!!!!!!!)
  // ----------------------------------------------------------------------------
  app.get('/userprofile', function (req, res) {
    res.render('user-profile');
  });



  // ----------------------------------------------------------------------------
  // get topics information, returns topics and users
  // ----------------------------------------------------------------------------
  app.get("/topics", function (req, res) {
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
        res.render("topics", hbsObject);
      });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  
  // Not Used
  // app.get("/member", isAuthenticated, function(req, res) {
  //   console.log("in /member route");
  //   // console.log("req: " + JSON.stringify(req));
  //   res.render("index");
  // });


  // ----------------------------------------------------------------------------
  // get admin page information
  // ----------------------------------------------------------------------------
  app.get("/admin", isAuthenticated, function (req, res) {
    var hbsObject = {};

    // first check to see if req.user is not empty
    if (req.user) {
      console.log("user rank: " + req.user.user_rank);
      // next verify that user is an 'Admin'
      if (req.user.user_rank === "Admin") {
        db.Topics.findAll({"where": {"topic_state": "open"}, "order": [["created_at", "DESC"]]}).
        then(function (openData) {
          if (!openData) res.status(404).end();
          hbsObject.open = openData;

          db.Topics.findAll({"where": {"topic_state": "pending"}, "order": [["created_at", "DESC"]]}).
          then(function (pendingData) {
            if (!pendingData) res.status(404).end();
            hbsObject.pending = pendingData;
       
            db.Topics.findAll({"where": {"topic_state": "closed"}, "order": [["created_at", "DESC"]]}).
              then(function (closedData) {
              if (!closedData) res.status(404).end();
              hbsObject.closed = closedData;

                console.log(hbsObject.open.length + " Open items found.");
                console.log(hbsObject.pending.length + " Pending items found.");
                console.log(hbsObject.closed.length + " Closed Topics found.");

                // for testing res.json(hbsObject);
                res.render("admin", hbsObject);

            });
          });
        });
      } else {
        // a user who is not authenticated as admin will get redirected to index route
        res.redirect("/");
      }
    }
  });


  // ----------------------------------------------------------------------------
  // route for editing user profile based on user_id, user must be authenticated
  // ----------------------------------------------------------------------------
  // app.get("/editprofile/:id", function(req, res) {
  app.get("/myprofile", isAuthenticated, function (req, res) {
    // user can update password, photo or email
    // hold user info in handlebars object
    var hbsObject = {};

    if (req.user) {
      console.log("in /myprofile: " + req.user.id);
      db.Users.findOne({"where": {"id": req.user.id}}).
      then(function(dbUser) {
        console.log("user profile found successfully.");
        hbsObject.profile = dbUser;
        console.log("hbsObject: " + JSON.stringify(hbsObject));

        res.render("myprofile", hbsObject);
      });
    }
  });

  // ----------------------------------------------------------------------------
  // route for displaying about page
  //
  app.get("/about", function (req, res) { 
    res.render("about");
  });
};