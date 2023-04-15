import ItemCard from '../ItemCard/ItemCard';

import { Offers } from '../../types/offers';


type OffersListType = {
  offers: Offers;
  selectedPoint: number | null;
  onListItemHover: (listItemName: string) => void;
};

function OffersList({ offers, onListItemHover, selectedPoint }: OffersListType): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <ItemCard
          key={`${offer.id}`}
          offer={offer}
          onMouseOverHandler={() => {
            onListItemHover(`${offer.id}`);
          }}
        />
      ))}
    </div>
  );
}

export default OffersList;
