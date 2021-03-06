import React, { Component } from "react";
import API from "../utilities/API";
import YouTube from "react-youtube";
import {DefaultVideoQuery} from "../constants/VConst";

const UserSubmitted = "User Submitted Videos";

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
      gameList: [],
      combinedList: [],
      // --
      // youtube api state variables
      // ---------------------------
      ytVideos: [],
      // --
      // youtube query values, default value sent first
      // ----------------------------------------------
      q: DefaultVideoQuery,
      submittedQuery: DefaultVideoQuery,
      // --
      // default query values for video section
      // part = "snippet is required for youtube" 
      part: "snippet" ,
      safeSearch: "moderate",
      maxResults: 15,
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

    if (value !== UserSubmitted) {
      this.getYouTubeVids({
        part: this.state.part,
        safeSearch: this.state.safeSearch,
        maxResults: this.state.maxResults,
        relevanceLanguage: this.state.relevanceLanguage,
        // add query value to youtube query object
        q: value     
      });
    }

    this.setState({
      submittedQuery: value,
      value: value
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
    this.loadVideosList();
    this.loadCheatsList();
    this.loadGamesList();
  }

  loadCheatsList() {
    API.getCheats()
      .then(res => this.setState({cheatList: res.data}))
      .catch(err => console.log(err));
  }

  loadGamesList() {
    API.getGames()
      .then(res => {
        this.setState({gameList: res.data});
        // at this point combine cheats and games list
        this.combineLists();
      })
      .catch(err => console.log(err));
  }

  combineLists() {
    let comboList = [];

    const list1 = this.state.cheatList;
    const list2 = this.state.gameList;

    for (let elem1 of list1) {
      comboList.push({itemId: elem1._id, nameTerm: elem1.cheatName});
    }

    for (let elem2 of list2) {
      comboList.push({itemId: elem2._id, nameTerm: `${elem2.gameName} Cheats`});
    }

    // add user submitted videos to list
    comboList.push({itemId: UserSubmitted, nameTerm: UserSubmitted});

    this.setState({combinedList: comboList});
  }

  loadVideosList() {
    let vList = [], ytResults=[], videoList = [];
    let thisVideos = this;
    API.getVideos()
      .then(res => {
        let linkPos = 0, uVideoId, userVidCtr = 0;
        
        vList = res.data;

        // recursive function to get info on each youtube query with id parameter
        // taking in user submitted youtube link
        getYtInfo();

        function getYtInfo() {
          if (userVidCtr < vList.length) {
            linkPos = vList[userVidCtr].videoLink.lastIndexOf("/");
            uVideoId = vList[userVidCtr].videoLink.slice(linkPos + 1);
            
            // create query object
            let ytQuery = {
              part: "snippet",
              q: uVideoId,
              maxResults: 1
            };
            // get snippet title for each user submitted video
            API.youtubeSearch(ytQuery)
            .then(ytRes => {
              // add result to array
              let arr = ytRes.data.items;
              videoList.push({
                vId: uVideoId,
                vLink: uVideoId,
                vTitle: arr[0].snippet.title,
                posted: arr[0].createdOn
              });

              userVidCtr++;
              getYtInfo();
            })
            .catch(err => console.log(err));
          } 
        }

        thisVideos.setState({
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
        q: ""//,
        // value: "none"
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
  
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  displayUserVideos(opts) {
    return (
      this.state.videoList.map(uVid => (

          <div className="card video-card col-4" key={uVid.vId}>

            <YouTube
            videoId={uVid.vLink}
            opts={opts}
            onReady={this._onReady}
            className="card-img-top"
            /> 

            <div className="d-flex align-items-center text-center yt-title px-2 py-2">
              <h5 className="col-12 card-title">{ uVid.vTitle }</h5> 
            </div>

          </div>


        )
      )
    );
  }

  displayYtVideos(opts) {
    return (
      this.state.ytVideos.map(video => (

            <div className="card video-card col-12 col-md-4" key={video.id.videoId}>

              <YouTube
                videoId={video.id.videoId}
                opts={opts}
                onReady={this._onReady}
                className="card-img-top"
              />  
              <div className="card-body d-flex align-items-center text-center yt-title px-2 py-1">
                <h6 className="col-12 card-title">{video.snippet.title}</h6> 
              </div>

            </div>

        ) 
      )
    )
  }


  render() { 
    let videoQueryHeader;
    if (this.state.q === DefaultVideoQuery) {
      videoQueryHeader = <span>Top YouTube Cheat Videos</span>
    } else if (this.state.submittedQuery === UserSubmitted) {
      videoQueryHeader = <span>User Submitted Videos</span>
    } else if (this.state.ytVideos.length) {
      videoQueryHeader = <span>{this.state.submittedQuery} Videos</span>
    } else {
      videoQueryHeader = <span>Cheat Videos</span>
    }

    // options for youtube video card rendering
    const opts = {
      height: "205",
      width: "336",
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 2, // paused
        modestbranding:1,
        autohide:1,
        showinfo:0,
        controls:0
        


      }
    };

    return (
      <div>
        <div className="row no-gutters jumbotron text-center justify-content-center video-jumbo mb-0">
            
            <h1 className="col-12 animated fadeInDown">Videos</h1>
        
            <form className="col-12 col-md-6 justify-content-center">
                  
                  {/* Select dropdown menu */}
                  <div className="form-group">
                      <select className="form-control center-placeholder" value={this.state.value} onChange={this.handleSelectMenuChange}>
                        <option value="none">Videos By Cheat Type Or Game</option>
                        {this.state.combinedList.map(cheat =>
                          (
                            <option key={cheat.itemId} value={cheat.nameTerm}>{cheat.nameTerm}</option>
                          )
                        )}
                      </select>
                  </div>

                  {/* Search box */}
                  <div className="form-group">
                    <input 
                      name="q" 
                      value={this.state.q}
                      placeholder="Search YouTube Videos"
                      type="text"
                      className="form-control center-placeholder"
                      onChange={this.handleOnChange}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      name="isSubHovered"
                      value={this.state.isSubHovered}
                      onMouseEnter = {this.handleMouseEnter}
                      onMouseLeave = {this.handleMouseLeave}
                      className="btn btn-block"
                      onClick={this.videoSearch}
                    >
                      Search Videos
                    </button>
                  </div>

                 

            </form>

        </div>


     
         
          

        
      
            {/* Video results container */}
            
              <div className="row video-result justify-content-center no-gutters mb-0">
                {
                  this.state.submittedQuery === UserSubmitted
                  ? 
                  this.displayUserVideos(opts)
                  :
                  this.displayYtVideos(opts) 
                }
              </div>
      
               
       
      </div>
    );
  }  
} 

export default Videos;


//    {/* User video posts */}
//    <div className="col-2 col-xs-12">
//    <button
//      name = "isUservidHovered"
//      value = {this.state.isUservidHovered}
//      onMouseEnter = {this.handleMouseEnter}
//      onMouseLeave = {this.handleMouseLeave}
//      className="btn"
//      onClick={this.userVideoSearch}
//    >User Video Posts
//    </button>
//  </div>
/*

                  <div className="row justify-content-center">
                    <button className="btn-sm btn btn-block">Load more</button>
                  </div>

*/
