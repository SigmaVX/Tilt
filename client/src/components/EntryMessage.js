import React from "react";

const EntryMessage = (props) => {

    this.goToSignUp =()=>{
        window.location.replace("/signup");
    }

    this.goToLogin =()=>{
        window.location.replace("/login");
    }

    let messageToUser =  (props.adminAttempt) 
    ? <h2 className="admin-text">Admin Privileges Are Required</h2>
    : <h2 className="admin-text">To View This Page</h2>;

    return (
    <div className="container-fluid login-alert py-4 blue-background">
        <div className="row text-center">
        
            <h2 className="col-12" id="entry-toptext">Please Sign Up or Login</h2>
            <h2 className="col-12">{messageToUser}</h2>

            <div className="col-12 key-icon-wrap">
                <i className="fab fa-keycdn"></i>
            </div> 
            
        </div>

        <div className="row justify-content-center text-center">
            <button className="btn col-12 col-md-6 my-2" onClick={()=>this.goToLogin()}>    
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