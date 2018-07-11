import React from "react";

const EntryMessage = (props) => {
    return (
    <div className="container my-5">
        <div className="row justify-content-center text-center loing-alert">
            <h1 className="col-12">You Must Be Logged<br/>In To Continue</h1>
            <div className="col-12 key-icon-wrap">
                <i class="fab fa-keycdn"></i>
            </div> 
            <button className="btn col-12 col-md-6" onClick={props.renderLogin}>    
                Continue To Login
            </button>
        </div>
    </div>
    );
  }

  export default EntryMessage;