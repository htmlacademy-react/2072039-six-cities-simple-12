import { sortList } from '../constants';

import { Offers } from '../types/offers';
import { SortingOption } from '../types/sorting';


export const getSelectedOffers = (offers: Offers, select: SortingOption): Offers => {
  const sortingOffers = [...offers];

  switch (select.value) {
    case sortList.PRICE_HIGH.value:
      return sortingOffers.sort((itemA, itemB) => itemB.price - itemA.price);

    case sortList.PRICE_LOW.value:
      return sortingOffers.sort((itemA, itemB) => itemA.price - itemB.price);

    case sortList.RATING.value:
      return sortingOffers.sort((itemA, itemB) => itemB.rating - itemA.rating);

    case sortList.DEFAULT.value:
      return sortingOffers;

    default:
      throw new Error(`Unknown order state: '${select.value}'!`);
  }
};
