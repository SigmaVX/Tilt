import React from "react";

export const ErrorUserName = (props) =>
  <div className="bg-danger text-light">
      { (props.ErrorInUserName) 
        ?  <p>Username must be between {props.UnameMinLength} and {props.UnameMaxLength} characters.</p>        
        : null
      }
  </div>

  export const ErrorPassword = (props) =>
  <div className="bg-danger text-light">
      { (props.ErrorInPassword) 
        ?  <p>Password must be at least {props.MinPasswordLength} characters long.</p>        
        : null
      }
  </div>