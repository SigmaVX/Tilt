module.exports = function (io) {
  io.on("connection", function (socket) {
    socket
      .on("General", function (data) {
        console.log(`General: ${data.msg}`);
        socket.emit("General", data);
      })
      .on("League of Legends", function (data) {
        console.log(`League of Legends: ${data.msg}`);
        socket.emit("League of Legends", data);
      })
      .on("Overwatch", function (data) {
        console.log(`Overwatch: ${data.msg}`);
        socket.emit("Overwatch", data);
      })
      .on("Fortnite", function (data) {
        console.log(`Fortnite: ${data.msg}`);
        socket.emit("Fortnite", data);
      })
      .on("Destiny", function (data) {
        console.log(`Destiny: ${data.msg}`);
        socket.emit("Destiny", data);
      })
      .on("Anthem", function (data) {
        console.log(`Anthem: ${data.msg}`);
        socket.emit("Anthem", data);
      })
      .on("PUBG", function (data) {
        console.log(`PUBG: ${data.msg}`);
        socket.emit("PUBG", data);
      })
      .on("Call of Duty", function (data) {
        console.log(`Call of Duty: ${data.msg}`);
        socket.emit("Call of Duty", data);
      })
      .on("World of Warcraft", function (data) {
        console.log(`World of Warcraft: ${data.msg}`);
        socket.emit("World of Warcraft", data);
      })
      .on("disconnect", function () {
        console.log("user disconnected");
        // numUsers--;
      })
  });
}