// Dependencies
// =============================================================
const express = require("express");
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

app.use(logger("dev", {
	"stream": accessLogStream
}));

// bodyParser middleware
// =============================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
const io = require("socket.io")(server);

// Open socket listener
// ==============================================================
io.on("connection", function (socket) {
  console.log("in io.on listener");
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function (data) {
    console.log(data);
  });
  socket.on("disconnect", function(){
    console.log("user disconnected");
  });
});

// server.listen(PORT); changed from app to server
server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});