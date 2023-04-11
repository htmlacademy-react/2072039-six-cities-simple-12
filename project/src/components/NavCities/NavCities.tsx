import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action';

import Location from '../Location/Location';


type NaveCitiesProps = {
  cities: string[];
};

function NavCities({ cities }: NaveCitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.activeCity);

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
