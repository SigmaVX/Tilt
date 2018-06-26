import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg">
    <NavLink className="navbar-brand" to="/">Tilt</NavLink>
    
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
            <NavLink className="nav-link" to="/">Home </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/videos">Videos</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/chat">Chat</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/admin">Admin</NavLink>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar;