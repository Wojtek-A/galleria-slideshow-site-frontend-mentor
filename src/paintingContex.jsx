import propTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JSONData from '../src/data/data.json';

const paintingContext = createContext();

export const usePaintingNr = () => useContext(paintingContext);

export const Provider = ({ children }) => {
  const location = useLocation();
  const lastNr = JSONData.length - 1;
  const [paintingNr, setPaintingNr] = useState(0);

  let state = 0;
  if (location.state !== null) {
    state = location.state['nr'];
  }

  useEffect(() => {
    setPaintingNr(state);
  }, [state]);

  const data = JSONData[paintingNr];
  const changePaintingNr = value => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (value < 0 && paintingNr == 0) {
      setPaintingNr(lastNr);
    } else {
      setPaintingNr(paintingNr => (paintingNr + value) % JSONData.length);
    }
  };

  const changePaintingNrNext = () => {
    changePaintingNr(1);
  };
  const changePaintingNrPrev = () => {
    changePaintingNr(-1);
  };

  return (
    <paintingContext.Provider
      value={{
        paintingNr,
        changePaintingNrNext,
        changePaintingNrPrev,
        data,
        lastNr,
      }}
    >
      {children}
    </paintingContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.any.isRequired,
};
