import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Videos from "./containers/Videos";
import Chat from "./containers/Chat";
import Admin from "./containers/Admin";
import Post from "./containers/Post";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Logout from "./containers/Logout";
import AUTH from "./utilities/AUTH";
import './App.css';

function EntryMessage(props) {
  return (
    <div className="container my-5">
    <div className="justify-content-center">
      <h3>You must be logged in.</h3>
      <p>You must log in or sign up to view the {window.location.pathname} page.</p>
      <button className="btn-sm btn-success" onClick={props.renderLogin}>    
      Goto Login
      </button>
    </div>
  </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // --
      // 'session' variables
      // ---------------------------
      isLoggedIn: false,
      isAdmin: false,
      username: "",
      email: "",
      userId: "",
      usertestvalue: "hello",
      returnStatus: 0,
      errorMsg: "",
      redirectReferrer: false
    };
  }

  // Setting State For Login
  LoginResult = (authObj, redirPath) => {
    console.log(` in LoginResult
      isLoggedIn: ${authObj.isLoggedIn}
      isAdmin: ${authObj.isAdmin}
      username: ${authObj.username}
      email: ${authObj.email}
      userId: ${authObj.userId}
      redirPath: ${redirPath}`);
    this.safeUpdate(authObj);
    this.redirPath = redirPath;
  }

  // Setting State For Login
  SignupResult = (authObj, redirPath) => {
      console.log(` in SignupResult
        isLoggedIn: ${authObj.isLoggedIn}
        isAdmin: ${authObj.isAdmin}
        username: ${authObj.username}
        email: ${authObj.email}
        userId: ${authObj.userId}
        redirPath: ${redirPath}`);
      this.safeUpdate(authObj);
      this.redirPath = redirPath;
    }

  LogoutResult = (authObj) => this.setState(authObj);

  componentDidMount() {
    this._isMounted = true;
    this.redirPath = "";

    // check login status if page is reloaded
    this.isAuthenticated = this.checkAuthStatus();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  renderLogin = () => {
    console.log("in renderLogin()");
    this.safeUpdate({redirectReferrer: true});
  }
  
  checkAuthStatus() {
    AUTH
      .loginCheck()
      .then(res => {
        console.log(res.data);
        if (res.data.isLoggedIn) this.isAuthenticated = true;
        this.safeUpdate({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username,
          userId: res.data.userId,
          email: res.data.email
        });

        // check if user is admin
        AUTH
        .adminCheck()
        .then(res => {this.setState({isAdmin: res.data.isAdmin}); return ({checkLogin: this.state.isLoggedIn, checkAdmin: this.state.isAdmin});} )
        .catch(err => {
          console.log(err);
          this.safeUpdate({isAdmin: false});  
        })
      })
      .catch(err => {
        console.log(err);
        let tempObj = {
          returnStatus: -1,
          errorMsg: "Incorrect username/password",
          username: "",
          password: "",
          isLoggedIn: false
        };
        this.safeUpdate(tempObj);
      });
  }

  AuthRoute = ({ component: Component, ...rest }) => {
      console.log(`App.js pathname: ${window.location.pathname}`)
      return (
        <Route
          {...rest}
          render={props => {
            if (this.state.isLoggedIn) {
              return ( <Component 
                    username = {this.state.username} 
                    userId = {this.state.userId}
                    email = {this.state.email}
                    isLoggedIn = {this.state.isLoggedIn}
                    isAdmin = {this.state.isAdmin} 
                    {...props} 
                  /> );
            } else if (this.state.redirectReferrer) {
              this.safeUpdate({redirectReferrer: false});
              return (
                <Redirect to={{ 
                  pathname: "/login",
                  state: { referrer: window.location.pathname } 
                  }} />
              );
            } 
            else {
                return (
                  <EntryMessage renderLogin={this.renderLogin} />
                );
            }
          }
        }
        />
      );
  }

  AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.isAdmin) {
            return ( <Component 
              username = {this.state.username} 
              userId = {this.state.userId}
              email = {this.state.email}
              isLoggedIn = {this.state.isLoggedIn}               
              {...props} /> );
          } else if (this.state.isLoggedIn) {
            return ( <Redirect to={{ 
              pathname: this.redirPath,
              state: { referrer: window.location.pathname } 
            }} /> );
          } else {
              return (
                <EntryMessage renderLogin={this.renderLogin} />
              );
          }
        }
      }
      />
    );
  }

  render () { 
    return (
    <Router>
      <div>
        <Navbar 
          isLoggedIn = {this.state.isLoggedIn}
          isAdmin = {this.state.isAdmin}
          userId = {this.state.userId}
          username = {this.state.username}
          email = {this.state.email}
        />
        <Switch>
          <Route exact path="/" render={() => 
            <Home username = {this.state.username} 
                   userId = {this.state.userId}
                   email = {this.state.email} />} 
            />

          <this.AuthRoute exact path="/post" component={Post}/>

          <Route exact path="/videos" component={Videos}/>

          <Route exact path="/chat" render={(props) => 
            <Chat 
              username = {this.state.username} 
              userId = {this.state.userId}
              email = {this.state.email}
              isLoggedIn = {this.state.isLoggedIn} 
              isAdmin = {this.state.Admin}              
              {...props}/>} 
            />

          <this.AdminRoute exact path="/admin" component={Admin}/>

          <Route exact path="/login" 
                 render={(props) => 
                  <Login 
                    {...props}
                    getLoginResult = {this.LoginResult} 
                  />} 
          /> 

          <Route exact path="/signup" 
                render={(props) => 
                  <Signup
                  {...props}
                  getSignupResult = {this.SignupResult}
                  />} 
          />

          <Route exact path="/logout" render={() => <Logout getLogoutResult = {this.LogoutResult} />} />

          <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
    );
  }
}

export default App;
