import React, {Component} from "react";
import API from "../utilities/API";

class Post extends Component {

    // Set Initial State
    state = {
        games: [],
        systems: [],
        cheats: [],
        userID: 1
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    // Run Functions To State
    componentDidMount(){
        this.loadGames();
        this.loadSystems();
        this.loadCheats();  
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

    // Post Data To Mongo Via Send Object
    postReport = (event) => {
        event.preventDefault();
        const sendObject ={
            cheaterIGN: this.state.cheaterIGN,
            cheatGame: this.state.cheatGame,
            cheatSystem: this.state.cheatSystem,
            cheatType: this.state.cheatType,
            cheatVideo: this.state.cheatVideo,
            cheatComments: this.state.cheatComments
        }

        console.log(sendObject);
        API.postReport(sendObject)
        .then(res=> {
            console.log(res.data)
            this.setState({
            cheaterIGN: "",
            cheatGame: "",
            cheatSystem: "",
            cheatType: "",
            cheatVideo: "",
            cheatComments: ""
            })
        })
    }

  render() {
    return (

    <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Post A Cheat Report</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="row justify-content-center text center my-4">
            <form className="col-12 col-md-8" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Enter Cheater's IGN (i.e. The Cheater's One Screen Name):</label>
                    <input type="text" className="form-control" name="cheaterIGN" value={this.state.cheaterIGN}  placeholder="" onChange={this.handleOnChange}/>
                </div>
                <div className="form-group">
                    <label>Select Cheater's Game System:</label>
                    <select className="form-control" name="cheatSystem" value={this.state.cheatSystem} placeholder="Select Game" onChange={this.handleOnChange}>
                        <option value="">Select Game</option>
                        {this.state.systems.map(system=>{
                            return(
                                <option key={system._id} value={system._id}>{system.systemName}</option>
                            )    
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>What Game Where They Playing:</label>
                    <select className="form-control" name="cheatGame" value={this.state.cheatGame} onChange={this.handleOnChange}>
                        <option value="">Select System</option>
                        {this.state.games.map(game=>{
                            return(
                                <option key={game._id} value={game._id}>{game.gameName}</option>
                            )    
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>How Did They Cheat:</label>
                    <select className="form-control" name="cheatType" value={this.state.cheatType} placeholder="Select Cheat Type" onChange={this.handleOnChange}>
                        <option value="">Select Cheat Type</option>
                        {this.state.cheats.map(cheat=>{
                            return(
                                <option key={cheat._id} value={cheat._id}>{cheat.cheatName}</option>
                            )    
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Add YouTube Video Link (Optional):</label>
                    <input type="text" className="form-control" name="cheatVideo" value={this.state.cheatVideo}  placeholder="" onChange={this.handleOnChange}/>
                </div>
                <div className="form-group">
                    <label>Add Any Comments (Optional):</label>
                    <textarea type="text" className="form-control" name="cheatComments" value={this.state.cheatComments}  placeholder="" onChange={this.handleOnChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block my-2" onClick={this.postReport}>Report Cheater</button>                
                </div>
            </form>
        </div>

    </div>
    )
  }
}

export default Post;