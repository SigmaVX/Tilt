import axios from "axios";

export default {
    // signup new user 
    //  userInfo = {
    //    email: "alex@example.com" 
    //    username: "alex",
    //    password: 12345Password!,
    //    pswrdConfirmation: 12345Password!
    // }
    //
    signup: function(userInfo) {
      return axios.post("/auth/signup", userInfo)
    },
    // credentials: {username: "uname", password: "12345"}
    login: function(credentials) {
      return axios.post("/auth/login", credentials)
    },
    // checks on session existence on backend
    loginCheck: function() {
      return axios.get("/auth/login")
    },
    // path to logout
    logout: function() {
      return axios.get("/auth/logout")
    }
}

    // *********************************************************
    // TEMPORARY FOR USERS CHAT
    // *********************************************************
    // getUsers: function() {
    //  return axios.get("/api/users");
    // },
    // Post User
    // postUsers: function(postInfo) {
    //  return axios.post("/api/users", postInfo)
    // },
    // Edit Users
    // putUsers: function(id, body) {
    //  return axios.put(`/api/users/${id}`, body)
    // },
    // Delete User
    // deleteUsers: function(id) {
    //  return axios.delete(`/api/users/${id}`)
    // },
    // ************************************************************
    // END USERS TEMPORARY 
    // ************************************************************