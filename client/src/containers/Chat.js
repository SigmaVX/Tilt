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
      forumText: [],
      postedBy: "sampleUser",
      userStateMsg: "sample message",
      // forum information to be received from chat forums
      forumsList: null,
      activeForum: 0,
      activeNameGame: ""
    };
  }

  forumInfo = (list, id, gName) => {
    this.setState({
      forumsList: list,
      activeForum: id,
      activeNameGame: gName   
    });
    if (this.props.isLoggedIn) {
      console.log(`user joined ${this.state.activeNameGame}`);
    }
  }

  renderChatUserState() {
    console.log("in renderChatUserState()");
    if (this.props.isLoggedIn && this.state.chatMsg !== "") {
      chatListener.emit("user state", `${this.props.username} is typing`);
/*       this.setState({
        userStateMsg: "user is typing"
      }) */
      return (<strong>{this.props.username} is typing</strong>);
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
    let chatConvo = this.state.chatConvo;
 
    chatListener.on("chat message", function(msg){
      chatConvo.push(msg);
      console.log(`current message: ${msg}`);
      console.log(`chat Conversation: ${chatConvo}`);
      // clear chat message
      thisChat.setState({
        chatConvo: chatConvo,
        chatMsg: "",
        forumText: chatConvo
      });

      // post to forum
      // create new conversation in database only on first message,
      // otherwise update forumText with message id
      if (thisChat.state.forumText.length <= 1) {
        API.postForum({
          forumText: thisChat.state.forumText,
          postedBy: thisChat.props.username
        })
        .then(res => {
          thisChat.setState({forumId: res.data._id});
        })
        .catch(err => console.log(err));
      } else if (thisChat.state.forumId !== -1) {
        API.putForum(thisChat.state.forumId,
        {
            forumText: thisChat.state.forumText,
            postedBy: thisChat.state.postedBy
        })
        .catch(err => console.log(err));
      }
    });

    // turn on user state listener
    chatListener.on("user state", function(uStateMsg){
      console.log(uStateMsg);
    });

    // turn on leave chat listener
    chatListener.on("leave chat", function(){
      console.log(`${thisChat.props.username} disconnected.`);
    });
  }

  leaveChat = event => {
    event.preventDefault();

    chatListener.emit("chat message", `${this.props.username} disconnected.`);
    chatListener.emit("leave chat");
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    if ([name] === "chatMsg") {
      console.log("user is typing");
      this.renderChatUserState();
    }
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();

    // send message to io.socket server
    if (this.props.isLoggedIn && this.state.chatMsg !== "") {
      chatListener.emit("chat message", `${this.props.username}: ${this.state.chatMsg}`);
      console.log(`chat message: ${this.state.chatMsg}`);
    } else {
      this.setState({chatMsg: ""});
    }
  }


  render() {

    return (

      <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse" >Chat</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="row">
          <h6 className = "d-flex col-4">User: {this.props.username}</h6>
          <h6 className = "d-flex col-4">Email: {this.props.email}</h6>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <section className="col-6">
            <div className="card">
              <h5 className="text-center">{this.state.activeNameGame} Chatroom</h5>
              <hr />
              <ChatWindow
                convoArray = {this.state.chatConvo}
                userName = {this.props.username}
              />
            </div>
          </section>
          <section className="col-3">
            <ChatForums
              getForumInfo = {this.forumInfo} 
            />
            <p>{this.props.isLoggedIn ? `${this.props.username} joined ${this.state.activeNameGame}` : ""}</p>
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
            <button 
              className="col-1 btn btn-primary my-2 my-sm-0 mr-2" 
              type="submit" 
              onClick={this.handleOnSubmit}  
            >
              Send
            </button>
            <button 
              className="col-1 btn btn-warning btn-sm my-2 my-sm-0 mr-2" 
              type="submit" 
              onClick={this.leaveChat}  
            >
            Leave Chat
            </button>
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