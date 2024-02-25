import css from './Footer.module.css';
import { usePaintingNr } from '../../paintingContex';
import BackButton from './../../assets/icons/icon-back-button.svg?react';
import NextButton from './../../assets/icons/icon-next-button.svg?react';

export const Footer = () => {
  const {
    paintingNr,
    changePaintingNrNext,
    changePaintingNrPrev,
    data,
    lastNr,
  } = usePaintingNr();

  return (
    <footer>
      <progress
        value={paintingNr + 1}
        max={lastNr + 1}
        className={css.footerLine}
      />
      <div className={css.footerContainer}>
        <div className={css.footerTextBox}>
          <h3 className={css.footerPainting}>{data.name}</h3>
          <p className={css.footerArtist}>{data.artist.name}</p>
        </div>
        <div className={css.footerButtons}>
          <BackButton
            className={css.footerButton}
            onClick={changePaintingNrPrev}
          />
          <NextButton
            className={css.footerButton}
            onClick={changePaintingNrNext}
          />
        </div>
      </div>
    </footer>
  );
};
