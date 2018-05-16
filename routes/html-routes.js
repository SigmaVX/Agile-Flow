// Requiring our topics and users models
var db = require("../models");

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
  // get navbar (TESTING NAVBAR ROUTE!!!!!!!!)
  // ----------------------------------------------------------------------------
  app.get('/nav', function (req, res) {
    res.render('nav');
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


  // ----------------------------------------------------------------------------
  // get admin page information
  // ----------------------------------------------------------------------------
  app.get("/admin", function (req, res) {
    var hbsObject = {};

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
  });


  // ----------------------------------------------------------------------------
  // get signup page
  // ----------------------------------------------------------------------------
  app.get("/signup", function(req, res) {
    // user can update password, photo or email
    // res.json();
    res.render("signup");
  });

  // ----------------------------------------------------------------------------
  // route for editing user profile based on user_id
  // ----------------------------------------------------------------------------
  app.get("/editprofile/:id", function(req, res) {
    // user can update password, photo or email

    db.Users.findOne({"where": {"id": req.params.id}}).
    then(function(dbUser) {
      console.log("user profile found successfully.");

      res.json(dbUser);
    });
  });


  // ============================================================================
  // html POST ROUTES
  //
  app.post("/signup", function(req, res) {
    var email = req.body.email;
    var user_pw = req.body.user_pw;

    // validate email
    // on email error return status 404 (with message?)

    // validate password
    // on password error return status 404 (with message?)

    req.body.email = email;
    req.body.user_pw = user_pw;

    // user_name, first_name, last_name, email, photo_url, user_pw
    db.Users.create({
        "user_name": req.body.user_name,
        "email": req.body.email,
        "user_pw": req.body.user_pw,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
        // ,
        // "user_photo": req.body.user_photo    
      }).
      then(function(newUser) {
      if (!newUser) res.status(404).end();
      console.log("user_id " + newUser.id + " created successfully.");

      res.json(newUser);
    });

  });

  // ----------------------------------------------------------------------------
  // route for updating user login
  // ----------------------------------------------------------------------------
  app.post("/login", function(req, res) {
    var email = req.body.email;
    var user_pw = req.body.user_pw;

    // validate email
    // on email error return status 404 (with message?)

    // validate password
    // on password error return status 404 (with message?)

    req.body.email = email;
    req.body.user_pw = user_pw;

    db.Users.findOne({
      "where": {
        "email": req.body.email,
        "user_pw": req.body.user_pw
      }
    }).then(function(authenticatedUser) {
      if (!authenticatedUser) res.status(404).end();
      console.log("user_id " + authenticatedUser.id + " logged in successfully.");

      res.json(authenticatedUser);
    });

  });

  // ============================================================================
  // html UPDATE ROUTES
  //

  // ----------------------------------------------------------------------------
  // put route for updating user profile
  // ----------------------------------------------------------------------------
  app.put("/editprofile", function(req, res) {
    // user can update password, photo or email

    // validate email

    // validate password

    db.Users.update(
      req.body,
      {"where": {"id": req.body.id}}
    ).then(function(dbUser) {
      console.log("user profile updated successfully.");

      res.json(dbUser);
    });
  });

};