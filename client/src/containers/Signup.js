import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AUTH from "../utilities/AUTH";

class Signup extends Component {
  state = {
    success: false,
    username: "",
    password: "",
    pswrdConfirmation: "",
    email: "",
    userId: 0,
    errorMsg: ""
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    })
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(obj) {
    if (this._isMounted) this.setState(obj);
  }

  displayErrorMessage() {
    console.log("in check error message");
    if (this.state.errorMsg !== "") {
      return (
        <span className="form-control bg-danger text-white mb-2">{this.state.errorMsg}</span>
      );
    }
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    AUTH
      .signup({ username: this.state.username, email: this.state.email, password: this.state.password, pswrdConfirmation: this.state.pswrdConfirmation })
      .then(res => {
        console.log("register res.data: ", res.data);
        this.safeUpdate({ 
          success: res.data,
          isLoggedIn: res.data.isLoggedIn,
          isAdmin: false, 
          userId: res.data.userId,
          username: res.data.username,
          email: res.data.email         
         })
        // ------------------------------
        // callback function to parent
        // ------------------------------
        this.props.getSignupResult({
          isLoggedIn: this.state.isLoggedIn,
          isAdmin: false, 
          userId: this.state.userId,
          username: this.state.username,
          email: this.state.email
        }, "/");
        // Redirect On Successful Sign Up
        this.safeUpdate({ redirectToReferrer: true });
      })
      .catch(err => {
        console.log(err.response.data);
        let tempObj = {
          errorMsg: err.response.data,
          username: "",
          password: "",
          email: "",
          pswrdConfirmation: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
  }

  render() {
    // If Signup was a success, take them to the Home page
    if (this.state.success) {
      return <Redirect to="/" />
    }

    return (
      <div className="container my-5">
        <div className="row justify-content-center text-center">
        
          <form className="col-12 col-md-6 my-1">
            <h1 className="col-12">Sign Up</h1>
            <div className="col-12 key-icon-wrap my-1">
              <i class="fas fa-key"></i>
            </div> 
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Username" />
              
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Email" />
              
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="pswrdConfirmation"
                value={this.state.pswrdConfirmation}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            {
              this.state.errorMsg !== "" 
              ? this.displayErrorMessage()
              : ""
            }
            <div className="form-group">
              <button type="submit" className="btn btn-block" onClick={this.register}>Sign Up</button>
            </div>
          
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;