// =========================================================================
// Chat container
// Description: Implements chat feature for Tilt application. This 
//  container uses socket.io listeners to communicate with the server
//  and also posts chat texts to Forums Table.
//
// =========================================================================

import React, { Component } from "react";
import ChatWindow from "../components/ChatWindow";
import ChatForums from "../components/ChatForums";
import API from "../utilities/API";

const io = require("socket.io-client");
// const GENERAL_FORUM_ID = "5b47c8472fe2ce8208c9f482";

// const TILT_URL = process.env.APP_URL || "http://localhost:3000";
let TILT_URL = (process.env.NODE_ENV === "production") 
    ? "https://polar-shore-76735.herokuapp.com" 
    :"http://localhost:3000"; 
let chatListener  = io.connect(TILT_URL);

// -----------------------------------------------------------
// UserGreeting is a functional component
//
const UserGreeting = (props) => {
  return (
    <section className="offset-2 form-inline mb-2">
      <h5>Welcome to Chat {props.username}</h5>
    </section>
  );
}

// -----------------------------------------------------------
// Chat is a component class
//
class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      isSubHovered: false,
      // Chat info
      // --------------------------------------------------
      chatMsg: "",
      // chat conversation will be an array of chat messages
      chatConvo: [],
      postedBy: "sampleUser",
      userStateMsg: "sample message",
      // forum information to be received from chat forums
      forumsList: null,
      isChatItemDeleted: false,
      activeForumId: 0,
      activeForumName: "",
      // prevForum
      prevForumName: ""
    };
  }

  // receive message from chat listeners
  componentDidMount() {
    const thisChat = this;
    // let chatConvo = thisChat.state.chatConvo;

    function chatPostRoutine(obj, chatConvo) {
      let msgId;
      const uname = obj.uname,
            msg = obj.msg,
            shouldPost = obj.post;

      // console.log(`Chat.js in chatPostRoutine: ${shouldPost}`);
      
      if (thisChat.state.activeForumId !== 0) {
        if (shouldPost) {
          // post chat to forum
          // console.log("Chat.js in (shouldpost) chatPostRoutine obj: ", JSON.stringify(obj));
          // API.postChat(thisChat.state.activeForumId, {chat: msg, postedBy: thisChat.props.username})
          API.postChat(thisChat.state.activeForumId, {chat: msg, postedBy: uname})
            .then(res => {
              // console.log("res.data", res.data);
              msgId = res.data.chats[res.data.chats.length - 1];
              chatConvo.push({uname, msg, msgId, post: shouldPost});
              // clear chat message
              thisChat.setState({chatConvo: chatConvo, chatMsg: ""});
              // console.log("Chat.js in API chat POST routine chatConvo: " + JSON.stringify(chatConvo));
              // console.log("Chat.js in API chat POST activeForumId: " + thisChat.state.activeForumId);
            })
            .catch(err => console.log(err)); 
        } else {
          if (uname) {
            // console.log("Chat.js in (not shouldpost and uname) chatPostRoutine obj: ", JSON.stringify(obj));
            chatConvo.push({uname, msg, post: shouldPost});
            thisChat.setState({chatConvo: chatConvo, chatMsg: ""});  
          }
        }
      }
    }

    chatListener.on("League of Legends", function(obj) {
      // console.log(`in League of Legends Listener: ${obj.msg}`)
      if (thisChat.state.activeForumName === "League of Legends" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("Overwatch", function(obj) {
      // console.log(`in Overwatch Listener: ${obj.msg}`)
      if (thisChat.state.activeForumName === "Overwatch" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("Fortnite", function(obj) {
      if (thisChat.state.activeForumName === "Fortnite" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("Destiny", function(obj){
      if (thisChat.state.activeForumName === "Destiny" && obj.msg)
        chatPostRoutine(obj.msg, thisChat.state.chatConvo);
    });

    chatListener.on("Anthem", function(obj){
      if (thisChat.state.activeForumName === "Anthem" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("PUBG", function(obj){
      if (thisChat.state.activeForumName === "PUBG" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("Call of Duty", function(obj){
      if (thisChat.state.activeForumName === "Call of Duty" && obj.msg)
        chatPostRoutine(obj.msg, thisChat.state.chatConvo);
    });

    chatListener.on("World of Warcraft", function(obj){
      if (thisChat.state.activeForumName === "World of Warcraft" && obj.msg)
        chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("General", function(obj){
      // console.log("Chat.js chatListener General: " + JSON.stringify(obj));
      if (thisChat.state.activeForumName === "General" && obj.msg){
        chatPostRoutine(obj, thisChat.state.chatConvo);
      }
    });

    // turn on user state listener
    // chatListener.on("user state", function(uStateMsg){
      // console.log(uStateMsg);
    // });


    // turn on leave chat listener
    chatListener.on("leave chat", function(){
      console.log(`${thisChat.props.username} disconnected.`);
    });
  }

  handleChangeForumNotices(forumObj) {
    if (this.props.isLoggedIn && forumObj.activeForumName !== "") { 
      // console.log(`Chat.js forumInfo() ${this.props.username} joined ${forumObj.activeForumName}`);
      chatListener.emit("add user", {
        room: forumObj.activeForumName,
        uname: this.props.username, 
        msg: `${this.props.username} joined ${forumObj.activeForumName} chatroom`,
        post: false
      });
      // console.log(`Chat.js forumInfo() ${this.props.username} left ${this.state.prevForumName}`);
      if (this.state.prevForumName !== forumObj.activeForumName) {
        chatListener.emit("leave chat", {
          room: this.state.prevForumName,
          uname: this.props.username, 
          msg: `${this.props.username} left ${this.state.prevForumName} chatroom`,
          post: false
        });
      }
    }
  }

  // callback function into ChatForum component to obtain the chatroom info selected by user
  forumInfo = (forumObj) => {
    this.setState(forumObj);
    this.setState({chatConvo: []});
    this.setState((prevState) => {
      return {prevForumName: prevState.activeForumName}
    });
    // console.log(`Chat.js prevState info: forumInfo.
    //  prevState.activeForumName: ${this.state.prevForumName}`);
    // console.log("Chat.js chatConvo in forumInfo: " + JSON.stringify(this.state.chatConvo));
    // console.log("Chat.js activeForumId in forumInfo activeForumId: " + forumObj.activeForumId);
    this.handleChangeForumNotices(forumObj);
  }

  renderChatUserState() {
    // console.log("Chat.js in renderChatUserState()");
    if (this.props.isLoggedIn && this.state.chatMsg !== "") {
      // chatListener.emit("user state", `${this.props.username} is typing`);
      // return (<strong>{this.props.username} is typing</strong>);
      // return null;
    }
  }

  renderIntroChat() {
    if (this.props.isLoggedIn) {
        return <UserGreeting username={this.props.username} />;
    }
    return (
      <div>
       <h4>You must be a registered user to use Chat.</h4>
      </div>
    );
  }


  leaveChat = event => {
    event.preventDefault();

    chatListener.emit(this.state.activeForumName, `${this.props.username} disconnected.`);
    chatListener.emit("leave chat");
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    if ([name] === "chatMsg") {
      // console.log("user is typing");
      this.renderChatUserState();
    }
    this.setState({
      [name]: value
    });
  }

  deleteChatItem = (delObj) => {
    // console.log(`Chat.js in deleteChatItem() chatId ${delObj.chatId}`);
    // delete with API
    this.setState({isChatItemDeleted: true, chatConvo: [], chatText: []});
    API.deleteChat(delObj.chatId);
  }

  handleOnSubmit = event => {
    event.preventDefault();
    // console.log(`Chat.js handleOnSubmit chatMsg: ${this.state.chatMsg}`)
    // send message to io.socket server
    if (this.props.isLoggedIn && this.state.chatMsg !== "" && this.props.username !== "") {
      chatListener.emit(this.state.activeForumName, {
        uname: this.props.username,
        msg: this.state.chatMsg,
        post: true
      });
      // console.log(`Chat.js handleOnSubmit within if.... ${this.state.activeForumName}: ${this.state.chatMsg}`);
      if (this.state.isChatItemDeleted) 
        this.setState({isChatItemDeleted: false});
    }
    this.setState({chatMsg: ""});

  }


  render() {
    let chatSubmitButton, leaveChatButton;
    const isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      chatSubmitButton = 
      <button className="col-1 btn btn-primary my-2 my-sm-0 mr-2" type="submit" onClick={this.handleOnSubmit}>
      Send</button>;
      leaveChatButton = 
      <button className="col-1 btn btn-warning my-2 my-sm-0 mr-2" type="submit" onClick={this.leaveChat}>
      Leave Chat</button>
    } else {
      chatSubmitButton = 
      <button className="col-1 btn btn-primary my-2 my-sm-0 mr-2 disabled" disabled>
      Send</button>;
      leaveChatButton = <button className="col-1 btn btn-warning my-2 my-sm-0 mr-2 disabled" disabled>
      Leave Chat</button>
    }

    return (

      <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse" >Chat</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="row">
          <span className = "d-flex col-4 col-xs-12 justify-content-center text-center">
            <strong>
              {
                this.props.isLoggedIn 
                ? `Welcome to chat, ${this.props.username}` 
                : "You must be signed in in order to join chat."
              }
              </strong>
            </span>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <section className="col-6">
            <div className="card">
              <h5 className="text-center">{this.state.activeForumName} Chatroom</h5>
              <hr />
              <ChatWindow
                convoArray = {this.state.chatConvo}
                userName = {this.props.username}
                isAdmin = {this.props.isAdmin}
                getDeleteChatItem = {this.deleteChatItem}
                forumName = {this.state.activeForumName}
                forumId = {this.state.activeForumId}
                isChatItemDeleted = {this.state.isChatItemDeleted}
              />
            </div>
          </section>
          <section className="col-3">
            <ChatForums
              getForumInfo = {this.forumInfo}
              isLoggedIn = {this.props.isLoggedIn}
            />
          </section>
        </div>
    
        <div>
          <form className="row form-inline">
            <input 
              className="form-control offset-2 col-3 my-2 my-sm-1 mr-sm-1" 
              type="text" 
              name="chatMsg" 
              value={this.state.chatMsg}
              placeholder="Enter message here"
              onChange={this.handleOnChange} 
            />
            {chatSubmitButton}
            {leaveChatButton}
          </form>
          <div className="row">
            <section className="offset-4">
              {this.renderChatUserState()}
            </section>
          </div>
        </div>

      </div>
    )
  }
} 

export default Chat;