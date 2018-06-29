import React, { Component } from "react";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testVar: "test variable"
    };
  }

  render() {
    // const chatMsgs = React.Children.toArray(this.props.children);
    // {chatMsgs.length ? "chat begun with messages" : "Chat Window"}
    return (
        <div>
          <ul>
            {this.props.convoArray.map((chatMsg, index) => (
                  <li key={index}>
                    <h6 className="card-subtitle mb-2 text-muted">{chatMsg}</h6>
                  </li>
              ) 
            )}
          </ul>
        </div>
    );
  }
  
}

/*
{ this.props.convoArray.map(elem => {
  return (
    <p>text</p>
  );
}
)}
*/

export default ChatWindow;