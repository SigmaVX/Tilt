import React, {Component} from "react";
import API from "../utilities/API";
import Search from "../components/Search";
import CountBubble from "../components/CountBubble";
import IconBubble from "../components/IconBubble";
import Moment from "moment";

class Home extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        cheats: [],
        cheaters: [],
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
        this.loadReports();
        this.loadRecapCounts();
    }

    // Load Sorted Recap To State
    loadRecapCounts = ()=> {
        API.getRecapCounts()
        .then(res => {
            console.log(res.data);
            this.setState({
              systems: res.data.systems,
              games: res.data.games,
              cheats: res.data.cheats,
              cheaters: res.data.cheaters
            })
        })
        .catch(err => console.log(err))
    }

    // Load Reports To State
    loadReports = () => {
    API.getReports()
    .then(res => {
        console.log("Reports: ", res.data);
        this.setState({
            reports: res.data,
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
            this.loadReports();
        })
    }

  render() {
    
    console.dir(this.state.games);
    return (

    <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Tilt</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="row no-gutters text-center">
          <h4 className="col-4 animated pulse">{this.props.username}</h4>
          <h4 className="col-4">{this.props.userId}</h4>
          <h4 className="col-4">{this.props.email}</h4>
        </div>

        <div className="row justify-content-center text-center">
            <h2 className="col-12">Top Five Cheats By Game</h2>
            
            {this.state.games.map(game=>{
                return(
                    <CountBubble
                    gameName={game.gameName}
                    gameImage={game.gameImage}
                    cheatCount={game.cheatCount}
                    />
                )   
            })}

        </div>    

        <div className="row justify-content-center text-center">
            <h2 className="col-12">Total Cheats By System</h2>
            
            {this.state.systems.map(system=>{
                return(
                    <IconBubble
                    systemName={system.systemName}
                    systemImage={system.systemImage}
                    cheatCount={system.cheatCount}
                    />
                )   
            })}

        </div>


        <div className="row justify-content-center text center my-4">
             <Search reportSearch={this.reportSearch}/>
        </div>

        <div className="container">
              <h2 className="col-12 text-center">{this.state.reports.length
                  ? ""
                  : "No Cheat Reports Right Now!"}
              </h2>

            {this.state.reports.map(report=>{
                return (
                <tr className="row justify-content-center reports-row py-2" key={report._id}>
                    <td className="col-12 col-md-2 text-center">
                        <img className="img-fluid rounded mt-2 mb-1" src={report.cheatGame.gameImage}/>
                        <h5 className="game-title my-1">{report.cheatGame.gameName}</h5>
                        
                    </td>
                    <td className="col-12 col-md-8 text-center">
                        <h5 className="ign-title mt-2 mb-1">Cheater IGN: {report.cheaterIGN} ({report.cheatSystem.systemName})</h5>
                        <h6 className="cheat-type my-1">Cheat Type: {report.cheatType.cheatName}</h6>
                        <p className="date my-1">Reported On: {Moment(report.date).format('MMM Do YY')}</p>
                        <a className="video-link my-1" target="_blank" href={report.cheatVideo}>{report.cheatVideo ? "Watch The YouTube Video" : "No Video"}</a>
                        <p className="col-12 comment-text my-1">{report.cheatComments ? `Comments: ${report.cheatComments}` : "No Comments"}</p>
                    </td>
                </tr>
                )
            })}
        </div>

    </div>
    )
  }
}

export default Home;