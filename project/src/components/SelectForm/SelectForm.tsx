import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import useSelect from '../../hooks/useSelect';

import { sortList } from '../../constants';

import { changeOffersSort } from '../../store/offers/offersSlice';

import { SortingOption } from '../../types/sorting';


type SelectFormProps = {
  select: SortingOption;
}

const SelectForm = ({ select }: SelectFormProps): JSX.Element => {
  const ref = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onSortItemClick = ( name: string, sortItem: SortingOption): void => {
    setOpen(false);
    dispatch(changeOffersSort(sortItem));
  };

  useSelect(ref, () => setOpen(false));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{marginRight: 5}}>Sort by</span>
      <span onClick={() => setOpen(!open)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {select.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {open && (
        <ul
          className="places__options places__options--custom places__options--opened"
          ref={ref}
        >
          {Object.values(sortList).map(
            (sortItem) => (
              <li
                onClick={() => onSortItemClick(sortItem.label, sortItem)}
                key={sortItem.label}
                className={cn('places__option', sortItem.label === select.label && 'places__option--active')}
                tabIndex={0}
              >
                {sortItem.label}
              </li>
            )
          )}
        </ul>
      )}
    </form>
  );
};

export default SelectForm;
