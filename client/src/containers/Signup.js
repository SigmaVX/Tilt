import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AUTH from "../utilities/AUTH";

class Signup extends Component {
  state = {
    success: false,
    username: "",
    password: "",
    email: "",
    userId: 0
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    })
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    AUTH
      .signup({ username: this.state.username, email: this.state.email, password: this.state.password, pswrdConfirmation: this.state.pswrdConfirmation })
      .then(res => {
        console.log(res.data);
        this.setState({ success: res.data })

      })
      .catch(err => console.log(err.response.data));
  }

  render() {
    // If Signup was a success, take them to the Login page
    if (this.state.success) {
      return <Redirect to="/login" />
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

            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up</button>
          </form>

        </div>
      </div>
    )
  }
}

export default Signup;