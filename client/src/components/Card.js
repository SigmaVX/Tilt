import React, { Component } from "react";

class Card extends Component {

    state = {
        cardGameName: "",
        cardGameImage: ""
    }

     // Save On Change Data
     handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    updateGameClick = (id) => {
        const gameInfo = {
            gameName: this.state.cardGameName,
            gameImage: this.state.cardGameImage,
            id: id
        }
        this.props.updateGame(gameInfo);
    }

    render() {
        return (
            <div className="card my-3 mx-3">
                <img className="card-img-top" src={this.props.gameImage} alt={this.props.gameName}/>
                <div className="card-body">
                  <h5 className="card-title">{this.props.gameName}</h5>
                  <p className="card-body">Cheat Count: {this.props.cheatCount}</p>
                  <input type="text" className="form-control my-2" name="cardGameName" value={this.state.cardGameName} placeholder={this.props.gameName} onChange={this.handleOnChange}/>
                  <input type="text" className="form-control my-2" name="cardGameImage" value={this.state.cardGameImage} placeholder={this.props.gameImage} onChange={this.handleOnChange}/>
                  <button className="btn btn-block my-2" onClick={()=>this.updateGameClick(this.props._id)}>Update Game</button>
                </div>
              </div>   
        )
    }
}

export default Card;