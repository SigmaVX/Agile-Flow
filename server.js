// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();

// Express App & Parser Setup
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
db.sequelize.sync({ force: true }).then(function() {
// db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});