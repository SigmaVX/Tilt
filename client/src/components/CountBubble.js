import React from "react";

const CountBubble = (props) => (
 <div className="col-2 text-center">
    <img className="img-fluid round-img" src={props.gameImage || props.systemImage}/>
    <h5 className="bubble-title">{props.gameName || props.systemName}</h5>
    <p className="cheat-count">Total Cheats: {props.cheatCount}</p>
 </div>
)

export default CountBubble;