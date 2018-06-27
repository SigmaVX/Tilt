import React, { Component } from "react";

const io = require("socket.io-client");

const socket = io.connect("http://localhost:3000");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubHovered: false,
    };
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
            </div>
          </section>
        </div>
    
        <div>
          <form className="form-inline justify-content-center">
            <label for="send-chat"></label>
            <input id="send-chat" className="form-control my-2 my-sm-1 mr-sm-1" type="text" placeholder="Message..." aria-label="send-chat" />
            <button className="btn btn-primary my-2 my-sm-0 mr-2" type="submit" value="Send">Send</button>
          </form>
        </div>

      </div>
    )
  }
} 

export default Chat;