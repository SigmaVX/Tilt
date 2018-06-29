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
        <p>
          <h5>text</h5>
        </p>
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