module.exports = function (io) {
  let numUsers = 0;

  // chatforums currently available in chat
  let chatforums = ["General","League of Legends", "Overwatch", "Fortnite", "Destiny", "Anthem",
                   "PUBG", "Call of Duty", "World of Warcraft" ];

  // usernames 
  let usernames = [];

  io.on("connection", function (socket) {
    let joinedUser = false;

    // sources: https://github.com/mmukhin/psitsmike_example_2
    //          https://socket.io/docs/emit-cheatsheet/

    // when client emits "add user", this function listens and executes
    socket.on("add user", function(data){
      console.log(`socket2.js in add user == data: ${data}`);
      const defaultRoom = chatforums[0];
      // store the uname in the socket session for this client
      socket.uname = data;
      // default chatroom is "General"
      socket.forum = defaultRoom;
      // add the client's uname to the global username list
      usernames[data] = data;
      // send client to default chatroom
      socket.join(defaultRoom);
      // message to client saying they've connected
      socket.emit("info msg", "SERVER", `You have connected to the ${defaultRoom} Chatroom`);
      // let other chatroom participants know that a person has connected to their forum
      socket.broadcast.to(defaultRoom).emit("info msg", "SERVER", `${socket.uname} has connected to this chat forum.`);
    });

    // listens and executes when client emits "send chat"
    socket.on("send chat", function (data) {
      // client executes "chat msg" with one parameter that contains an object
      // the following two will emit to all the sockets connected to socket.forum
      io.sockets.in(socket.forum).emit("chat msg", data);
      console.log(`socket2.js 'send chat' socket.forum: ${socket.forum}`);
      // socket.to(socket.forum).emit("chat msg", data);
    });

    // when client switches chat forum, this listens and executes
    socket.on("switch forum", function(newforum){
      console.log(`in switch forum socket -- socket.forum: ${socket.forum}
      socket.uname: ${socket.uname}
      newforum: ${newforum}`);
      // leave current chat room
      socket.leave(socket.forum);
      socket.join(newforum);
      // send information messages to new forum
      socket.emit("info msg", "SERVER", `You have connected to the ${newforum} chatroom.`);
      // old forum -- broadcast sends to everyone except the originating client
      socket.broadcast.to(socket.forum).emit("info msg", "SERVER", `${socket.uname} has left this room`);
      // update socket session room title
      socket.forum = newforum;
      socket.broadcast.to(newforum).emit("info msg", "SERVER", `${socket.uname} has joined this room`);
    });


    socket.on("disconnect", function(){
      const username = socket.uname;
      // remove the username from global usernames list
      delete usernames[socket.uname];
      // update list of users in chat, client-side
      io.sockets.emit("update users", usernames);
      // echo globally that this client has left
      socket.broadcast.emit("info msg", "SERVER", `${username} has disconnected.`);
      socket.leave(socket.forum);
    });
  });
}

/*     


socket.on("user state", function (msg) {
      console.log(`user state message: ${msg}`);
      io.emit("user state", msg);
    }); 
    
    

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

    
    
    */