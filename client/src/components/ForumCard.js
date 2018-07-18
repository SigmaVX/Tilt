import React, {Component} from "react";

class ForumCard extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleForumUpdate = this.handleForumUpdate.bind(this);
    this.state = {
      forumCardName: ""
    }
  }


  handleOnChange = (event) => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  }

  handleForumUpdate(id) {
    this.props.updateForum(id, this.state.forumCardName);
    this.setState({forumCardName: ""});
  }

  handleForumDelete(id) {
    this.props.deleteForum(id);
    this.setState({forumCardName: ""});
  }


  render () {
    return (
      <div className="card col-12 col-md-3 mb-1 mx-1 no-gutters">
        <div class="card-body">
          <h5 class="card-title">{this.props.forumChatRoom}</h5>
          <input type="text" className="form-control my-2 center-placeholder" name="forumCardName" value={this.state.forumCardName}  placeholder="Update Name" onChange={this.handleOnChange}/>
          <button className="btn btn-block my-1" onClick={() => this.handleForumUpdate(this.props.forumId)}>Update Name</button>
          <button className="btn btn-block my-1" onClick={() => this.handleForumDelete(this.props.forumId)}>Delete Forum</button>
        </div>
      </div>
    );
  }
}

export default ForumCard;