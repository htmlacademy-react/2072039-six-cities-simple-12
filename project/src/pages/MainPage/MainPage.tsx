import { useState, useEffect } from 'react';

import { useAppSelector } from '../../hooks';

import { cityNames } from '../../constants';

import { getSelectedOffers } from '../../utils/getSelectedOffers';

import { getOffers, getActiveCity, getSelect } from '../../store/offers/selectors';

import MainEmptyPage from '../MainEmptyPage/MainEmptyPage';
import OffersList from '../../components/OffersList/OffersList';
import NavCities from '../../components/NavCities/NavCities';
import SelectFormProps from '../../components/SelectForm/SelectForm';
import Map from '../../components/Map/Map';

import { Offers, Offer } from '../../types/offers';


const getActiveOffers = (activeCity: string, offers: Offers) => offers ? offers.filter((offer) => offer.city.name === activeCity) : [];

const getCityForMap = (offer: Offer) => offer.city;

function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getActiveCity);
  const select = useAppSelector(getSelect);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeOffers, setOffers] = useState<Offers>(getActiveOffers(activeCity, offers));

  const sortedOffers = getSelectedOffers(activeOffers, select);

  useEffect(() => {
    setOffers(getActiveOffers(activeCity, offers));
  }, [activeCity]);

  return (
    sortedOffers.length > 0 ? (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <NavCities cities={cityNames} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{activeOffers.length} places to stay in {activeCity}</b>
              <SelectFormProps select={select} />
              <OffersList
                offers={sortedOffers}
                onListItemHover={(id) => setActiveCard(Number(id))}
                selectedPoint={activeCard}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={activeOffers}
                city={getCityForMap(activeOffers[0])}
                selectedPoint={activeCard}
                className={'cities'}
              />
            </div>
          </div>
        </div>
      </main>
    ) : (
      <MainEmptyPage />
    )
  );
}

export default MainPage;
