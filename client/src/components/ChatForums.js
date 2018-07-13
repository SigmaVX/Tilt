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
      // default forum is "General" Forum
      activeForumId: 0,
      activeForumName: "",
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
  }

  componentDidMount() {
    this.loadForumList();
    // load default chat forum: 'General'
/*     this.props.getForumInfo({
      chatRoomSelected: true,
      activeForumId: GENERAL_FORUM_ID,
      activeForumName: "General"
    }); */
  }

  handleForumChange = (event) => {
    event.preventDefault();

    const {value} = event.target;
    let forum = this.state.forumsList.find(forum => forum._id === value);
    //console.log(`event.target.value: ${value}, chatroom: ${forum.forumChatRoom}`);
    // console.log(`in ChatForums.js handleForumChange() forum._id: ${forum._id}`);

    this.setState({
      activeForumId: forum._id,
      activeForumName: forum.forumChatRoom,
      value: value
    });
     // console.log(`ChatForums.js in handleForumChange state.value: ${this.state.value}`);
     // console.log(`ChatForums.js in handleForumChange 'normal' value: ${value}`);
    if (value !== "none"){
       // console.log(`in ChatForums.js handleSubmit() activeForumId: ${this.state.activeForumId}`);
      this.props.getForumInfo({
        chatRoomSelected: true,
        activeForumId: forum._id,
        activeForumName: forum.forumChatRoom
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
 
    return (
        <div>
          <h6 className="text-center">Join Chatroom (requires login)</h6>
          {/* Select dropdown menu */}
          <div>
            <form>
              <label>
              Select Chat Forum&nbsp;
                <select value={this.state.value} onChange={this.handleForumChange}>
                <option value="none">--Select game forum--</option>
                {this.state.forumsList.map(forum =>
                  (
                    <option key={forum._id} value={forum._id}>{forum.forumChatRoom}</option>
                  )
                )}
                </select>
              </label>
            </form>
          </div>

        </div>
    );
  }
}

export default ChatForums;