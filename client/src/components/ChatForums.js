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
      activeId: "",
      activeGameName: ""
    };
  }

  componentDidMount() {
    this.loadGamesList();
  }

  setActiveGame(id, gName) {
    if (id) {
      console.log(`active id: ${id}`);
    }
    this.setState({
      activeId: id,
      activeGameName: gName
    });
  }  

  // Load Games List To State
  loadGamesList = () => {
    API.getGames()
      .then(res => {
          console.log(res.data);
          this.setState({
            gamesList: res.data,
          });
          // this.props.getForumInfo(this.state.gamesList, this.state.activeId, this.state.activeGameName);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
        <div>
          <h5 className="text-center">Chatrooms</h5>
          <div className="card">
            <ul className="list-group">
            {this.state.gamesList.map((game) => (
              <li key={game._id}
              className={game._id === this.state.activeId 
                        ? "list-group-item list-group-item-action active"
                        : "list-group-item"}
              onClick={() => {
                this.setActiveGame(game._id, game.gameName);
                this.props.getForumInfo(this.state.gamesList, game._id, game.gameName);
              }}
              >
                <h6>{game.gameName}</h6>
              </li>
              ) 
            )}
            </ul>
          </div>
        </div>
    );
  }
}

export default ChatForums;