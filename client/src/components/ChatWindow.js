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

  deleteItemHandler(convoIndex) {
    console.log(`in deleteItemHandler, item ${convoIndex}`);
    this.props.getDeleteChatItem({
      convoIndex: convoIndex
    });
  }

  chatDeleteOption = (convoIndex) => {
    if (this.props.isAdmin) {
      return (
        <section>
          <span>&nbsp;</span>
          <button 
            className="btn btn-sm btn-danger my-2 my-sm-0 mr-2" 
            type="submit"
            onClick={() => this.deleteItemHandler(convoIndex)}   
          >
          &times;
          </button>
        </section>
      )
    }
    return null;
  };

  render() {
    return (
      
        <div>
          <ul>
            {this.props.convoArray.map((chatMsg, index) => (
                  <li key={index}>
                    <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                    {chatMsg} {this.chatDeleteOption(index)}
                    </h6>
                  </li>
              ) 
            )}
          </ul>
        </div>
    );
  }
  
}

export default ChatWindow;