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

export const ErrorPasswordMatch = (props) =>
  <div className="bg-danger text-light">
    { (props.ErrorInPasswordMatch) 
      ?  <p>Password and confirmation do not match. Please try again.</p>        
      : null
    }
  </div>

export const ErrorEmail = (props) =>
  <div className="bg-danger text-light">
    { (props.ErrorInEmail) 
      ?  <p>Please enter a valid password in the form of 'username@example.com'</p>        
      : null
    }
  </div>

export const ErrorChatEmpty = (props) =>
  <div className="bg-danger text-light wrong animated jello">
    { (props.ChatEmpty) ?  <p>Message cannot be empty.</p> : null}
  </div>

export const ErrorChatLong = (props) =>
  <div className="bg-danger text-light wrong animated jello">
    { (props.ChatLong) ? <p>Message must be shorter than {props.MaxChatLength} characters.</p> : null}
  </div>

export const ErrorChatFast = (props) =>
  <div className="bg-danger text-light wrong animated jello">
    { (props.ChatFast) ? <p>Chat Intervals too fast. Slow down a little. :)</p> : null}
  </div>