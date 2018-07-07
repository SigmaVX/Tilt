module.exports = function (io) {
  var numUsers = 0;
  io.on("connection", function (socket) {
    var joinedUser = false;

    socket.on("chat message", function (msg) {
      console.log(`chat message: ${msg}`);
      io.emit("chat message", msg);
    });
    socket.on("joined", function (uname) {
      console.log(`${uname} joined`);
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