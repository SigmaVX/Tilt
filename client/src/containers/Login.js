import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import {ErrorUserName, ErrorPassword} from "../components/ErrorComponents";
import * as VConst from "../constants/VConst";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      isLoggedIn: false,
      username: "",
      email: "",
      userId: "",
      password: "",
      returnStatus: 0,
      errorMsg: "",
      isValidUserName: true,
      isValidPassword: true
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.nextPathNav = "/";
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) 
      this.setState(stateObj);
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  checkErrorMessage() {
    console.log("in check error message");
    if (this.state.errorMsg !== "") {
      return (
        <span className="form-control bg-danger text-white mb-2">{this.state.errorMsg}</span>
      );
    }
  }


  // Method to handle user login, should redirect to main page when done
  // validates entries first
  login = (event) => {
    let isValidForm = true;
    event.preventDefault();

    // validate username
    if (this.state.username.length < VConst.UnameMinLength || 
        this.state.username.length > VConst.UnameMaxLength) {
      this.safeUpdate({isValidUserName: false});
      isValidForm = false;
    }

    if (this.state.password.length < VConst.MinPasswordLength) {
      this.safeUpdate({isValidPassword: false});
      isValidForm = false;
    }

    if (!isValidForm) return;
    
    AUTH
      .login({username: this.state.username, password: this.state.password})
      .then(res => {
        // console.log(res.data);
        this.safeUpdate({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username,
          userId: res.data.userId,
          email: res.data.email
        });

        // check if user is admin
        AUTH
        .adminCheck()
        .then(res => {
          // this.safeUpdate({isAdmin: res.data.isAdmin});
          this.safeUpdate({ 
            redirectToReferrer: true,
            isAdmin: res.data.isAdmin,
          });
          // ------------------------------
          // callback function to parent
          // ------------------------------
          this.props.getLoginResult({
            isLoggedIn: this.state.isLoggedIn,
            isAdmin: res.data.isAdmin, 
            userId: this.state.userId,
            username: this.state.username,
            email: this.state.email
          }, this.nextPathNav);
        })
        .catch(err => {
          console.log(err);
          this.safeUpdate({isAdmin: false});  
        })
      })
      .catch(err => {
        console.log(err);
        let tempObj = {
          returnStatus: -1,
          errorMsg: "Incorrect Username and/or Password",
          username: "",
          password: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
    
    this.safeUpdate({            
      isValidUserName: true,
      isValidPassword: true
    });
  }

  render() {
    // return to page from which user was originally sent before login attempt
    // if this fails, return to home page
    this.nextPathNav = (this.props.location.state) ? this.props.location.state.referrer : "/";
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      // console.log(`Login.js referrer: ${this.nextPathNav}`);
      return (
        <Redirect to={{ pathname: this.nextPathNav }} />
      );
    } 

    return (
      <div className="container-fluid no-guters py-5 px-0 blue-background">
        
        <div className="row justify-content-center login-alert">
          
        
          <h1 className="col-12 text-center">Login</h1>
          <div className="col-12 key-icon-wrap my-1">
            <i className="fab fa-keycdn"></i>
          </div> 

          <form className="col-12 col-md-6 my-1">
            
            <div className="form-group">
              
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Username"/>
            </div>
            { !this.state.isValidUsername 
              ? <ErrorUserName 
                  ErrorInUserName={!this.state.isValidUserName} 
                  UnameMinLength={VConst.UnameMinLength}
                  UnameMaxLength={VConst.UnameMaxLength}
                />
              : null
            }

            <div className="form-group">
              
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control center-placeholder"
                placeholder="Enter Password"
              />
            </div>
            { !this.state.isValidPassword 
              ? <ErrorPassword 
                  ErrorInPassword={!this.state.isValidPassword} 
                  MinPasswordLength={VConst.MinPasswordLength}
                />
              : null
            }

            {
              this.state.returnStatus !== 0 
              ? this.checkErrorMessage()
              : ""
            } 
            <div className="form-group">
              <button type="submit" className="btn btn-block" onClick={this.login}>
                Login
              </button>
            </div>

          </form>

        </div>
      </div>
      
      );
    }
}

export default Login;