// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

require("dotenv").config();

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Express App & Parser Setup
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({
                  secret: "keyboard cat",
                  resave: true,
                  saveUninitialized: true 
                }));
app.use(passport.initialize());
app.use(passport.session());

// Setup Handlebars View Engine
// =============================================================
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    "defaultLayout": "main",
    // handlebars 'helpers' functions not used yet but may come in handy
    // later, addOne is a sample handlebar helper function, not used yet
    "helpers": {
      // not used yet
      "addOne": (value) => parseInt(value, 10) + 1
    }
  }));

app.set("view engine", "handlebars");

// Database & Static Directory
// =============================================================
var db = require("./models");
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/topics-api-routes.js")(app);
require("./routes/users-api-routes.js")(app);
require("./routes/choices-api-routes.js")(app);

// Syncing DB & Start Express
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("==> 🌎   App listening on PORT %s, http://localhost:%s ", PORT, PORT);
    });
});