// =========================================================================
// ChatWindow component
// 
// Description: This component is responsible for displaying the gameroom
//  chat conversation.
//
// =========================================================================

import React, { Component } from "react";
import API from "../utilities/API";
import styled from "styled-components";

// Styled component
const StyledChatDiv = styled.div`
  background: #ffe6e6;
  height: 200px;
  overflow: auto;
`;

const StyledChatWindow = styled.textarea`
  background: salmon;
  height: 200px;
  overflow: auto;
`;

const StyledUl = styled.ul`
  font-size: 120%;
  color: black;
  font-weight: bold;
`;

const CustomLi = styled.li`
  text-decoration: none;
  color: green;
`;

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
    this.myChatHistory = [];
    this.prevForumId = this.props.forumId;
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
  if (this.props.forumId !== 0 && this.props.forumId !== this.prevForumId || 
    this.props.isChatItemDeleted && prevProps.forumId === this.props.forumId && this._notAlreadyDeleted) {
     this.loadChatHistory();
     console.log(`ChatWindow.js chat History: ${this.state.chatHistory}`);
    }
    this.prevForumId = this.props.forumId;
    this._notAlreadyDeleted = false;
    this.scrollToBottom();
  }

  // Source: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom = () => {
    this.chatsEnd.scrollIntoView({ behavior: "smooth" });
  }

  safeUpdate(updateObj) {
    if (this._isMounted)
      this.setState(updateObj);
  }

  loadChatHistory() {
    console.log(`ChatWindow.js loadChatHistory() this.props.forumId: ${this.props.forumId}`);
    API
      .getChatForum(this.props.forumId)
      .then(res => {
        this.safeUpdate({
          chatHistory: res.data.chats
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteItemHandler(chatId) {
    console.log(`ChatWindow.js in deleteItemHandler, item ${chatId}`);
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
      <StyledChatDiv>
          <StyledUl>
            {/* thisChatHistory */}
            {this.state.chatHistory.map(chatHist => (
              <CustomLi key={chatHist._id}>
                <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                  {chatHist.chat} {this.chatDeleteOption(chatHist._id)}
                </h6>
              </CustomLi>
              )
            )}
            {this.props.convoArray.map((chatMsg) => (
              <CustomLi key={chatMsg.msgId}>
                <h6 className="d-inline-flex card-subtitle mb-2 text-muted">
                {chatMsg.msg} {this.chatDeleteOption(chatMsg.msgId)}
                </h6>
              </CustomLi>
              ) 
            )}
          </StyledUl>
          <div 
            style={{ float:"left", clear: "both" }}
            ref={(endOfChat) => { this.chatsEnd = endOfChat; }} >
          </div>
      </StyledChatDiv>
    );
  }
  
}

export default ChatWindow;