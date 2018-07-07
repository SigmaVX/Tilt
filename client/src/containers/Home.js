import React, {Component} from "react";
import API from "../utilities/API";
import Search from "../components/Search";
import CountBubble from "../components/CountBubble";
import IconBubble from "../components/IconBubble";
import CheatRadialChart from "../components/CheatRadialChart";
import Moment from "moment";

class Home extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        cheats: [],
        cheaters: [],
        chartData: [],
        legendData: [],
        items: [],
        userID: 1
    }

    componentDidMount =() => {
        this.pageLoad();
    }


    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
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
            // console.log(res.data);
            this.setState({
              systems: res.data.systems,
              games: res.data.games,
              cheats: res.data.cheats,
              cheaters: res.data.cheaters
            })
            // console.log(res.data.cheats);
            // console.log(this.state.cheats);
            const chartData =[];
            const legendData = [];
            const myColors = ['#abcabc','#DDB27C','#88572C','#FF991F','#F15C17','#223F9A','#DA70BF','#125C77','#4DC19C','#776E57'];
            this.state.cheats.map(function(cheat,i){
                chartData.push({theta: cheat.cheatCount, label: cheat.cheatName, color: myColors[i]})                
            });
            this.state.cheats.map(function(cheat,i){
                legendData.push({title: cheat.cheatName +" ("+ cheat.cheatCount +")", color: myColors[i]})
            })
            this.setState({chartData: chartData, legendData: legendData});
            // console.log("Chart Data: ", this.state.chartData);
        })
        .catch(err => console.log(err))
    }

    // Load Reports To State
    loadReports = () => {
    API.getReports()
    .then(res => {
        // console.log("Reports: ", res.data);
        this.setState({
            reports: res.data,
        })
    })
    .catch(err => console.log(err))
    }

    // Search For Reports By IGN
    reportSearch = (searchObject) => {
        console.log("Search Obj: ", searchObject);
        API.getReportsByIGN(searchObject).then(res => {
            console.log("Res Data: ", res.data);
            this.setState({
                reports: res.data
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

    // Update and Format Cheat Data For Chart - not used
    updateChart =()=>{
        console.log("Cheat Array: ", this.state.cheats);
        const chartData =[];
        this.state.cheats.map(cheat=>{
            chartData.push({theta: cheat.cheatCount});              
        });
        this.setState({chartData: chartData});
        // console.log("Chart Data: ", this.state.chartData);
    }

 
  render() {
   

    
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
                    key={game._id}
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
                    key={system._id}
                    systemName={system.systemName}
                    systemImage={system.systemImage}
                    cheatCount={system.cheatCount}
                    />
                )   
            })}

        </div>

        <div className="row justify-content-center text-center">
            <h2 className="col-10">How Are Users Cheating?</h2>
            
            <CheatRadialChart
                chartData={this.state.chartData}
                legendData={this.state.legendData}
            />

        </div>

        <div className="row justify-content-center text center my-4">
             <Search reportSearch={this.reportSearch}/>
        </div>

        <div className="container">
              <h2 className="col-12 text-center">{this.state.reports.length
                  ? ""
                  : "No Cheat Reports Right Now!"}
              </h2>
              <div className="row justify-content-center">
              <table className="col-10">
                <tbody>
                {this.state.reports.map(report=>{
                    return (
                    <tr className="row justify-content-center reports-row py-2" key={report._id}>
                        <td className="col-12 col-md-2 text-center">
                            <img className="img-fluid rounded mt-2 mb-1" src={report.cheatGame.gameImage} alt={report.cheatGame.gameName}/>
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
                </tbody>
            </table>
            </div>
        </div>

    </div>
    )
  }
}

export default Home;

