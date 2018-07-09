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
        <div className="row justify-content-center">
          <form>
            <h3>Registration form</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Username" />
              <small id="usernameHelp" className="form-text text-muted">Enter your username</small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Email" />
              <small id="usernameHelp" className="form-text text-muted">Please enter your email</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pswrdConfirmation">Confirm Password</label>
              <input
                type="password"
                name="pswrdConfirmation"
                value={this.state.pswrdConfirmation}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Type password again"
              />
            </div>
            {
              this.state.errorMsg !== "" 
              ? this.displayErrorMessage()
              : ""
            }
            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up</button>
          </form>

        </div>
      </div>
    )
  }
}

export default Signup;