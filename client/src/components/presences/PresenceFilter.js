import React, { useContext, useRef, useEffect } from 'react';
import PresenceContext from '../../context/presences/presenceContext';

export const PresenceFilter = () => {
  const presenceContext = useContext(PresenceContext);

  const { filterPresences, clearFilter, filtered } = presenceContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterPresences(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Presences..."
        onChange={onChange}
      />
    </form>
  );
};

export default PresenceFilter;
