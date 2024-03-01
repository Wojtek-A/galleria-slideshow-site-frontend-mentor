import css from './Painting.module.css';
import useScreenSize from '../../hooks/useScreenSize';
import { Modal } from '../../components/Modal/Modal';
import { usePaintingNr } from '../../paintingContex';
import { Footer } from '../../components/Footer/Footer';

export const Painting = () => {
  const { data } = usePaintingNr();
  const screenSize = useScreenSize();

  const showImage = () => {
    if (screenSize >= 768) {
      return data.images.hero.large;
    } else return data.images.hero.small;
  };

  return (
    <>
      <section>
        <div className={css.paintingPage}>
          <Modal />
          <div className={css.headingsBox}>
            <h1 className={css.headingName}>{data.name}</h1>
            <h3 className={css.headingArtist}>{data.artist.name}</h3>
            <img
              className={css.artistImage}
              src={`${data.artist.image}`}
              alt={`${data.artist.name}`}
            />
          </div>
          <img
            className={css.paintingImage}
            src={`${showImage()}`}
            alt={`painting ${data.name}`}
          />
          <h2 className={css.paintingYear}>{data.year}</h2>
          <div className={css.descriptionText}>
            <p className={css.paintingDescription}>{data.description}</p>
            <a className={css.paintingSource} href={`${data.source}`}>
              GO TO SOURCE
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
