import React, {Component} from "react";
import {Redirect} from "react-router-dom";
// import API from "../utils/API";
import AUTH from "../utilities/AUTH";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "",
      password: ""
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  // Method to handle user login, should redirect to main page when done
  login = (event) => {
    event.preventDefault();
    AUTH
      .login({username: this.state.username, password: this.state.password})
      .then(res => {
        console.log(res.data);
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          email: res.data.email
        })
      })
      .catch(err => console.log(err.response));
  }

  render() {
    // If user is logged in, take them to main page
    if (this.state.isLoggedIn) {
      return <Redirect to="/"/>
    } 

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <form>
            <h3>Login!</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Username"/>
              <small id="usernameHelp" className="form-text text-muted">Enter your username</small>
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

            <button type="submit" className="btn btn-success" onClick={this.login}>Login</button>
          </form>

        </div>
      </div>
    )
  }
}

export default Login;