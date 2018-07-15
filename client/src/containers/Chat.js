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
import {ErrorChatEmpty, ErrorChatLong} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";

const io = require("socket.io-client");

// const TILT_URL = process.env.APP_URL || "http://localhost:3000";
let TILT_URL = (process.env.NODE_ENV === "production") 
    ? "https://infinite-fjord-30472.herokuapp.com" 
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
      // Chat info
      // --------------------------------------------------
      chatMsg: "",
      // chat conversation will be an array of chat messages
      chatConvo: [],
      // forum information to be received from chat forums
      forumsList: null,
      f: false,
      activeForumId: 0,
      activeForumName: "",
      // prevForum
      prevForumName: "",
      // for chat validation
      isChatMsgEmpty: false,
      isChatMsgTooLong: false,
      isChatMsgTooFast: false
    };
  }

  // receive message from chat listeners
  componentDidMount() {
    this._isMounted = true;
    this._hasJoined= false;
    this._hasPosted = false;
    const thisChat = this;
    let msgId; // keeps track of chat entry id in chats table

    function chatPostRoutine(obj, chatConvo) {
      const uname = obj.uname,
            msg = obj.msg,
            shouldPost = obj.post;

      
      if (thisChat.state.activeForumId !== 0) {
        if (shouldPost && !thisChat._hasPosted) {
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

    function addToConvo(chatObj, chatConvo) {
      chatConvo.push({uname: chatObj.uname, msg: chatObj.msg, msgId: chatObj.msgId, post: true});
      thisChat.safeUpdate({chatConvo: chatConvo, chatMsg: ""});
    }


    chatListener.on("info msg", function (uname, info) {
      let obj = {uname: uname, msg: info, post: false};
      chatPostRoutine(obj, thisChat.state.chatConvo);
    });

    chatListener.on("chat msg", function (obj) {
      if (!thisChat._hasPosted) {
        chatPostRoutine(obj, thisChat.state.chatConvo);
      } else {
        // regular emit add to chatConvo but do not store
        // name routine something else
        addToConvo({
        uname: obj.uname,
        msg: obj.msg,
        post: true}, thisChat.state.chatConvo);
      }
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
      console.log("Chat.js handleOnChange -- value.length: ", name.length);
    }
    this.safeUpdate({
      [name]: value
    });
  }

  deleteChatItem = (delObj) => {
    // delete with API
    this.safeUpdate({f: true, chatConvo: [], chatText: []});
    API.deleteChat(delObj.chatId);
  }

  handleOnSubmit = event => {
    event.preventDefault();
    let isChatMsgValid = true;

    // isChatMsgEmpty: false,
    // isChatMsgTooLong: false,
    // isChatMsgTooFast: false
    // validate message
    if (!this.state.chatMsg) {
      isChatMsgValid = false;
      this.safeUpdate({isChatMsgEmpty: true});
    }
    
    if (this.state.chatMsg.length > VConst.MaxChatMsgLength) {
      isChatMsgValid = false;
      this.safeUpdate({isChatMsgTooLong: true});
    }

    if (!isChatMsgValid) return;

    if (this.props.isLoggedIn && this.state.chatMsg !== "" && this.props.username !== "") {
      // send chat message to io.socket server
      this._hasPosted = false;
      chatListener.emit("send chat", {
        uname: this.props.username,
        msg: this.state.chatMsg,
        post: !this._hasPosted
      });
      if (this.state.f) 
        this.safeUpdate({f: false});
    }
    this.safeUpdate({
      chatMsg: "",
      isChatMsgEmpty: false,
      isChatMsgTooLong: false,
      isChatMsgTooFast: false
    });
  }


  render() {
    let chatSubmitButton, leaveChatButton;
    const isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      chatSubmitButton = 
      <button className="btn btn-block my-1" type="submit" onClick={this.handleOnSubmit}>
      Send</button>;
    } else {
      chatSubmitButton = 
      <button className="btn btn-block my-1  disabled" disabled>
      Send</button>;
    }

    return (

    <div>

        <div className="row no-gutters jumbotron text-center justify-content-center chat-jumbo mb-0">
            <h1 className="col-12 animated" >Chat</h1>
            <h2 className="col-12">
                {
                  this.props.isLoggedIn 
                  ? `Welcome To Chat: ${this.props.username}` 
                  : "Sign In To Post To Chat"
                }
            </h2>

            <ChatForums getForumInfo = {this.forumInfo} isLoggedIn = {this.props.isLoggedIn}/>
         
              <form className="form-group col-12 col-md-8">
                <input 
                  className="form-control col-12 my-1 center-placeholder" 
                  type="text" 
                  name="chatMsg" 
                  value={this.state.chatMsg}
                  placeholder="Post Your Chat Comments Here"
                  onChange={this.handleOnChange} 
                />
            
                {chatSubmitButton}
              </form>
         
        </div>


        <div className="container-fluid blue-background">

          <div>
            {/* chat message error validation messages */}
            { this.state.isChatMsgEmpty ? <ErrorChatEmpty ChatEmpty={this.state.isChatMsgEmpty} /> : null}
            { this.state.isChatMsgTooLong 
                ? <ErrorChatLong 
                    ChatLong={this.state.isChatMsgTooLong} 
                    MaxChatLength={VConst.MaxChatMsgLength}
                  /> 
                : null
            }
          </div>
                 
          <div className="row justify-content-center">
              <h2 className="col-12 text-center mt-5 mb-2">{this.state.activeForumName} Chat</h2>
              <div className="card col-12 col-md-10 mb-4">
                <ChatWindow
                  convoArray = {this.state.chatConvo}
                  userName = {this.props.username}
                  isAdmin = {this.props.isAdmin}
                  getDeleteChatItem = {this.deleteChatItem}
                  forumName = {this.state.activeForumName}
                  forumId = {this.state.activeForumId}
                  f = {this.state.f}
                />
              </div>    
          </div>
      
      </div>
    </div>
    )
  }
} 

export default Chat;