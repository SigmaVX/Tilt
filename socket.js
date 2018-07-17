module.exports = function (io) {
  let numUsers = 0;

  // chatforums currently available in chat
  let chatforums = ["Tilt General","League of Legends", "Overwatch", "Fortnite", "Destiny", "Anthem",
                   "PUBG", "Call of Duty", "World of Warcraft" ];

  // usernames 
  let usernames = [];

  io.on("connection", function (socket) {
    let joinedUser = false;

    // sources: https://github.com/mmukhin/psitsmike_example_2
    //          https://socket.io/docs/emit-cheatsheet/

    // when client emits "add user", this function listens and executes
    socket.on("add user", function(data){
      // console.log(`socket.js in add user == data: ${data}`);
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
      // socket.emit("info msg", "CHATSERVER", `You have connected to the ${defaultRoom} Chatroom`);
      // let other chatroom participants know that a person has connected to their forum
      // socket.broadcast.to(defaultRoom).emit("info msg", "CHATSERVER", `${socket.uname} has connected to this chat forum.`);
    });

    // listens and executes when client emits "send chat"
    socket.on("send chat", function (data) {
      // client executes "chat msg" with one parameter that contains an object
      // the following two will emit to all the sockets connected to socket.forum
      io.sockets.in(socket.forum).emit("chat msg", data);
      // console.log(`socket.js 'send chat' socket.forum: ${socket.forum}
      // data uname: ${data.uname}, msg: ${data.msg}, post: ${data.post}`);
      // socket.to(socket.forum).emit("chat msg", data);
    });

    // when client switches chat forum, this listens and executes
    socket.on("switch forum", function(newforum, uname){
      socket.uname = uname;
      console.log(`in switch forum socket -- socket.forum: ${socket.forum}
      socket.uname: ${socket.uname}
      newforum: ${newforum}`);
      // leave current chat room
      socket.leave(socket.forum);
      socket.join(newforum);
      // send information messages to new forum
      // socket.emit("info msg", "CHATSERVER", `You have connected to the ${newforum} chatroom.`);
      // old forum -- broadcast sends to everyone except the originating client
      // socket.broadcast.to(socket.forum).emit("info msg", "CHATSERVER", `${socket.uname} has left this room`);
      // update socket session room title
      socket.forum = newforum;
      // socket.broadcast.to(newforum).emit("info msg", "CHATSERVER", `${socket.uname} has joined this room`);
    });


    socket.on("disconnect", function(){
      const username = socket.uname;

      // update list of users in chat, client-side
      // io.sockets.emit("update users", usernames);

      // echo globally that this client has left
      // socket.broadcast.emit("info msg", "CHATSERVER", `${username} has disconnected.`);
      socket.leave(socket.forum);

      // remove the username from global usernames list
      delete usernames[socket.uname];
    });
  });
}
