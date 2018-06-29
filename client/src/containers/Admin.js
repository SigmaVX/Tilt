import React, {Component} from "react";
import API from "../utilities/API";
import Card from "../components/Card";
import Search from "../components/Search";
// import ConfirmModal from "../components/Modal";
// import { Button, Header, Image, Modal } from 'semantic-ui-react';

class Admin extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        cheats: [],
        forum: [],
        videos: [],
        userID: 1
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    componentDidMount(){
        this.pageLoad();
    }

    // Load Reports To State
    loadReports = () => {
        API.getReports()
        .then(res => {
            console.log(res.data);
            this.setState({
              reports: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    // Load Cheats To State
    loadCheats = () => {
        API.getCheats()
        .then(res => {
            console.log(res.data);
            this.setState({
              cheats: res.data,
            })
        })
        .catch(err => console.log(err))
    }


    // Load Games To State
    loadGames = () => {
        API.getGames()
        .then(res => {
            console.log(res.data);
            this.setState({
              games: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    // Load Systems To State
    loadSystems = ()=> {
        API.getSystems()
        .then(res => {
            console.log(res.data);
            this.setState({
              systems: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    // Load State From Mongo
    pageLoad = () =>{
        this.loadReports();
        this.loadGames();
        this.loadSystems();
        this.loadCheats();
    }

    // Search For Reports By IGN
    reportSearch = (searchObj) => {
        // event.preventDefault();
        API.getReportsByIGN({
            cheaterIGN: searchObj.searchTerm
        }).then(res => {
            console.log(res.data);
            this.setState({
            reports: res.data,
            search: ""
            })
        }).catch(err => console.log(err))
    }

    // Post Cheat
    postCheat = (event) =>{
        event.preventDefault();
        API.postCheats({
            cheatName: this.state.cheatName,
            cheatImage: this.state.cheatImage
        }).then(res => {
            this.loadCheats();
            this.setState({
            cheatName: "",
            cheatImage: ""
            });
        }).catch(err => console.log(err))
    }

     // Post Game
     postGame = (event) =>{
        event.preventDefault();
        API.postGames({
            gameName: this.state.gameName,
            gameImage: this.state.gameImage
        }).then(res => {
            this.loadGames();
            this.setState({
            gameName: "",
            gameImage: ""
            });
        }).catch(err => console.log(err))
    }

    // Post System
    postSystem = (event) =>{
        event.preventDefault();
        API.postSystems({
            systemName: this.state.systemName,
            systemImage: this.state.systemImage
        }).then(res => {
            this.loadSystems();
            this.setState({
            systemName: "",
            systemImage: ""
            })    
        }).catch(err => console.log(err))
    }
   
   // Update Cheat
   updateCheat = (cardObject) =>{
        console.log("Cheat Object:", cardObject);
        API.putCheat(cardObject.id, {
            cheatName: cardObject.cardName,
            cheatImage: cardObject.cardImage
        }).then(res => {
            this.loadCheats();
            this.setState({
                cheatName: "",
                cheatImage: ""
            })
        }).catch(err => console.log(err))
    }

    // Update Game
    updateGame = (cardObject) =>{
        // console.log("Game Object:", cardObject);
        API.putGame(cardObject.id, {
            gameName: cardObject.cardName,
            gameImage: cardObject.cardImage
        }).then(res => {
            this.loadGames();
            this.setState({
                gameName: "",
                gameImage: ""
            })
        }).catch(err => console.log(err))
    }
   
    // Update System
    updateSystem = (cardObject) =>{
        // console.log("Game Object:", cardObject);
        API.putSystem(cardObject.id, {
            systemName: cardObject.cardName,
            systemImage: cardObject.cardImage
        }).then(res => {
            this.loadSystems();
            this.setState({
                systemName: "",
                systemImage: ""
            }) 
        }).catch(err => console.log(err))
    }



  render() {
    return (

    <div>
        
        
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Admin</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="row justify-content-center text-center mx-3 my-2">

            <div className="col-12 col-md-4">
                <h2>Add New System</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" name="systemName" value={this.state.systemName}  placeholder="Enter New System Name" onChange={this.handleOnChange}/>
                        <input type="text" className="form-control my-2" name="systemImage" value={this.state.systemImage}  placeholder="Enter System Image Path" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-block my-2" onClick={this.postSystem}>Add System</button>
                </form>
            </div>

            <div className="col-12 col-md-4">
                <h2>Add New Game</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" name="gameName" value={this.state.gameName}  placeholder="Enter New Game Name" onChange={this.handleOnChange}/>
                        <input type="text" className="form-control my-2" name="gameImage" value={this.state.gameImage}  placeholder="Enter Game Image Path" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-block my-2" onClick={this.postGame}>Add Game</button>
                </form>
            </div>


            <div className="col-12 col-md-4">
                <h2>Add Cheat Type</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" name="cheatName" value={this.state.cheatName}  placeholder="Enter Cheat Name" onChange={this.handleOnChange}/>
                        <input type="text" className="form-control my-2" name="cheatImage" value={this.state.cheatImage}  placeholder="Enter Cheat Image Path" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-block my-2" onClick={this.postCheat}>Add Cheat</button>
                </form>
            </div>

        </div>

        
        <div className="row justify-content-center text-center mt-4 mb-2">
            <h2 className="col-12">Tracked Systems</h2>
            {this.state.systems.map(system => {

                return  (
                    <Card 
                        key={system._id} 
                        systemName={system.systemName}
                        systemImage={system.systemImage}
                        cheatCount={system.cheatCount}
                        _id = {system._id}
                        updateSystem={this.updateSystem}
                    />
            )})}
        </div>


        <div className="row justify-content-center text-center my-2">
            <h2 className="col-12">Tracked Games</h2>
            {this.state.games.map(game => {

                return  (
                    <Card 
                        key={game._id} 
                        gameName={game.gameName}
                        gameImage={game.gameImage}
                        cheatCount={game.cheatCount}
                        _id = {game._id}
                        updateGame={this.updateGame}
                    />
                )})}
        </div>

        <div className="row justify-content-center text-center my-2">
            <h2 className="col-12">Tracked Cheats</h2>
            {this.state.cheats.map(cheat => {

                return  (
                    <Card 
                        key={cheat._id} 
                        cheatName={cheat.cheatName}
                        cheatImage={cheat.cheatImage}
                        cheatCount={cheat.cheatCount}
                        _id = {cheat._id}
                        updateGame={this.updateCheat}
                    />
                )})}
        </div>


        <Search
            reportSearch={this.reportSearch}
        />
    
     
        
       

    </div>
    )
  }
}

export default Admin;