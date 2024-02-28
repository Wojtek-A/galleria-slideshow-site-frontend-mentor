import css from './Header.module.css';
import { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Logo from './../../assets/icons/icon-logo.svg?react';
import { usePaintingNr } from '../../paintingContex';

export const Header = () => {
  const [textStat, setTextStat] = useState('START SLIDESHOW');
  const [intervalId, setIntervalId] = useState(0);
  const { changePaintingNrNext } = usePaintingNr();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/painting%description`);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
    const newIntervalId = setInterval(() => {
      changePaintingNrNext();
    }, 3000);
    setIntervalId(newIntervalId);
  };

  return (
    <>
      <header>
        <div className={css.header}>
          <Link to="/" aria-label="Homepage">
            <Logo className={css.headerLogo} />
          </Link>
          <p
            className={css.headerText}
            onClick={() => {
              setTextStat(currentText =>
                currentText === 'STOP SLIDESHOW'
                  ? 'START SLIDESHOW'
                  : 'STOP SLIDESHOW'
              );
              handleClick();
            }}
          >
            {textStat}
          </p>
        </div>
        <div className={css.headerLine}></div>
      </header>
      <Outlet />
    </>
  );
};
