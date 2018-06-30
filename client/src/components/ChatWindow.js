// =========================================================================
// ChatWindow component
// 
// Description: This component is responsible for displaying the gameroom
//  chat conversation.
//
// =========================================================================

import React, { Component } from "react";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testVar: "test variable"
    };
  }

  render() {
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

export default ChatWindow;