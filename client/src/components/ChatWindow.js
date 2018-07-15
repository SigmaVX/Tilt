// =========================================================================
// ChatWindow component
// 
// Description: This component is responsible for displaying the gameroom
//  chat conversation.
//
// =========================================================================

import React, { Component } from "react";
import API from "../utilities/API";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testVar: "test variable",
      chatHistory: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this._notAlreadyDeleted = true;
    this.prevForumId = this.props.forumId;
    // this.scrollToBottom();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
  if ((this.props.forumId !== 0 && this.props.forumId !== this.prevForumId) || 
    (this.props.isChatItemDeleted && prevProps.forumId === this.props.forumId && this._notAlreadyDeleted)) {
     this.loadChatHistory();
     // console.log(`ChatWindow.js chat History: ${this.state.chatHistory}`);
    }
    this.prevForumId = this.props.forumId;
    this._notAlreadyDeleted = false;
    // this.scrollToBottom();
  }

  // Disabled For Now - Causing Scroll Issues On Load
  // Source: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  // scrollToBottom = () => {
  //   this.chatsEnd.scrollIntoView({ behavior: "smooth" });
  // }

  safeUpdate(updateObj) {
    if (this._isMounted)
      this.setState(updateObj);
  }

  loadChatHistory() {
    // console.log(`ChatWindow.js loadChatHistory() this.props.forumId: ${this.props.forumId}`);
    API
      .getChatForum(this.props.forumId)
      .then(res => {
        // console.log("ChatWindow.js getChatForum api call res.data: ", JSON.stringify(res.data));
        this.safeUpdate({
          chatHistory: res.data.chats
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteItemHandler(chatId) {
    // console.log(`ChatWindow.js in deleteItemHandler, item ${chatId}`);
    this.props.getDeleteChatItem({
      chatId: chatId
    });
    this._notAlreadyDeleted = true;
  }

  getChatForumHistory() {
    return (
        this.state.chatHistory.map(chatHist => (
          <li key={chatHist._id}>
            <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
              {chatHist.chat}
            </h6>
          </li>
        )
      )
    );
  }

  chatDeleteOption = (chatId) => {
    if (this.props.isAdmin) {
      return (
        <section>
          <span>&nbsp;</span>
          <button 
            className="btn btn-sm btn-danger my-2 my-sm-0 mr-2" 
            type="submit"
            onClick={() => this.deleteItemHandler(chatId)}   
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
      <div className="chat-window">
          <ul>
            {/* thisChatHistory */}
            {this.state.chatHistory.map(chatHist => (
              <li key={chatHist._id}>
                <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                  {chatHist.postedBy}: {chatHist.chat} {this.chatDeleteOption(chatHist._id)}
                </h6>
              </li>
              )
            )}
            {this.props.convoArray.map((chatMsg, index) => (
                chatMsg.post 
                  ? <li key={chatMsg.msgId}>
                      <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                      {chatMsg.uname}: {chatMsg.msg} {this.chatDeleteOption(chatMsg.msgId)}
                      </h6>
                    </li>
                  : <li key={index} className="chat-list">
                      <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                        <em>{chatMsg.msg}</em>
                      </h6>
                    </li>
              ) 
            )}
          </ul>
          <div ref={(endOfChat) => { this.chatsEnd = endOfChat; }} >
          </div>
      </div>
    );
  }
  
}

export default ChatWindow;