import React, {Component} from "react";
import API from "../utilities/API";
import { Modal } from "semantic-ui-react";
import Card from "../components/Card";
// import Modal from "../components/Modal";

class Admin extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        forum: [],
        videos: [],
        search: "",
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

    // Load State From Mongo
    pageLoad = () =>{
        API.getReports()
        .then(res => {
            console.log(res.data);
            this.setState({
              reports: res.data,
            })
        })
        .catch(err => console.log(err))

        API.getGames()
        .then(res => {
            console.log(res.data);
            this.setState({
              games: res.data,
            })
        })
        .catch(err => console.log(err))

        API.getSystems()
        .then(res => {
            console.log(res.data);
            this.setState({
              systems: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    // Search For Reports By IGN
    reportSearch = (event) => {
        event.preventDefault();
        API.getReportsByIGN({
            cheaterIGN: this.state.search
        }).then(res => {
            console.log(res.data);
            this.setState({
            reports: res.data,
            search: ""
            })
        }).catch(err => console.log(err))
    }

    // Post System
    postSystem = (event) =>{
        event.preventDefault();
        API.postSystems({
            systemName: this.state.systemName,
            systemImage: this.state.systemImage
        }).then(res => {
            this.setState({
            systemName: "",
            systemImage: ""
            })    
        }).catch(err => console.log(err))
    }

    // Post Game
    postGame = (event) =>{
        event.preventDefault();
        API.postGames({
            gameName: this.state.gameName,
            gameImage: this.state.gameImage
        }).then(res => {
            this.setState({
            gameName: "",
            gameImage: ""
            });
            this.pageLoad();    
        }).catch(err => console.log(err))
    }


  // Update Game
  updateGame = (gameObject) =>{
    // event.preventDefault();
    API.putGame(gameObject.id, {
        gameName: gameObject.gameName,
        gameImage: gameObject.gameImage
    }).then(res => {
        // this.setState({
        //     games: res.data
        // });
        console.log(res.data);
        API.getGames()
        .then(res => {
            this.setState({
              games: res.data,
            })
        })
        .catch(err => console.log(err))
    }).catch(err => console.log(err))
  }
   
    // Update System
    updateSystem = (id) =>{
        // event.preventDefault();
        API.putSystem(id, {
            systemName: this.state.systemName,
            systemImage: this.state.systemImage
        }).then(res => {
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

        <div className="row text-center mx-2">

            <div className="col-12 col-md-6">
                <h2>Add New System</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" name="systemName" value={this.state.systemName}  placeholder="Enter New System Name" onChange={this.handleOnChange}/>
                        <input type="text" className="form-control my-2" name="systemImage" value={this.state.systemImage}  placeholder="Enter System Image Path" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-block my-2" onClick={this.postSystem}>Add System</button>
                    <button type="submit" className="btn btn-block my-2">Delete</button>
                </form>
            </div>

            <div className="col-12 col-md-6">
                <h2>Add New Game</h2>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control my-2" name="gameName" value={this.state.gameName}  placeholder="Enter New System Name" onChange={this.handleOnChange}/>
                        <input type="text" className="form-control my-2" name="gameImage" value={this.state.gameImage}  placeholder="Enter System Image Path" onChange={this.handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-block my-2" onClick={this.postGame}>Add Game</button>
                </form>
            </div>

        </div>

        <div className="row justify-content-center text-center my-2">
            <h2 className="col-12">Tracked Systems</h2>
            {this.state.systems.map(system => (
                <div className="card my-3 mx-3" key={system._id}>
                    <img className="card-img-top" src={system.systemImage} alt={system.systemName}/>
                <div className="card-body">
                  <h5 className="card-title">{system.systemName}</h5>
                  <p className="card-body">Cheat Count: {system.cheatCount}</p>
                  <input type="text" className="form-control my-2" name="systemName" value={this.state.systemName} onChange={this.handleOnChange}/>
                  <input type="text" className="form-control my-2" name="systemImage" value={this.state.systemImage} onChange={this.handleOnChange}/>
                  <button type="submit" className="btn btn-block my-2" onClick={()=>this.updateSystem(system._id)}>Update System</button>
                </div>
              </div>   
            ))}
        </div>


        <div className="row justify-content-center text-center my-2">
            <h2 className="col-12">Tracked Games</h2>
            {this.state.games.map(game => {

                return  (
                    <Card 
                    key={game._id} 
                    gameName={game.gameName}
                    gameImage={game.gameImage}
                    _id = {game._id}
                    updateGame={this.updateGame}
                    />
            )})}
        </div>




        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12">
                    <h2 className="col-12">Search For Cheaters</h2>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control mb-2"
                                name="search"
                                value={this.state.search}
                                placeholder="Search For A Cheater's IGN"
                                onChange={this.handleOnChange}
                                />
                            <button 
                                type="submit"
                                className="btn btn-block" 
                                onClick={this.reportSearch}>
                                Find Some Cheaters
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
        <Modal/>
       

    </div>
    )
  }
}

export default Admin;



// <div className="card my-3 mx-3" key={game._id}>
//                     <img className="card-img-top" src={game.gameImage} alt={game.gameName}/>
//                 <div className="card-body">
//                   <h5 className="card-title">{game.gameName}</h5>
//                   <p className="card-body">Cheat Count: {game.cheatCount}</p>
//                   <input type="text" className="form-control my-2" name="gameName" onChange={this.handleOnChange}/>
//                   <input type="text" className="form-control my-2" name="gameImage" onChange={this.handleOnChange}/>
//                   <button type="submit" className="btn btn-block my-2" onClick={()=>this.updateGame(game._id)}>Update Game</button>
//                 </div>
//               </div>  