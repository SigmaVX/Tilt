module.exports = function (io) {
  var numUsers = 0;
  io.on("connection", function (socket) {
    var joinedUser = false;

    socket.on("chat message", function (msg) {
      console.log(`chat message: ${msg}`);
      io.emit("chat message", msg);
    });
    socket.on("League of Legends", function (msg) {
      console.log(`League of Legends: ${msg}`);
      io.emit("League of Legends", msg);
    });
    socket.on("Overwatch", function (msg) {
      console.log(`Overwatch: ${msg}`);
      io.emit("Overwatch", msg);
    });
    socket.on("Fortnite", function (msg) {
      console.log(`Fortnite: ${msg}`);
      io.emit("Fortnite", msg);
    });
    socket.on("Destiny", function (msg) {
      console.log(`Destiny: ${msg}`);
      io.emit("Destiny", msg);
    });
    socket.on("Anthem", function (msg) {
      console.log(`Anthem: ${msg}`);
      io.emit("Anthem", msg);
    });
    socket.on("PUBG", function (msg) {
      console.log(`PUBG: ${msg}`);
      io.emit("PUBG", msg);
    });
    socket.on("Call of Duty", function (msg) {
      console.log(`Call of Duty: ${msg}`);
      io.emit("Call of Duty", msg);
    });
    socket.on("World of Warcraft", function (msg) {
      console.log(`World of Warcraft: ${msg}`);
      io.emit("World of Warcraft", msg);
    });

    socket.on("join", function (uname, room) {
      console.log(`${uname} joined ${room} chatroom.`);
      if (joinedUser) {
        numUsers++;
      }
    });
    socket.on("user state", function (msg) {
      console.log(`user state message: ${msg}`);
      io.emit("user state", msg);
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
      numUsers--;
    });
    socket.on("leave chat", function () {
      console.log("user left chat");
    })
  });
}