import React from "react";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
let interviewClass;
  if(props.selected){
    interviewClass = "interviewers__item--selected";
  }else{
    interviewClass = "interviewers__item";
  }
  
  return (
      <li className={interviewClass} onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    );
    
}


