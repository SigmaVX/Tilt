module.exports = function (io) {
  var numUsers = 0;
  io.on("connection", function (socket) {
    var joinedUser = false;

    socket
      .on("General", function (data) {
        console.log(`General: ${data.msg}`);
        io.emit("General", data);
      })
      .on("League of Legends", function (data) {
        console.log(`League of Legends: ${data.msg}`);
        io.emit("League of Legends", data);
      })
      .on("Overwatch", function (data) {
        console.log(`Overwatch: ${data.msg}`);
        io.emit("Overwatch", data);
      })
      .on("Fortnite", function (data) {
        console.log(`Fortnite: ${data.msg}`);
        io.emit("Fortnite", data);
      })
      .on("Destiny", function (data) {
        console.log(`Destiny: ${data.msg}`);
        io.emit("Destiny", data);
      })
      .on("Anthem", function (data) {
        console.log(`Anthem: ${data.msg}`);
        io.emit("Anthem", data);
      })
      .on("PUBG", function (data) {
        console.log(`PUBG: ${data.msg}`);
        io.emit("PUBG", data);
      })
      .on("Call of Duty", function (data) {
        console.log(`Call of Duty: ${data.msg}`);
        io.emit("Call of Duty", data);
      })
      .on("World of Warcraft", function (data) {
        console.log(`World of Warcraft: ${data.msg}`);
        io.emit("World of Warcraft", data);
      });

    socket
      .on("add user", function(data) {
        console.log(`${data.uname} joined ${data.room} chatroom. msg is ${data.msg}`);
        if (joinedUser) {
          numUsers++;
        }
        socket.emit(data.room, data);
      })
      .on("disconnect", function () {
        console.log("user disconnected");
        numUsers--;
      })
      .on("leave chat", function (data) {
        console.log(`${data.uname} left ${data.room} chatroom. msg is ${data.msg}`);
        joinedUser = false;
        numUsers--;
        socket.emit(data.room, data);
      })
  });
}

/*     socket.on("user state", function (msg) {
      console.log(`user state message: ${msg}`);
      io.emit("user state", msg);
    }); */