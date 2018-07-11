import React from "react";

const EntryMessage = (props) => {
    return (
    <div className="container my-5">
        <div className="row justify-content-center text-center loing-alert">
            <h2 className="col-12">You Must Be Logged<br/>In To Continue.</h2>
            <img className="col-12 key-icon my-4" src="/images/key.svg"/>
            <button className="btn col-12 col-md-4" onClick={props.renderLogin}>    
                Continue To Login
            </button>
        </div>
    </div>
    );
  }

  export default EntryMessage;