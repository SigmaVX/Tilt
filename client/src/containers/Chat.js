import React, { Component } from "react";
import ChatWindow from "../components/ChatWindow";
import API from "../utilities/API";

const io = require("socket.io-client");

const chatListener = io.connect("http://localhost:3000");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubHovered: false,
      userName: "example user",
      chatMsg: "",
      // chat conversation will be an array of chat messages
      chatConvo: [],
      forumText: [],
      postedBy: "username1",
      forumId: -1
    };
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
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
          postedBy: thisChat.state.postedBy
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
    chatListener.emit("chat message", this.state.chatMsg);
    
    console.log(`chat message: ${this.state.chatMsg}`);
  }



  render() {
    return (

      <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse" >Chat</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="d-flex flex-row justify-content-center">
          <section className="col-sm-8">
            <div className="card" id="chat-box">
              <h5 className="text-center">Chatroom</h5>
              <hr />
              <ChatWindow
                convoArray = {this.state.chatConvo}
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
              className="btn btn-primary my-2 my-sm-0 mr-2" 
              type="submit" 
              onClick={this.handleOnSubmit}  
            >
              Send
            </button>
          </form>
        </div>

      </div>
    )
  }
} 

export default Chat;