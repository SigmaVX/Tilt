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
import AUTH from "./utilities/AUTH";
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // --
      // loggedIn variable
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
    console.log(`isLoggedIn: ${authObj.isLoggedIn}
    isAdmin: ${authObj.isAdmin}
    userId: ${authObj.userId}
    email: ${authObj.email}
    userId: ${authObj.userId}`);
    this.setState({
      isLoggedIn: authObj.isLoggedIn,
      isAdmin: authObj.isAdmin,
      userId: authObj.userId,
      email: authObj.email
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    // this.loginCheck();
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  checkLoggedIn() {
    // return true;
    this.loginCheck();
  }

  loginCheck = () => {
    AUTH
      .loginCheck()
      .then(res => {
        let resObj = {
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username,
          email: res.data.email,
          userId: res.data.userId
        };
        this.safeUpdate(resObj);
        console.log('isLoggedIn: ', res.data.isLoggedIn);
        console.log('state isLoggedIn: ', this.state.isLoggedIn);
        return res.data.isLoggedIn ? true : false;
      })
      .catch(err => {
        if (err) console.log(err);
        let errObj = {isLoggedIn: false};
        this.safeUpdate(errObj);
        return false;  
      })
  }

  adminCheck = () => {
    AUTH
      .adminCheck()
      .then(res =>
        this.setState({isAdmin: res.data.isAdmin})
      )
      .catch(err => {
        console.log(err);
        this.setState({isAdmin: false});  
      })
  }

  AuthRoute = ({ component: Component, ...rest }) => 
  (
    <Route
      {...rest}
      render={props =>
        this.checkLoggedIn() 
        ? ( <Component {...props} /> ) 
        : ( <Redirect to={{ 
            pathname: "/login",
            state: { from: props.location } 
        }} /> )
      }
    />
  );



  render () { 
    return (
    <Router>
      <div>
        <Navbar 
          isLoggedIn={this.state.isLoggedIn}
          testVar="test variable" 
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <this.AuthRoute exact path="/post" component={Post}/>
          <Route exact path="/videos" component={Videos}/>
          <this.AuthRoute exact path="/chat" component={Chat}/>
          <Route exact path="/admin" component={Admin}/>
          {/* <Route exact path="/login" render={props => <Login {...props} />} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup}/>
          <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
    );
  }
}

export default App;

/*
          <Route 
            exact path="/login"
            render= {() =>
              <Login
                getLoginResult={this.LoginResult} 
              />
            }
          />
*/