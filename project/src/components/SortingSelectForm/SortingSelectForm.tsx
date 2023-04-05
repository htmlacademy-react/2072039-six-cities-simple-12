import { useEffect, useRef, useState } from 'react';

import { SortTypes } from '../../constants';


function SortingSelectForm(): JSX.Element {
  const selectRef = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SortTypes.DEFAULT);

  const selectOptions = Object.values(SortTypes).map((value, index) => (
    <li
      key={`places__option_${index.toString()}`}
      className="places__option"
      tabIndex={0}
      onClick={() => setSelectedOption(value)}
    >{value}
    </li>
  ));

  useEffect(() => {
    if (!selectRef) {
      return;
    }

    const handleMouseClick = (e: MouseEvent) => {
      if (e.target !== selectRef.current) {
        setOpened(false);
      }
    };

    document.body.addEventListener('click', handleMouseClick);

    return () => document.body.removeEventListener('click', handleMouseClick);
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened(!isOpened)}
        ref={selectRef}
      >
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
        &nbsp;{selectedOption}
      </span>
      <ul className={`places__options places__options--custom places__options${isOpened ? '--opened' : ''}`}>
        {selectOptions}
      </ul>
    </form>
  );
}

export default SortingSelectForm;
