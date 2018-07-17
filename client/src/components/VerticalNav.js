import React, {Component} from "react";
import { Link } from "react-router-dom";
import { bubble as Menu } from 'react-burger-menu';


function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <li className={window.location.pathname === "/admin" ? "nav active nav-active" : "nav"}>
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
      <div className="">
        <li className={window.location.pathname === "/logout" ? "nav active nav-active" : "nav"}>
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        <div className="">
          <p className="username">{props.userName}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <li className={window.location.pathname === "/login" ? "nav active nav-active" : "nav"}>
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className={window.location.pathname === "/signup" ? "nav active nav-active" : "nav"}>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
    </div>
  );
}

class VerticalNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      testVar: "test variable"
    };
  }

  render() {
    return  (
      <Menu
      width={ '200px' }
      customBurgerIcon={ <img id="burger-icon" src="images/pinball-orange.png" /> } 
      >
        <nav className="navbar">

       
          <Link className="bm-header" to="/">
            <span>
              <img className="nav-icon mr-2" src="./images/pinball-orange.png" alt="Tilt Icon"/>
              Tilt
            </span>
          </Link>
          
        
            <ul className="">
              
              <li className={window.location.pathname === "/post" ? "nav active nav-active" : "nav"}>
                <Link className="nav-link" to="/post">Report Cheaters</Link>
              </li>
              <li className={window.location.pathname === "/glossary" ? "nav active nav-active" : "nav"}>
                <Link className="nav-link" to="/glossary">Cheat Glossary</Link>
              </li>
              <li className={window.location.pathname === "/videos" ? "nav active nav-active" : "nav"}>
                  <Link className="nav-link" to="/videos">Cheat Videos</Link>
              </li>
              <li className={window.location.pathname === "/chat" ? "nav active nav-active" : "nav"}>
                  <Link className="nav-link" to="/chat">Cheat Chat</Link>
              </li>
              <li className={window.location.pathname === "/about" ? "nav active nav-active" : "nav"}>
                  <Link className="nav-link" to="/about">About</Link>
              </li>
              <AdminBar isAdmin = {this.props.isAdmin} />
              <AuthMenu 
                isLoggedIn = {this.props.isLoggedIn}
                userName = {this.props.username}
              />
            </ul>
        </nav>
      </Menu>
    );
  }
}

export default VerticalNav;