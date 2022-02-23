import React from 'react';
import DayListItem from 'components/DayListItem';


export default function DayList(props) {
  console.log(props.days);

  // check to see if the day that is selected matches the name of the day in the object we are currently processing. 
  // the object here in .map, would be "day"
  const days = props.days.map(day => <DayListItem key={day.id} selected={props.value === day.name} setDay={props.onChange} {...day} />);

  return (
    <ul>{days}</ul>
  );
}