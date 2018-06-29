import React, { Component } from "react";
import ChatWindow from "../components/ChatWindow";
import API from "../utilities/API";

const io = require("socket.io-client");

const chatListener = io.connect("http://localhost:3000");

// -----------------------------------------------------------
// UserGreeting is a functional component
//
const UserGreeting = (props) => {
  const userName = props.userName;
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
      isLoggedIn: false,
      userName: "",
      userId: 0,
      chatMsg: "",
      // chat conversation will be an array of chat messages
      chatConvo: [],
      forumText: [],
      postedBy: "sampleUser",
      forumId: -1
    };
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
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

  leaveChat() {
    console.log("leaving chat");
    this.setState({
      isLoggedIn: false
    })
  }

  // receive message from listener
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
      } else {
        API.putForum(thisChat.state.forumId,
        {
            forumText: thisChat.state.forumText,
            postedBy: thisChat.state.postedBy
        })
        .catch(err => console.log(err));
      }
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
          <section className="col-sm-8">
            <div className="card" id="chat-box">
              <h5 className="text-center">Chatroom</h5>
              <hr />
              <ChatWindow
                convoArray = {this.state.chatConvo}
                userName = {this.state.userName}
              />
            </div>
          </section>
        </div>
    
        <div>
          <form className="form-inline justify-content-center">
            <input 
              className="form-control my-2 my-sm-1 mr-sm-1" 
              type="text" 
              name="chatMsg" 
              value={this.state.chatMsg}
              placeholder="Enter message here"
              onChange={this.handleOnChange} 
            />
            <button 
              className="btn btn-primary btn-lg my-2 my-sm-0 mr-2" 
              type="submit" 
              onClick={this.handleOnSubmit}  
            >
              Send
            </button>
            <button 
              className="btn btn-warning btn-sm my-2 my-sm-0 mr-2" 
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