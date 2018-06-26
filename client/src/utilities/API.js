import axios from "axios";

export default {
    // Search Youtube Videos
    youtubeSearch: function(query) {
      return axios.get("/api/youtubevids", {params:query})
    },
    // Get All Reports
    getReports: function() {
        return axios.get("/api/reports")
    },
    // Get All Reports By IGN
    getReportsByIGN: function(query) {
        return axios.get("/api/reports", {params: query})
    },
    // Get All Cheaters
    getCheaters: function() {
        return axios.get("/api/cheaters")
    },
    // Get All Systems
    getSystems: function() {
        return axios.get("/api/systems")
    },
    // Get All Games
    getGames: function() {
        return axios.get("/api/games")
    },
    // Get All Videos
    getVideos: function() {
        return axios.get("/api/videos")
    },
    // Get All Forum
    getForum: function() {
        return axios.get("/api/forum")
    },
    // Post Report 
    postReport: function(postInfo) {
        return axios.post("/api/reports", postInfo)
    },
    // Post Cheater 
    postCheater: function(postInfo) {
        return axios.post("/api/cheaters", postInfo)
    },
    // Post Game 
    postGames: function(postInfo) {
        return axios.post("/api/games", postInfo)
    },
    // Post Cheater 
    postSystems: function(postInfo) {
        return axios.post("/api/systems", postInfo)
    },
    // Post Video 
    postVideo: function(postInfo) {
        return axios.post("/api/videos", postInfo)
    },
    // Post Forum 
    postForum: function(postInfo) {
        return axios.post("/api/forum", postInfo)
    },
    // Edit Report
    putReport: function(query) {
        return axios.get("/api/reports", {params: query})
    },
    // Edit Cheater
    putCheater: function(query) {
        return axios.get("/api/cheaters", {params: query})
        },
    // Edit Game
    putGame: function(query) {
        return axios.get("/api/games", {params: query})
    },
    // Edit System
    putSystem: function(query) {
        return axios.get("/api/systems", {params: query})
    },
    // Edit Video
    putVideo: function(query) {
        return axios.get("/api/videos", {params: query})
    },
    // Edit Forum
    putForum: function(query) {
        return axios.get("/api/forum", {params: query})
    },
    // Delete Report
    deleteReport: function(id) {
        return axios.delete(`/api/reports/${id}`)
    },
    // Delete Cheater
    deleteCheater: function(id) {
        return axios.delete(`/api/cheaters/${id}`)
    },
    // Delete Game
    deleteGame: function(id) {
        return axios.delete(`/api/games/${id}`)
    },
    // Delete System
    deleteSystem: function(id) {
        return axios.delete(`/api/systems/${id}`)
    },
    // Delete Video
    deleteVideo: function(id) {
        return axios.delete(`/api/videos/${id}`)
    },
    // Delete Forum
    deleteForum: function(id) {
        return axios.delete(`/api/forum/${id}`)
    }
}