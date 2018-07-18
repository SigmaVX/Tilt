// =========================================================================
// ChatForums component
// 
// Description: This component is responsible for listing the chat
//  gameroom forums.
//
// =========================================================================

import React, { Component } from "react";
import API from "../utilities/API";
import {DefaultChatForum} from "../constants/VConst";

class ChatForums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // forum information
      // ----------------------------------------------------
      forumsList: [],
      // default forum is "Tilt" Forum
      activeForumId: "",
      activeForumName: DefaultChatForum,
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
    this._defaultForumName = DefaultChatForum;
  }

  componentDidMount() {
    this.loadForumList();
  }

  handleForumChange = (event) => {
    event.preventDefault();

    const {value} = event.target;
    let forum = this.state.forumsList.find(forum => forum._id === value);

    if (forum) {
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
    } else {
      return;
    }
  }
  
  // Load Games List To State, set default Chatroom to Tilt General
  loadForumList = () => {
    const thisForum = this;
    let defaultForum;

    API.getForumList()
      .then(res => {
          const forums = res.data;

          // search for default chatroom's id
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

            <form className="col-11 col-md-4 my-1"> 
                <select className="form-control center-placeholder" value={this.state.value} onChange={this.handleForumChange}>
                  <option value="none" disabled>Select Chat Forum</option>
                    {this.state.forumsList.map(forum =>
                      (
                        <option key={forum._id} value={forum._id}>{forum.forumChatRoom}</option>
                      )
                    )}
                </select>
            </form>

    );
  }
}

export default ChatForums;