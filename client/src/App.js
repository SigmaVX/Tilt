import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Videos from "./containers/Videos";
import Chat from "./containers/Chat";
import Admin from "./containers/Admin";
import Post from "./containers/Post";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Logout from "./containers/Logout";
import './App.css';


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
      usertestvalue: "hello"
    };
  }

  LoginResult = (authObj) => {
    console.log(` in LoginResult
    isLoggedIn: ${authObj.isLoggedIn}
    isAdmin: ${authObj.isAdmin}
    username: ${authObj.username}
    email: ${authObj.email}
    userId: ${authObj.userId}`);
    this.setState(authObj);
  }

  LogoutResult = (authObj) => this.setState(authObj);

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  AuthRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.state.isLoggedIn
            ? ( <Component 
                  username = {this.state.username} 
                  userId = {this.state.userId}
                  email = {this.state.email}
                  isLoggedIn = {this.state.isLoggedIn} 
                  {...props} 
                /> ) 
            : ( <Redirect to={{ 
                pathname: "/login",
                state: { from: props.location } 
            }} /> )
          }
        />
      );
  }

  AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isAdmin
          ? ( <Component {...props} /> ) 
          : ( <Redirect to={{ 
              pathname: "/login",
              state: { from: props.location } 
          }} /> )
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
                   email = {this.state.email} />} />

          <this.AuthRoute exact path="/post" component={Post}/>

          <Route exact path="/videos" component={Videos}/>

          <this.AuthRoute exact path="/chat" component={Chat} />

          <this.AdminRoute exact path="/admin" component={Admin}/>

          <Route exact path="/login" render={() => <Login getLoginResult = {this.LoginResult} />} /> 

          <Route exact path="/signup" component={Signup}/>

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