import React, { Component } from "react";
import API from "../utilities/API";
import YouTube from "react-youtube";

const styles = {
  customSubButton: {
    color: "white",
    textShadow: "2px 2px #555858",
    background: "linear-gradient(to right, #a7cfdf, #23538a)"
  },
  customSubHover: {
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
      isSubHovered: false,
      ytVideos: [],
      // youtube query values
      q: "",
      // default query values for app
      // part = "snippet is required for youtube" 
      part: "snippet" ,
      safeSearch: "moderate",
      maxResults: 10,
      relevanceLanguage: "en"
    };
  }

  handleMouseEnter = () => this.setState({isSubHovered: true});

  handleMouseLeave = () => this.setState({isSubHovered: false});

  handleOnChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
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

    console.log(ytQuery);

    API.youtubeSearch(ytQuery)
    .then(res => {
      console.log("youtube search results: " + JSON.stringify(res.data.items));
      this.setState({
        ytVideos: res.data.items,
        q: ""
      });
    })
    .catch(err => console.log(err));

  } 

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }


  render() { 
    const opts = {
      height: "195",
      width: "320",
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
          <div className="row">
            {/* Form for video search */}
            <div className="col-4">
              <h2>Search for Video Game Cheaters</h2>
              <form>
                <div className="form-group">
                  <input 
                    name="q" 
                    value={this.state.q}
                    placeholder="Search for videogame topic"
                    type="text"
                    className="form-control mb-3"
                    onChange={this.handleOnChange}
                  />
                  <button
                    type="submit"
                    onMouseEnter = {this.handleMouseEnter}
                    onMouseLeave = {this.handleMouseLeave}
                    style={this.state.isSubHovered ? styles.customSubHover : styles.customSubButton}
                    className="btn btn-block"
                    onClick={this.videoSearch}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Video results container */}
            <div className="offset-1 col-7">
              <h2>{this.state.ytVideos.length ? "Video Results" : "Search for videos on gamecheaters"}</h2>
                {this.state.ytVideos.map(video => (
                  <div style={styles.customCardStyle} className="card justify-content-between align-items-center"  key={video.id.videoId}>
                    <div className="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">{video.snippet.title}</h6>
                      <YouTube
                        videoId={video.id.videoId}
                        opts={opts}
                        onReady={this._onReady}
                      />                  
                    </div>
                  </div>
                  ) 
                )}
            </div>

          </div>        
        </div>
      </div>
    );
  }  
} 

export default Videos;