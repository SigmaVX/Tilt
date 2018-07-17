import React, {Component} from "react";
import API from "../utilities/API";
import Moment from "moment";

class Post extends Component {

    // Set Initial State
    state = {
        games: [],
        systems: [],
        cheats: [],
        recentReports: [],
        postedBy: this.props.userId
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
        this.loadRecentReports(); 
    }

    // Load Cheats To State
    loadCheats = () => {
        API.getCheats()
        .then(res => {
            // console.log(res.data);
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
            // console.log(res.data);
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
            // console.log(res.data);
            this.setState({
              systems: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    // Load Reports From Within Past 24hrs Of Current Date
    // Format Date with ("ddd, DD MMM YYYY hh:mm:ss") - not used so date will be ISO 8601 for Mongo
    loadRecentReports = () =>{
        const now = Moment().format();
        const yesterday = Moment().subtract(1, "day").format();
        console.log("Now: ", now,"  |  Yesterday: ", yesterday);

        const sendTimes = {
            now: now,
            yesterday: yesterday
        }

        API.getRecentReports(sendTimes)
        .then(res =>{
            console.log("Res Data: ", res.data)
            this.setState({
                recentReports: res.data
            })
        })
        .catch(err => console.log(err))
    }

    // Validate If Multipe Report Has Already Been Posted In Last 24 Hrs
    validateDuplicate = () =>{
        // Note: Games, System, and PostedBy State Are IDs
        let postedIGN = this.state.cheaterIGN;
        let postedGame = this.state.cheatGame;
        let postedSystem = this.state.cheatSystem;
        let postedBy = this.state.postedBy;

        // Note: Games, System, Cheat Type, and Reported By are IDs
        let recentReports = this.state.recentReports;
        let foundMatch = false;

        // Logs To View Data
        // console.log(recentReports);
        // console.log(postedIGN, postedGame, postedSystem, postedBy);

        // Loop To Look For Match In Last 24Hr Data
        for(var i=0; i<recentReports.length; i++){
         
            if(recentReports[i].cheaterIGN === postedIGN && recentReports[i].cheatGame === postedGame && recentReports[i].cheatSystem === postedSystem && recentReports[i].reportedBy === postedBy){
                console.log("found a match!");
                document.getElementById("error-text").innerHTML="You Already Reported This Player For This Game<br>You Can Only Report A Cheater Once Each Day!";
                document.getElementById("error-text").setAttribute("class", "col-12 wrong animated jello"); 
                foundMatch = true;
                break;
            }     
        }
            if(foundMatch === false){
                this.postAll();
                document.getElementById("error-text").innerHTML="Cheat Report Posted!";
                document.getElementById("error-text").setAttribute("class", "col-12 correct animated rubberBand");
                this.loadRecentReports(); 
            }
        
    }   


    // Validate Data Input
    validateForm = (event) =>{
        let buttonClicked = true;
        event.preventDefault();
        // Check Video Content
        if(typeof this.state.cheatVideo === "undefined" || this.state.cheatVideo.length === 0 || this.state.cheatVideo.includes("https://youtu.be/")){
            // Check Comment Length
            if(typeof this.state.cheatComments === "undefined" || this.state.cheatComments === 0 || this.state.cheatComments.length < 300){
                // Check If Values Are Selected In Manditory Fields
                if(this.state.cheaterIGN.length > 0 && this.state.cheatSystem.length > 0 && this.state.cheatGame.length > 0 && this.state.cheatType.length > 0){
                    // Check If Button Already Clicked
                    if(buttonClicked === true){
                        this.validateDuplicate();
                        buttonClicked = false;
                    } else {
                            document.getElementById("error-text").innerHTML="Button Double Clicked - Please Wait To Submit Your Data";
                            document.getElementById("error-text").setAttribute("class", "col-12 wrong animated jello");
                            
                    }

                } else {    
                    document.getElementById("error-text").innerHTML="Please Fill Out Required Fields";
                    document.getElementById("error-text").setAttribute("class", "col-12 wrong animated jello");
                }
            } else{
                document.getElementById("error-text").innerHTML="Comments Must Be Less Than 300 Characters";
                document.getElementById("error-text").setAttribute("class", "col-12 wrong animated jello");
            };
        } else {
            document.getElementById("error-text").innerHTML="Please Provide A Valid YouTube URL (e.g. https://youtu.be/6Zcib-ZT2qk)";
            document.getElementById("error-text").setAttribute("class", "col-12 wrong animated jello");
        }
    }

    // Post Data To Mongo Via Send Object
    postAll = () => {

        // event.preventDefault();

        const sendObject ={
            cheaterIGN: this.state.cheaterIGN,
            cheatGame: this.state.cheatGame,
            cheatSystem: this.state.cheatSystem,
            cheatType: this.state.cheatType,
            cheatVideo: this.state.cheatVideo,
            cheatComments: this.state.cheatComments,
            reportedBy: this.state.postedBy
        }

        console.log(sendObject);
        API.postReport(sendObject).then(res=> {
            // console.log("Reports Table Updated")
        
            const countObject = {   
                gameName : this.state.cheatGame,
                systemName : this.state.cheatSystem,
                cheatName : this.state.cheatType,
                cheaterIGN: this.state.cheaterIGN
            }
    
            API.updateCounts(countObject).then(res => {
            // console.log("Counts Updated");
        
            this.setState({
                cheaterIGN: "",
                cheatGame: "",
                cheatSystem: "",
                cheatType: "",
                cheatVideo: "",
                cheatComments: ""
                });
            });
        });
    };


  render() {

    // Validate That Form Data Is Present
    const { cheaterIGN, cheatGame, cheatSystem, cheatType} = this.state;
    // console.log(cheaterIGN, cheatGame, cheatSystem, cheatType, cheatVideo, cheatComments);
    const isEnabled = typeof cheaterIGN !== "undefined" && typeof cheatGame !== "undefined" && typeof cheatSystem !== "undefined" && typeof cheatType !== "undefined";

    

    return (

    <div>
        <div className="row no-gutters jumbotron post-jumbo text-center mb-0">
            <div className="col-12 jumbo-text justify-content-center">
                <h1 className="col-12 animated flipInX">Post A Cheat Report</h1>
                <h2 className="col-12">See The Cheat Glossary For Terms</h2>
            </div>
        </div>

        <div className="container-fluid post-content pt-3">
            <div className="row justify-content-center text-center py-4">
                <form className="col-12 col-md-8" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Enter Cheater's IGN (In Game Name):</label>
                        <input type="text" className="form-control center-placeholder" name="cheaterIGN" value={this.state.cheaterIGN}  placeholder="Enter Cheater's Username (Example: PWNsauce)" onChange={this.handleOnChange} required/>
                    </div>
                    <div className="form-group">
                        <label>What Game System Was The Cheater On?</label>
                        <select required className="form-control" name="cheatSystem" value={this.state.cheatSystem} placeholder="Select Game System" onChange={this.handleOnChange}>
                            <option value="">Select Game</option>
                            {this.state.systems.map(system=>{
                                return(
                                    <option key={system._id} value={system._id}>{system.systemName}</option>
                                )    
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>What Game Was The Cheater Playing?</label>
                        <select className="form-control" name="cheatGame" value={this.state.cheatGame} placeholder="Select Game" onChange={this.handleOnChange}>
                            <option value="">Select System</option>
                            {this.state.games.map(game=>{
                                return(
                                    <option key={game._id} value={game._id}>{game.gameName}</option>
                                )    
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>How Did They Cheat?</label>
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
                        <label>Add A YouTube Video Link (Optional):</label>
                        <input type="text" className="form-control center-placeholder" name="cheatVideo" value={this.state.cheatVideo}  placeholder="https://youtu.be/6Zcib-ZT2qk" onChange={this.handleOnChange}/>
                    </div>
                    <div className="form-group">
                        <label>Add Any Comments (Optional):</label>
                        <textarea type="text" className="form-control center-placeholder" name="cheatComments" value={this.state.cheatComments}  placeholder="Comments Must Be Less Than 300 Characters" onChange={this.handleOnChange}/>
                    </div>
                    <div className="form-group">
                        <button disabled={!isEnabled} type="submit" className="btn btn-block my-2" onClick={this.validateForm}>Report Cheater</button>                
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block my-2" onClick={()=>window.location.replace("/glossary")}>View Cheat Glossary</button>                
                    </div>


                            
                    <div className="form-group text-center">
                        <p id="error-text" className="error-text"></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

export default Post;