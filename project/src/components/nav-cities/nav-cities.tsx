import { useAppDispatch, useAppSelector } from '../../hooks';

import { setCity } from '../../store/offers/offersSlice';

import { getActiveCity } from '../../store/offers/selectors';

import Location from '../locations/locations';


type NaveCitiesProps = {
  cities: string[];
};

function NavCities({ cities }: NaveCitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <Location
            key={city}
            location={city}
            isActive={activeCity === city}
            onClick = {() => dispatch(setCity(city))}
          />
        ))}
      </ul>
    </section>
  );
}

export default NavCities;
