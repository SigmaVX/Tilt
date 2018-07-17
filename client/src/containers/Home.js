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
        this.splashDelay();
    }

    componentWillUnmount =()=>{
        clearTimeout(this.dealyOne);
        clearTimeout(this.delayTwo);
        clearTimeout(this.delayThree);
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
            const myColors = ['#681D7F','#E287FF','#D03AFF','#71437F','#A72FCC','#570D7F','#C966FF', '#AE1AFF', '#65337F', '#8B15CC'];
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
        // console.log("Search Obj: ", searchObject);
        API.getReportsByIGN(searchObject).then(res => {
            // console.log("Res Data: ", res.data);
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

        // console.log(sendObject);
        API.postReport(sendObject)
        .then(res=> {
            // console.log(res.data)
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
        // console.log("Cheat Array: ", this.state.cheats);
        const chartData =[];
        this.state.cheats.map(cheat=>{
            chartData.push({theta: cheat.cheatCount});              
        });
        this.setState({chartData: chartData});
        // console.log("Chart Data: ", this.state.chartData);
    }

    // Splash Delay
    splashDelay = () =>{
        this.dealyOne =  setTimeout(function() { 
            document.getElementById("splash-video").src = "https://www.youtube.com/embed/NNfQpCIRsGA?rel=0;&autoplay=1&mute=1&loop=1&playlist=NNfQpCIRsGA"; 
        }, 1000);
        this.delayTwo = setTimeout(function(){
            document.getElementById("splash-video").style.opacity = "1";
            document.getElementById("splash-video").setAttribute("class", "video animated fadeIn");
        }, 3000)
        this.delayThree = setTimeout(function(){
            document.getElementById("splash-subtitle").setAttribute("class", "col-12 no-gutters text-center animated fadeOut");
        }, 5000)

    }
 
  render() {
    
    return (

    <div>
       

        <div className="videoHolder jumbotron splash d-flex align-items-center">
            <iframe className="video" id="splash-video" title="Splash Video" src="" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="col-12 no-gutters text-center" id="splash-text">
                <h1 className="col-12 animated rotateIn">Tilt</h1>
                <h2 className="col-12 animated fadeIn" id="splash-subtitle">Find, Report, & Track Cheaters</h2>
            </div>    
        </div>

        <div className="container-fluid home-results">
            <div className="row justify-content-center text-center pt-5">
                <h2 className="col-12 pb-4">Top Five Cheats By Game</h2>
                
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
                <h2 className="col-12 pb-2 pt-5">Total Cheats By System</h2>
                
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
        

        <div className="row justify-content-center text-center pt-5 pb-3">
            <h2 className="col-10">How Are Users Cheating?</h2>
            
            <CheatRadialChart
                chartData={this.state.chartData}
                legendData={this.state.legendData}
            />

        </div>


            <div className="container-fluid pt-4 pb-4">

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
                            <tr className="row reports-row py-2" key={report._id}>
                                <td className="col-12 col-md-2 text-center">
                                    <img className="img-fluid rounded my-1" src={report.cheatGame.gameImage} alt={report.cheatGame.gameName}/>            
                                </td>
                                <td className="col-12 col-md-8 report-text">
                                    <h6 className="ign-title mt-2 mb-1">{report.cheaterIGN} ({report.cheatSystem.systemName})</h6>
                                    <p className="game-title my-1"><strong>Cheat Game:</strong> {report.cheatGame.gameName}</p>
                                    <p className="cheat-type my-1"><strong>Cheat Type: </strong> {report.cheatType.cheatName}</p>
                                    <p className="date my-1"><strong>Reported On: </strong>{Moment(report.date).format('MMM Do YY')}</p>
                                    <p className="comment-text my-1">
                                        {report.cheatComments 
                                            ? report.cheatComments 
                                            : null}
                                    </p>
                                
                                </td>
                                <td className="col-12 col-md-2 d-flex align-items-center justify-content-center text-center">
                                    
                                    {report.cheatVideo 
                                        ?   (<div className="text-center">
                                                <a className="video-link my-1" target="_blank" href={report.cheatVideo}>
                                                    <h6>Cheat Video</h6>
                                                    <div className="col-12 video-icon-wrap my-1">
                                                        <i className="fab fa-youtube"></i>
                                                    </div> 
                                                </a>
                                            </div>
                                            )
                                        :   (<div className="text-center">
                                                    <h6>No Video</h6>
                                                    <div className="col-12 video-icon-wrap my-1">
                                                        <i className="fas fa-video-slash"></i>
                                                    </div>
                                            </div>
                                            )
                                    }
                                   
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
    )
  }
}

export default Home;

