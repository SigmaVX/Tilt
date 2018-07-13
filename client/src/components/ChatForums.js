// =========================================================================
// ChatForums component
// 
// Description: This component is responsible for listing the chat
//  gameroom forums.
//
// =========================================================================

import React, { Component } from "react";
import API from "../utilities/API";

const GENERAL_FORUM_ID = "5b47c8472fe2ce8208c9f482";

class ChatForums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // forum information
      // ----------------------------------------------------
      forumsList: [],
      // default forum is "General" Forum
      activeForumId: GENERAL_FORUM_ID,
      activeForumName: "General",
      // --
      // select menu option default
      // ---------------------------
      // value: "none"
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
  }

  componentDidMount() {
    this.loadForumList();
    // load default chat forum: 'General'
   /* this.setState({
      value: GENERAL_FORUM_ID,
      activeForumName: "General",
      activeForumId: GENERAL_FORUM_ID
    }) */
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
    // console.log(`in ChatForums.js event.target.value: ${value}, chatroom: ${forum.forumChatRoom}`);
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
  
  // Load Games List To State, set default Chatroom to General
  loadForumList = () => {
    const thisForum = this;
    API.getForumList()
      .then(res => {
          this.setState({
            forumsList: res.data
          });
      })
      .then(() => {
        setTimeout(function() {
          thisForum.setState({value: GENERAL_FORUM_ID});
          thisForum.props.getForumInfo({
            chatRoomSelected: true,
            activeForumId: GENERAL_FORUM_ID,
            activeForumName: "General"
          });
        }, 0);
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
                <select value={this.state.value} 
                onChange={this.handleForumChange}>
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