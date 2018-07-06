import React, {Component} from "react";
import { Link } from "react-router-dom";
import AUTH from "../utilities/AUTH";


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
        <li>
          <span className="nav-item font-weight-bold">Welcome, {props.userName}</span>
        </li>
        <li className={window.location.pathname === "/logout" ? "nav-item active bg-warning" : "nav-item"}>
          <Link className="nav-link" to="/logout">Logout</Link>
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
      // --
      // loggedIn variable
      // ---------------------------
      isLoggedIn: false,
      isAdmin: false,
      username: "",
      email: "",
      userId: ""
    };
  }

  componentDidMount() {
    // check to see whether user is logged in and whether user is admin
    this.loginCheck();
    this.adminCheck();
  }

  loginCheck = () => {
    AUTH
      .loginCheck()
      .then(res =>
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username,
          email: res.data.email,
          userId: res.data.userId
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({
          isLoggedIn: false
        });  
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

  render() {
    return  (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">Tilt</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={window.location.pathname === "/" ? "nav-item active bg-warning" : "nav-item"}>
              <Link className="nav-link" 
              to="/"
              to={{
                pathname: "/",
                state: {
                  isLoggedIn: this.state.isLoggedIn,
                  username: this.state.username,
                  userId: this.state.userId,
                  email: this.state.email
                }
              }}
              >
              Home
              </Link>
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
            <AdminBar isAdmin = {this.state.isAdmin} />
            <AuthMenu 
              isLoggedIn = {this.state.isLoggedIn}
              userName = {this.state.username}
             />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;