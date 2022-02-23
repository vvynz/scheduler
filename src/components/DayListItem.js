import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })

  const formatSpots = (spots) => {
    // return props.spots === 1 ? `${props.spots} spot remaining` : props.spots === 0 ? "no spots remaining" : `${props.spots} spots remaining`

    if (spots === 1) {
      return `${spots} spot remaining`;
    } else if (spots === 0) {
      return 'no spots remaining';
    } else {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li>
      <h2 onClick={() => props.setDay(name)} className={dayClass}>{name}</h2>
      <h3 className={dayClass}>{formatSpots(spots)}</h3>
    </li>
  );
}