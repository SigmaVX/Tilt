import React from "react";

const EntryMessage = (props) => {

    this.goToSignUp =()=>{
        window.location.replace("/signup");
    }

    let messageToUser =  (props.adminAttempt) 
    ? <h2 className="admin-text">You must log in and have administrator privileges to access this page.</h2>
    : <h2 className="admin-text">You must log in or sign up to view this page.</h2>;

    return (
    <div className="container login-alert my-4">
        <div className="row text-center">
        
            <h1 className="col-12">Please Sign Up or Login</h1>
            <h2 className="col-12">{messageToUser}</h2>

            <div className="col-12 key-icon-wrap">
                <i class="fab fa-keycdn"></i>
            </div> 
            
        </div>

        <div className="row justify-content-center text-center">
            <button className="btn col-12 col-md-6 my-2" onClick={props.renderLogin}>    
                Continue To Login
            </button>
        </div>
        <div className="row justify-content-center text-center">
            <button className="btn col-12 col-md-6 my-2" onClick={()=>this.goToSignUp()}>    
                Continue To Sign Up
            </button>
        </div>

    </div>
    );
  }

  export default EntryMessage;