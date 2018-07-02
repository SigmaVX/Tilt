import React from "react";

const IconBubble = (props) => (
 <div className="col-2 text-center icon-bubble">
    <img className="img-fluid" src={props.systemImage}/>
    <h5 className="bubble-title">{props.systemName}</h5>
    <p className="cheat-count">Total Cheats: {props.cheatCount}</p>
 </div>
)

export default IconBubble;