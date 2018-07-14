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
      activeForumId: "",
      activeForumName: "General",
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
    this._defaultForumName = "General";
  }

  componentDidMount() {
    this.loadForumList();
  }

  handleForumChange = (event) => {
    event.preventDefault();

    const {value} = event.target;
    let forum = this.state.forumsList.find(forum => forum._id === value);

    this.setState({
      activeForumId: forum._id,
      activeForumName: forum.forumChatRoom,
      value: value
    });
    if (value !== "none"){
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
    let defaultForum;
    API.getForumList()
      .then(res => {
          const forums = res.data;

          // search for General chatroom's id
          defaultForum = forums.find(forum => this._defaultForumName === forum.forumChatRoom);
          this.setState({
            forumsList: forums,
            activeForumId: defaultForum._id
          });          
      })
      .then(() => {
        setTimeout(function() {
          thisForum.setState({value: defaultForum._id});
          thisForum.props.getForumInfo({
            chatRoomSelected: true,
            activeForumId: defaultForum._id,
            activeForumName: this._defaultForumName
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