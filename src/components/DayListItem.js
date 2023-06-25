import React from "react";

import "components/DayListItem.scss"

export function formatSpots(spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining";
  } else {
    return `${spots} spots remaining`;
  }
}

export default function DayListItem(props) {
  let dayClass;
  if (props.selected) {
    dayClass = "day-list__item--selected";
  } else if (props.spots === 0) {
    dayClass = "day-list__item--full";
  } else {
    dayClass = "day-list__item";
  }
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
