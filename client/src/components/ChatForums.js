// =========================================================================
// ChatForums component
// 
// Description: This component is responsible for listing the chat
//  gameroom forums.
//
// =========================================================================

import React, { Component } from "react";
import API from "../utilities/API";

class ChatForums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // forum information
      // ----------------------------------------------------
      forumsList: [],
      forumId: -1,
      activeGameId: -1,
      activeForumName: "",
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadForumList();
  }

  handleForumChange = (event) => {
    const {value} = event.target;
    console.log("event.target.value: ", value);
    this.setState({
      activeGameId: 0,
      value: value
    });
  } 

  handleSubmit(event) {
    console.log(`Chosen forum: ${this.state.value}`);
    event.preventDefault();
    if (this.state.value !== "none"){
      this.props.getForumInfo({
        chatRoomSelected: true,
        activeForumName: this.state.value
      });
    }
  }

  // Load Games List To State
  loadForumList = () => {
    API.getForumList()
      .then(res => {
          this.setState({
            forumsList: res.data,
          });
      })
      .catch(err => console.log(err));
  }

  render() {
    let joinSubmitButton;
    const isLoggedIn = this.props.isLoggedIn;

    // choose whether join chat button is enabled or disabled depending on login status
    joinSubmitButton = isLoggedIn
    ?  <input className="btn btn-sm btn-success" type="submit" 
        value= {this.state.value === "none" 
        ? "No chatroom selected" 
        : `Join ${this.state.value} chat` 
      }/>
    : <input className="btn btn-sm btn-success disabled" type="submit" 
        value= {this.state.value === "none" 
        ? "No chatroom selected" 
        : `Join ${this.state.value} chat` 
      } disabled />;
      
    return (
        <div>
          <h6 className="text-center">Join Chatroom (requires login)</h6>
          {/* Select dropdown menu */}
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
              Select Chat Forum&nbsp;
                <select value={this.state.value} onChange={this.handleForumChange}>
                <option value="none">--Select game forum--</option>
                {this.state.forumsList.map(forum =>
                  (
                    <option key={forum._id} gameid={forum._id} value={forum.forumChatRoom}>{forum.forumChatRoom}</option>
                  )
                )}
                </select>
              </label>
              {joinSubmitButton}
            </form>
          </div>

        </div>
    );
  }
}

export default ChatForums;

/*

  setActiveGame(id, gName) {
    if (id) {
      // console.log(`active id: ${id}`);
    }
    this.setState({
      activeGameId: 1,
      activeForumName: gName
    });
  }  


*/