import { sortList } from '../constants';

import { Offers } from '../types/offers';
import { SortingOption } from '../types/sorting';


export const getSelectedOffers = (coll: Offers, select: SortingOption): Offers => {
  switch (select.value) {
    case sortList.PRICE_HIGH.value:
      return coll.sort((itemA, itemB) => itemB.price - itemA.price);

    case sortList.PRICE_LOW.value:
      return coll.sort((itemA, itemB) => itemA.price - itemB.price);

    case sortList.RATING.value:
      return coll.sort((itemA, itemB) => itemB.rating - itemA.rating);

    case sortList.DEFAULT.value:
      return coll;

    default:
      throw new Error(`Unknown order state: '${select.value}'!`);
  }
};
