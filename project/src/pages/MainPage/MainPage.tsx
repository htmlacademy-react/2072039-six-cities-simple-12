import { useState, useEffect } from 'react';

import { useAppSelector } from '../../hooks';

import { cityNames } from '../../constants';

import MainEmptyPage from '../MainEmptyPage/MainEmptyPage';
import OffersList from '../../components/OffersList/OffersList';
import NavCities from '../../components/NavCities/NavCities';
import SortingSelectForm from '../../components/SortingSelectForm/SortingSelectForm';
import Map from '../../components/Map/Map';

import { Offers, Offer } from '../../types/offers';


const getActiveOffers = (activeCity: string, offers: Offers) => offers.filter((offer) => offer.city.name === activeCity);

const getCityForMap = (offer: Offer) => offer.city;

function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeOffers, setOffers] = useState<Offers>(getActiveOffers(activeCity, offers));

  useEffect(() => {
    setOffers(getActiveOffers(activeCity, offers));
  }, [activeCity]);

  return (
    activeOffers.length > 0 ? (
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
              <SortingSelectForm />
              <OffersList
                offers={activeOffers}
                onListItemHover={(id) => setActiveCard(Number(id))}
                selectedPoint={activeCard}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={activeOffers}
                  city={getCityForMap(activeOffers[0])}
                  selectedPoint={activeCard}
                />
              </section>
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
