import React, { Component } from "react";

class Card extends Component {

    state = {
        cardName: this.props.gameName||this.props.systemName,
        cardImage:  this.props.gameImage||this.props.systemImage
    }

     // Save On Change Data
     handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    updateInfo = (id, name, image) => {
        console.log("Name: ", name, "Image: ", image);

        // Validatoion - Check If Empty
        if(this.state.cardName === "" && this.state.cardImage === ""){
            document.getElementById(id).innerHTML="Missing Name and Image!";
        } else {

            document.getElementById(id).innerHTML="Updated!";

            // Keep Image If Image Is Empty
            if(this.state.cardImage === ""){
                this.setState({
                    cardImage: image
                })
            }

            // Keep Name If Name Is Empty
            if(this.state.cardName === ""){
                this.setState({
                    cardName: name
                })
            }

            const cardInfo = {
                cardName: this.state.cardName,
                cardImage: this.state.cardImage,
                id: id
            };
            console.log("Card Info: ", cardInfo);
            if(this.props.updateGame){
                console.log("Update game processing");
                this.props.updateGame(cardInfo);
            } else{
                console.log("update system processing");
                this.props.updateSystem(cardInfo);
            }
        }   
    }

    render() {
        return (
            <div className="card my-3 mx-3" key={this.props._id}>
                <img className="card-img-top" src={this.props.gameImage || this.props.systemImage || this.props.cheatImage} alt={this.props.gameName || this.props.systemName || this.props.cheatImage}/>
                <div className="card-body">
                  <h5 className="card-title">{this.props.gameName || this.props.systemName || this.props.cheatName}</h5>
                  <p className="card-body" id={this.props._id}>Cheat Count: {this.props.cheatCount}</p>
                  <input type="text" className="form-control my-2 center-placeholder" name="cardName" value={this.state.cardName} placeholder="Update Name" onChange={this.handleOnChange}/>
                  <input type="text" className="form-control my-2 center-placeholder" name="cardImage" value={this.state.cardImage} placeholder="Update Image" onChange={this.handleOnChange}/>
                  <button className="btn btn-block my-2" onClick={()=>this.updateInfo(this.props._id, this.props.gameName||this.props.systemName||this.props.cheatName, this.props.gameImage||this.props.systemImage||this.props.cheatImage)}>Update Data</button>
                </div>
              </div>   
        )
    }
}

export default Card;