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

const chatListener = io.connect("http://localhost:3000");

// -----------------------------------------------------------
// UserGreeting is a functional component
//
const UserGreeting = (props) => {
  return (
    <section className="offset-2 form-inline mb-2">
      <h5>Welcome to Chat {props.userName}</h5>
    </section>
  );
}

// -----------------------------------------------------------
// Chat is a component class
//
class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      isSubHovered: false,
      // User information
      // ----------------------------------------------
      isLoggedIn: false,
      userName: "",
      userId: 0,
      // Chat info
      // --------------------------------------------------
      chatMsg: "",
      // chat conversation will be an array of chat messages
      chatConvo: [],
      forumText: [],
      postedBy: "sampleUser",
      // forum information to be received from chat forums
      forumsList: null,
      activeForum: 0,
      activeNameGame: ""
    };
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  forumInfo = (list, id, gName) => {
    console.log("in forum callback");
    this.setState({
      forumsList: list,
      activeForum: id,
      activeNameGame: gName   
    });
  }

  renderIntroChat() {
    if (this.state.isLoggedIn) {
        return <UserGreeting userName={this.state.userName} />;
    }
    return (
      <form className="offset-2 form-inline mb-2">
        <input 
          className="form-control my-2 my-sm-1 mr-sm-1" 
          type="text" 
          name="userName" 
          value={this.state.userName}
          placeholder="User name"
          onChange={this.handleOnChange} 
        />
        <button 
          className="btn btn-success btn-sm my-2 my-sm-0 mr-2" 
          type="submit" 
          onClick={this.handleNameSubmit}  
        >
        Enter Username
      </button>
    </form>
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
          postedBy: thisChat.state.userName
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

    // turn on disconnect listener
    chatListener.on("leave chat", function(){
      console.log(`${this.state.userName} disconnected.`);
    });
  }

  leaveChat = event => {
    event.preventDefault();

    chatListener.emit("chat message", `${this.state.userName} disconnected.`);
    chatListener.emit("leave chat");
    this.setState({
      isLoggedIn: false,
      userName: ""
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();

    // send message to io.socket server
    if (this.state.isLoggedIn && this.state.chatMsg !== "") {
      chatListener.emit("chat message", `${this.state.userName}: ${this.state.chatMsg}`);
      console.log(`chat message: ${this.state.chatMsg}`);
    } else {
      this.setState({chatMsg: ""});
    }
  }

  handleNameSubmit = event => {
    event.preventDefault();

    API.postUsers({
      userName: this.state.userName
    })
    .then(res => {
      this.setState({
        userId: res.data._id,
        isLoggedIn: true
      });
    })
    .catch(err => console.log(err));
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
          {this.renderIntroChat()}
        </div>

        <div className="d-flex flex-row justify-content-center">
          <section className="col-6">
            <div className="card">
              <h5 className="text-center">{this.state.activeNameGame} Chatroom</h5>
              <hr />
              <ChatWindow
                convoArray = {this.state.chatConvo}
                userName = {this.state.userName}
              />
            </div>
          </section>
          <section className="col-3">
            <ChatForums
              getForumInfo = {this.forumInfo} 
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
        </div>

      </div>
    )
  }
} 

export default Chat;