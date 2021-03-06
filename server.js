// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

// listing for requests with x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.use(require("./controllers/charityController.js"))
app.use(require("./controllers/categoryController.js"))
app.use(require("./controllers/taskController.js"))
app.use(require("./controllers/htmlController.js"))
app.use(require("./controllers/authController.js"))
app.use(require("./controllers/userController"))
app.use(require("./controllers/userTaskController"))
app.use(require("./controllers/authController"))


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
