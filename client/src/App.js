import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Videos from "./containers/Videos";
import Chat from "./containers/Chat";
import Admin from "./containers/Admin";
import './App.css';


const App = () => (
  <Router>
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/videos" component={Videos}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/admin" component={Admin}/>
        <Route render={() => (<h1 className="text-center">Page Not Found!</h1>)}/>
      </Switch>
      <Footer/>
    </div>
  </Router>
)


export default App;
