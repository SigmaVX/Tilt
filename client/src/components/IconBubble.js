import React from "react";

const IconBubble = (props) => (
 <div className="col-4 col-md-2 text-center icon-bubble" key={props._id  }>
    <img className="img-fluid" src={props.systemImage} alt={props.systemName}/>
    <h5 className="bubble-title">{props.systemName}</h5>
    <p className="cheat-count">Total Cheats: {props.cheatCount}</p>
 </div>
)

export default IconBubble;