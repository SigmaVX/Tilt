import React, {Component} from "react";
import API from "../utilities/API";

class Home extends Component {

    // Set Initial State
    state = {
        reports: [],
        games: [],
        systems: [],
        search: "",
        userID: 1
    }

    // Save On Change Data
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
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
        })
        .catch(err => console.log(err))
    }


    //  userPost = (id) => {
     
    //     API.postReport({
    //         cheaterIGN: ,
    //         cheatGame: ,
    //         cheatSystem: ,
    //         cheatType: ,
    //         cheatVideo: this.state.cheatVideo || "",
    //         cheatComments: 
    //     })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // }

  render() {
    return (

    <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse">Tilt</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
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
    
    
        <div className="row">
              <h2>{this.state.reports.length
                  ? "Cheat Reports"
                  : "No Cheat Reports Right Now!"}
              </h2>

              
                {this.state.reports.map(report => (
                
                <div className="card" key={report._id} id={report._id}>
                    <div className="row no-gutters">
                        <div className="col-auto">
                            <img src="//placehold.it/200" className="img-fluid" alt=""/>
                        </div>
                        <div className="col">
                            <div className="card-block px-2">
                                <h4 className="card-title">{report.cheaterIGN}</h4>
                                <p className="card-text"></p>
                                <a href="#" className="btn btn-primary">BUTTON</a>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer w-100 text-muted">
                        Footer stating cats are CUTE little animals
                    </div>
                </div>
              

                  )
                )}
            
        </div>

    </div>
    )
  }
}

export default Home;