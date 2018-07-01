import React, {Component} from "react";
import API from "../utilities/API";
import Search from "../components/Search";
import Moment from "moment";

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

    componentDidMount(){
        this.pageLoad();
        
    }

    // Load State From Mongo
    pageLoad = () =>{
        this.loadReports();
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
    return (

    <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Tilt</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
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