import React from 'react';
import { Link } from 'react-router-dom';


type LocationProps = {
  location: string;
  isActive: boolean;
  onClick: (location: string) => void;
}

function Location({location, isActive, onClick}: LocationProps): JSX.Element {
  const onLocationClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onClick(location);
  };

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        to="/"
        onClick={onLocationClickHandler}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

export default Location;

