// Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const logger = require("morgan");
const	fs = require("fs");
const path = require("path");


// Setup Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// =======================================================================
// MIDDLEWARE
// =======================================================================
// Use morgan logger for logging requests
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
	"flags": "a"
});

//  Have morgan output to access.log file and to console
app.use(logger("common", {
	"stream": accessLogStream
}));
app.use(logger("dev"));

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use sessions for tracking logins
app.use(session({
  secret: "The quick brown fox jumps over a lazy dog",
  resave: true,
  saveUninitialized: false
}));

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Serve Static Assets On Live (e.g.  Heroku)
// =============================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add Database
// =============================================================
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tilt");

// API Routes
// =============================================================
app.use(routes);

// Send All Requests To React App
// =============================================================
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Setup socket.io
// ============================================================= 
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// Open socket listener for chat feature
// ==============================================================
var numUsers = 0;
io.on("connection", function (socket) {
  var joinedUser = false;

  socket.on("chat message", function (msg) {
    console.log(`chat message: ${msg}`);
    io.emit("chat message", msg);
  });
  socket.on("joined", function(uname){
    console.log(`${uname} joined`);
    if (joinedUser) {
      numUsers++;
    }
  });
  socket.on("user state", function (msg) {
    console.log(`user state message: ${msg}`);
    io.emit("user state", msg);
  });
  socket.on("disconnect", function(){
    console.log("user disconnected");
    numUsers--;
  });
  socket.on("leave chat", function() {
    console.log("user left chat");
  })
});

// server.listen(PORT); changed from app.listen to server.listen in order
// to incorporate socket.io functionality
server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});