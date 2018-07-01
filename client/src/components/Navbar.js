import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
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
        <li className={window.location.pathname === "/admin" ? "nav-item active bg-warning" : "nav-item"}>
            <Link className="nav-link" to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar;