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
      gamesList: [],
      forumId: -1,
      activeGameId: -1,
      activeGameName: "",
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
    this.handleForumChange = this.handleForumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadGamesList();
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
    console.log(`Chosen game: ${this.state.value}`);
    event.preventDefault();
  }

  setActiveGame(id, gName) {
    if (id) {
      // console.log(`active id: ${id}`);
    }
    this.setState({
      activeGameId: 1,
      activeGameName: gName
    });
  }  

  // Load Games List To State
  loadGamesList = () => {
    API.getGames()
      .then(res => {
          this.setState({
            gamesList: res.data,
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
      } disabled/>;
      
    return (
        <div>
          <h5 className="text-center">Join Chatroom</h5>
          <h6 className="text-center">(must be logged in)</h6>


          {/* Select dropdown menu */}
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
              Select Chat Forum&nbsp;
                <select value={this.state.value} onChange={this.handleForumChange}>
                <option value="none">--Select game forum--</option>
                {this.state.gamesList.map(game =>
                  (
                    <option key={game._id} gameid={game._id} value={game.gameName}>{game.gameName}</option>
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