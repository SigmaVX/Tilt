// Dependencies
// =============================================================
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

// Setup Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Define Middleware
// =============================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Static Assets On Live (e.g.  Heroku)
// =============================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add Database
// =============================================================
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tilt");
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// API Routes
// =============================================================
app.use(routes);

// Send All Requests To React App
// =============================================================
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
