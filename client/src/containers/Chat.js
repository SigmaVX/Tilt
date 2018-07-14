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
    : "http://localhost:3000"; 
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
    this._isMounted = true;
    this._hasJoined= false;
    this._hasPosted = false;
    const thisChat = this;

    function chatPostRoutine(obj, chatConvo) {
      let msgId;
      const uname = obj.uname,
            msg = obj.msg,
            shouldPost = obj.post;

      
      if (thisChat.state.activeForumId !== 0) {
      // if (thisChat.state.activeForumId !== 0 && !thisChat._hasPosted)  {
        if (shouldPost) {
          // post chat to forum
          API.postChat(thisChat.state.activeForumId, {chat: msg, postedBy: uname})
            .then(res => {
              msgId = res.data.chats[res.data.chats.length - 1];
              chatConvo.push({uname, msg, msgId, post: shouldPost});
              // clear chat message
              thisChat.safeUpdate({chatConvo: chatConvo, chatMsg: ""});
              thisChat._hasPosted = true;
            })
            .catch(err => console.log(err)); 
        } else {
            chatConvo.push({uname, msg, post: shouldPost});
            thisChat.safeUpdate({chatConvo: chatConvo, chatMsg: ""});  
        }
      }
    }

    chatListener.on("info msg", function (uname, info) {
      let obj = {uname: uname, msg: info, post: false};
      chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("chat msg", function (obj) {
      // if (!thisChat._hasPosted) {
        chatPostRoutine(obj, thisChat.state.chatConvo);
        thisChat._hasPosted = true;
      // }
    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  handleChangeForumNotices(forumObj) {
    if (this.props.isLoggedIn && forumObj.activeForumName !== "" && !this._hasJoined) { 
        chatListener.emit("add user", this.props.username);
        this._hasJoined = true;
      } else if (this.state.prevForumName !== forumObj.activeForumName) {
          chatListener.emit("switch forum", forumObj.activeForumName, this.props.username);
      }
  }

  // callback function into ChatForum component to obtain the chatroom info selected by user
  forumInfo = (forumObj) => {
    this.safeUpdate(forumObj);
    this.safeUpdate({chatConvo: []});
    this.safeUpdate((prevState) => {
      return {prevForumName: prevState.activeForumName}
    });
    this.handleChangeForumNotices(forumObj);
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


  handleOnChange = event => {
    const {name, value} = event.target;

    if ([name] === "chatMsg") {
      // console.log("user is typing");
      console.log("Chat.js handleOnChange -- value.length: ", name.length);
      this.renderChatUserState();
    }
    this.safeUpdate({
      [name]: value
    });
  }

  deleteChatItem = (delObj) => {
    // delete with API
    this.safeUpdate({isChatItemDeleted: true, chatConvo: [], chatText: []});
    API.deleteChat(delObj.chatId);
  }

  handleOnSubmit = event => {
    event.preventDefault();

    if (this.props.isLoggedIn && this.state.chatMsg !== "" && this.props.username !== "") {
      // send chat message to io.socket server
      chatListener.emit("send chat", {
        uname: this.props.username,
        msg: this.state.chatMsg,
        post: true
      });
      this._hasPosted = true;
      if (this.state.isChatItemDeleted) 
        this.safeUpdate({isChatItemDeleted: false});
    }
    this.safeUpdate({chatMsg: ""});
  }


  render() {
    let chatSubmitButton, leaveChatButton;
    const isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      chatSubmitButton = 
      <button className="col-1 btn btn-primary my-2 my-sm-0 mr-2" type="submit" onClick={this.handleOnSubmit}>
      Send</button>;
    } else {
      chatSubmitButton = 
      <button className="col-1 btn btn-primary my-2 my-sm-0 mr-2 disabled" disabled>
      Send</button>;
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
          </form>
        </div>

      </div>
    )
  }
} 

export default Chat;