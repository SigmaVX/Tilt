module.exports = function (io) {
  var numUsers = 0;
  io.on("connection", function (socket) {
    var joinedUser = false;

    socket.on("General", function (data) {
      console.log(`General: ${data.msg}`);
      io.emit("General", data);
    });
    socket.on("League of Legends", function (data) {
      console.log(`League of Legends: ${data.msg}`);
      io.emit("League of Legends", data);
    });
    socket.on("Overwatch", function (data) {
      console.log(`Overwatch: ${data.msg}`);
      io.emit("Overwatch", data);
    });
    socket.on("Fortnite", function (data) {
      console.log(`Fortnite: ${data.msg}`);
      io.emit("Fortnite", data);
    });
    socket.on("Destiny", function (data) {
      console.log(`Destiny: ${data.msg}`);
      io.emit("Destiny", data);
    });
    socket.on("Anthem", function (data) {
      console.log(`Anthem: ${data.msg}`);
      io.emit("Anthem", data);
    });
    socket.on("PUBG", function (data) {
      console.log(`PUBG: ${data.msg}`);
      io.emit("PUBG", data);
    });
    socket.on("Call of Duty", function (data) {
      console.log(`Call of Duty: ${data.msg}`);
      io.emit("Call of Duty", data);
    });
    socket.on("World of Warcraft", function (data) {
      console.log(`World of Warcraft: ${data.msg}`);
      io.emit("World of Warcraft", data);
    });

    socket.on("add user", function(data) {
      console.log(`${data.uname} joined ${data.room} chatroom. msg is ${data.msg}`);
      if (joinedUser) {
        numUsers++;
      }
      io.emit(data.room, data);
    });
    socket.on("user state", function (msg) {
      console.log(`user state message: ${msg}`);
      io.emit("user state", msg);
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
      numUsers--;
    });
    socket.on("leave chat", function (data) {
      console.log(`${data.uname} left ${data.room} chatroom. msg is ${data.msg}`);
      joinedUser = false;
      numUsers--;
      io.emit(data.room, data);
    })
  });
}

