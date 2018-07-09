// =========================================================================
// ChatWindow component
// 
// Description: This component is responsible for displaying the gameroom
//  chat conversation.
//
// =========================================================================

import React, { Component } from "react";

//       onClick={this.handleOnSubmit}

function DeleteChatOpt(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <section>
        <span>&nbsp;</span>
        <button 
        className="btn btn-sm btn-danger my-2 my-sm-0 mr-2" 
        type="submit"   
        >
        &times;
        </button>
      </section>
    );
  }
  return null;
}

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
                    <h6 className="d-inline-flex card-subtitle mb-2 text-muted">{chatMsg} 
                      <DeleteChatOpt 
                        isAdmin = {this.props.isAdmin}
                        chatIndex = {index}
                       />
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