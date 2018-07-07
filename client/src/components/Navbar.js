import React, {Component} from "react";
import { Link } from "react-router-dom";


function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <li className={window.location.pathname === "/admin" ? "nav-item active bg-warning" : "nav-item"}>
        <Link className="nav-link" to="/admin">Admin</Link>
      </li>
    );
  }
  return "";
}

function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <div className="d-flex">
        <li className={window.location.pathname === "/logout" ? "nav-item active bg-warning" : "nav-item"}>
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        <li>
          <span className="nav-item font-weight-bold">Welcome, {props.userName}</span>
        </li>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <li className={window.location.pathname === "/login" ? "nav-item active bg-warning" : "nav-item"}>
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className={window.location.pathname === "/signup" ? "nav-item active bg-warning" : "nav-item"}>
        <Link className="nav-link" to="/signup">Signup</Link>
      </li>
    </div>
  );
}

class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testVar: "test variable"
    };
  }



  render() {
    return  (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">Tilt</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={window.location.pathname === "/" ? "nav-item active bg-warning" : "nav-item"}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={window.location.pathname === "/post" ? "nav-item active bg-warning" : "nav-item"}>
              <Link className="nav-link" to="/post">Post</Link>
            </li>
            <li className={window.location.pathname === "/videos" ? "nav-item active bg-warning" : "nav-item"}>
                <Link className="nav-link" to="/videos">Videos</Link>
            </li>
            <li className={window.location.pathname === "/chat" ? "nav-item active bg-warning" : "nav-item"}>
                <Link className="nav-link" to="/chat">Chat</Link>
            </li>
            <AdminBar isAdmin = {this.props.isAdmin} />
            <AuthMenu 
              isLoggedIn = {this.props.isLoggedIn}
              userName = {this.props.username}
             />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;