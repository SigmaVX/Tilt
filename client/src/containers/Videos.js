import React, { Component } from "react";
import API from "../utilities/API";
import YouTube from "react-youtube";

const styles = {
  customButton: {
    color: "white",
    textShadow: "2px 2px #555858",
    background: "linear-gradient(to right, #a7cfdf, #23538a)"
  },
  customBtnHover: {
    color: "white",
    textShadow: "2px 2px #555858",
    background: "linear-gradient(to right, #82bbd1, #193b61)"
  },
  customCardStyle: {
    width: "50%"
  }
}

class Videos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // --
      // css state variable
      // ---------------------------
      isSubHovered: false,
      isUservidHovered: false,
      // --
      // lists from app mongo tables
      // ---------------------------
      cheatList: [],
      videoList: [],
      // --
      // youtube api state variables
      // ---------------------------
      ytVideos: [],
      // --
      // youtube query values, default value sent first
      // ----------------------------------------------
      q: "video game cheats",
      submittedQuery: "video game cheats",
      // --
      // default query values for video section
      // part = "snippet is required for youtube" 
      part: "snippet" ,
      safeSearch: "moderate",
      maxResults: 10,
      relevanceLanguage: "en",
      // --
      // select menu option default
      // ---------------------------
      value: "none"
    };
  }

  handleMouseEnter = event => {
    const {name, value} = event.target;
    
    if (value)
      this.setState({[name]: true});
    else
      this.setState({[name]: false});
  }

  handleMouseLeave = event => {
    const {name, value} = event.target;
    if (value)
      this.setState({[name]: false});
    else
      this.setState({[name]: true});
  }

  handleOnChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSelectMenuChange = event => {
    const {value} = event.target;

    this.getYouTubeVids({
      part: this.state.part,
      safeSearch: this.state.safeSearch,
      maxResults: this.state.maxResults,
      relevanceLanguage: this.state.relevanceLanguage,
      // add query value to youtube query object
      q: value     
    });
    this.setState({
      submittedQuery: value
    });

  }

  componentDidMount() {
    this.getYouTubeVids({
      part: this.state.part,
      safeSearch: this.state.safeSearch,
      maxResults: this.state.maxResults,
      relevanceLanguage: this.state.relevanceLanguage,
      // add query value to youtube query object
      q: this.state.q     
    });
    this.loadCheatsList();
  }

  loadCheatsList() {
    API.getCheats()
      .then(res => {
        this.setState({
          cheatList: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  loadVideosList() {

    API.getVideos()
      .then(res => {
        let vList = [], videoList = [];
        let linkPos = 0;

        vList = res.data;
        vList.map(item => {
          console.log(`videoLink: ${item.videoLink}`)
          linkPos = item.videoLink.lastIndexOf("/");
          console.log(item.videoLink.slice(linkPos + 1));
          videoList.push({
            vId: item._id,
            vLink: item.videoLink.slice(linkPos + 1),
            posted: item.createdOn
          });
          return true;
        });
        this.setState({
          videoList: videoList
        });
      })
      .catch(err => console.log(err));
  }

  getYouTubeVids(query) {
    API.youtubeSearch(query)
    .then(res => {
      // console.log("youtube search results: " + JSON.stringify(res.data.items));
      this.setState({
        ytVideos: res.data.items,
        submittedQuery: query.q,
        q: "",
        value: "none"
      });
    })
    .catch(err => console.log(err));
  }

  videoSearch = event => {
    event.preventDefault();

    // initialize youtube query object with api defaults
    let ytQuery = {
      part: this.state.part,
      safeSearch: this.state.safeSearch,
      maxResults: this.state.maxResults,
      relevanceLanguage: this.state.relevanceLanguage,
      // add query value to youtube query object
      q: this.state.q
    };

    // console.log(ytQuery);
    this.getYouTubeVids(ytQuery);
  }
  
  userVideoSearch = () => {
    this.loadVideosList();

    this.setState({
      submittedQuery: "User Submitted Videos"
    });
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  displayUserVideos(opts) {
    return (
      this.state.videoList.map(uVid => (
        <div style={styles.customCardStyle} className="col-4 col-xs-12 card justify-content-between align-items-center"  key={uVid.vId}>
          <div className="card-body">
            <YouTube
            videoId={uVid.vLink}
            opts={opts}
            onReady={this._onReady}
            /> 
          </div>
        </div>
        )
      )
    );
  }

  displayYtVideos(opts) {
    return (
      this.state.ytVideos.map(video => (
            <div key={video.id.videoId}>
              <YouTube
                videoId={video.id.videoId}
                opts={opts}
                onReady={this._onReady}
              />                  
            </div>
        ) 
      )
    )
  }


  render() { 
    // options for youtube video card rendering
    const opts = {
      height: "205",
      width: "336",
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 2 // paused
      }
    };

    return (
      <div>
        <div className="row no-gutters jumbotron text-center">
            <h1 className="col-12 animated pulse" >Videos</h1>
            <h2 className="col-12">Add Some Text</h2>
            <h3 className="col-12">Add More Text</h3>
        </div>

        <div className="container-fluid">
          <div className="row mb-2">
            {/* Form for video search */}
            <div className="offset-2 col-4 col-xs-12">
              <form className="form-inline">
                <div className="form-group">
                  <h6 className="inline mr-2">Search Term: </h6>
                </div>
                <div className="form-group">
                  <input 
                    name="q" 
                    value={this.state.q}
                    placeholder="Search for topic"
                    type="text"
                    className="form-control mr-2"
                    onChange={this.handleOnChange}
                  />
                  <button
                    type="submit"
                    name="isSubHovered"
                    value={this.state.isSubHovered}
                    onMouseEnter = {this.handleMouseEnter}
                    onMouseLeave = {this.handleMouseLeave}
                    style={this.state.isSubHovered ? styles.customBtnHover : styles.customButton}
                    className="btn"
                    onClick={this.videoSearch}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {/* User video posts */}
            <div className="col-2 col-xs-12">
              <button
                name = "isUservidHovered"
                value = {this.state.isUservidHovered}
                onMouseEnter = {this.handleMouseEnter}
                onMouseLeave = {this.handleMouseLeave}
                style={this.state.isUservidHovered ? styles.customBtnHover : styles.customButton}
                className="btn"
                onClick={this.userVideoSearch}
              >User Video Posts
              </button>
            </div>
            {/* Select dropdown menu */}
            <div className="col-4 col-xs-12">
              Select from Menu&nbsp;
              <select value={this.state.value} onChange={this.handleSelectMenuChange}>
              <option value="none">--Please select an option--</option>
              {this.state.cheatList.map(cheat =>
                (
                  <option key={cheat._id} value={cheat.cheatName}>{cheat.cheatName}</option>
                )
              )}
              </select>
            </div>
          </div>

          <div className="row">
            {/* Video results container */}
            <div className="offset-2 col-9 col-xs-12">
              <h3 className="text-center">{this.state.ytVideos.length || this.state.videoList.length
                 ? `Video Results of ${this.state.submittedQuery}` 
                 : "Search for videos on gamecheaters"}</h3>
                <div className="row">
                {
                  this.state.submittedQuery === "User Submitted Videos"
                  ? 
                  this.displayUserVideos(opts)
                  :
                  this.displayYtVideos(opts) 
                }
              </div>
            </div>

          </div>        
        </div>
      </div>
    );
  }  
} 

export default Videos;

/*
  displayYtVideos(opts) {
    return (
      this.state.ytVideos.map(video => (
          <div style={styles.customCardStyle} className="col-4 col-xs-12 card justify-content-between align-items-center mb-2"  key={video.id.videoId}>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-primary text-center">{video.snippet.title}</h6>
              <YouTube
                videoId={video.id.videoId}
                opts={opts}
                onReady={this._onReady}
              />                  
            </div>
          </div>
        ) 
      )
    )
  }


*/