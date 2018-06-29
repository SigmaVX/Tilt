import React, {Component} from "react";
import API from "../utilities/API";
import Search from "../components/Search";

class Home extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        cheats: [],
        search: "",
        userID: 1
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
        })
        .catch(err => console.log(err))
    }


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
    }

  render() {
    return (

    <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Tilt</h1>
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
                    <select className="form-control" name="cheatSystem" value={this.state.value} onChange={this.handleonChange}>
                        {this.state.systems.map(system=>{
                            return(
                                <option value={system.systemName}>{system.systemName}</option>
                            )    
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>What Game Where They Playing:</label>
                    <select className="form-control" name="cheatGame" value={this.state.value} onChange={this.handleChange}>
                        {this.state.games.map(game=>{
                            return(
                                <option value={game.gameName}>{game.gameName}</option>
                            )    
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>How Did They Cheat:</label>
                    <select className="form-control" name="cheatType" value={this.state.value} onChange={this.handleonChange}>
                        {this.state.cheats.map(cheat=>{
                            return(
                                <option value={cheat.cheatName}>{cheat.cheatName}</option>
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










        <Search
            reportSearch={this.reportSearch}
        />

    
        <div className="row text-center mx-2">
              <h2 className="col-12">{this.state.reports.length
                  ? "Cheat Reports"
                  : "No Cheat Reports Right Now!"}
              </h2>

              
        </div>

    </div>
    )
  }
}

export default Home;