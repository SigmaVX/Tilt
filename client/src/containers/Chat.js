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
// https create-react-app
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
      chatText: [],
      postedBy: "sampleUser",
      userStateMsg: "sample message",
      // forum information to be received from chat forums
      forumsList: null,
      isChatItemDeleted: false,
      chatRoomSelected: false,
      activeForumId: 0,
      activeForumName: ""
    };
  }

  // callback function into ChatForum component to obtain the chatroom info selected by user
  forumInfo = (forumObj) => {
    this.setState(forumObj);
    this.setState({chatConvo: [], chatText: []});
    console.log("Chat.js in forumInfo: " + JSON.stringify(this.state.chatConvo));
    console.log("Chat.js in forumInfo activeForumId: " + this.state.activeForumId);
  }

  renderChatUserState() {
    // console.log("Chat.js in renderChatUserState()");
    if (this.props.isLoggedIn && this.state.chatMsg !== "") {
      // chatListener.emit("user state", `${this.props.username} is typing`);

      // return (<strong>{this.props.username} is typing</strong>);
      return null;
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

  // receive message from 'chat message' listener
  componentDidMount() {
    const thisChat = this;
    // let chatConvo = thisChat.state.chatConvo;
 
    function chatPostRoutine(msg, chatConvo) {
      let msgId;

      if (thisChat.state.activeForumId !== 0 && msg !== "") {
        // post chat to forum
        API.postChat(thisChat.state.activeForumId, {chat: msg, postedBy: thisChat.props.username})
          .then(res => {
            msgId = res.data.chats[res.data.chats.length - 1];
            chatConvo.push({msg, msgId});
            // clear chat message
            thisChat.setState({chatConvo: chatConvo, chatMsg: "", chatText: msg});
            console.log("Chat.js in API chat POST routine chatConvo: " + JSON.stringify(chatConvo));
            console.log("Chat.js in API chat POST activeForumId: " + thisChat.state.activeForumId);
          })
          .catch(err => console.log(err));   
      }
    }

    chatListener.on("League of Legends", function(msg){
      if (thisChat.state.activeForumName === "League of Legends") chatPostRoutine(msg, thisChat.state.chatConvo);
    });

    chatListener.on("Overwatch", function(msg){
      if (thisChat.state.activeForumName === "Overwatch") chatPostRoutine(msg, thisChat.state.chatConvo);
    });

    // turn on user state listener
    chatListener.on("user state", function(uStateMsg){
      // console.log(uStateMsg);
    });

    // turn on leave chat listener
    chatListener.on("leave chat", function(){
      console.log(`${thisChat.props.username} disconnected.`);
    });
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

  // removeFromChat = (array, elemToRemove) => array.filter(elem => elem !== elemToRemove);

  deleteChatItem = (delObj) => {
    console.log(`Chat.js in deleteChatItem() chatId ${delObj.chatId}`);
    // delete with API
    // const updatedChatConvo = this.removeFromChat(this.state.chatConvo, this.state.chatConvo[delObj.chatId]);
    // this.setState({chatConvo: updatedChatConvo,
    //  chatText: updatedChatConvo});
    this.setState({isChatItemDeleted: true, chatConvo: [], chatText: []});
    API.deleteChat(delObj.chatId);
  }

  handleOnSubmit = event => {
    event.preventDefault();

    // send message to io.socket server
    if (this.props.isLoggedIn && this.state.chatMsg !== "") {
      chatListener.emit(this.state.activeForumName, `${this.props.username}: ${this.state.chatMsg}`);
      console.log(`Chat.js ${this.state.activeForumName}: ${this.state.chatMsg}`);
      if (this.state.isChatItemDeleted) 
        this.setState({isChatItemDeleted: false});
    } else {
      this.setState({chatMsg: ""});
    }
  }


  render() {
    let chatSubmitButton, leaveChatButton;
    const isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      chatSubmitButton = <button 
        className="col-1 btn btn-primary my-2 my-sm-0 mr-2" 
        type="submit" 
        onClick={this.handleOnSubmit}  
        >
      Send
      </button>;
      leaveChatButton = <button 
      className="col-1 btn btn-warning btn-sm my-2 my-sm-0 mr-2" 
      type="submit" 
      onClick={this.leaveChat}  
      >
      Leave Chat
      </button>
    } else {
      chatSubmitButton = <button 
        className="col-1 btn btn-primary my-2 my-sm-0 mr-2 disabled" 
        disabled
        >
      Send
      </button>;
      leaveChatButton = <button 
      className="col-1 btn btn-warning btn-sm my-2 my-sm-0 mr-2 disabled" 
      disabled  
      >
      Leave Chat
      </button>
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
            <p>{ this.props.isLoggedIn && this.state.activeForumName !== "" 
                  ? `${this.props.username} joined ${this.state.activeForumName}` 
                  : ""}
            </p>
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