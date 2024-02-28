import css from './Painting.module.css';
import { useState } from 'react';
import ViewImageIcon from './../../assets/icons/icon-view-image.svg?react';
import useScreenSize from '../../hooks/useScreenSize';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { usePaintingNr } from '../../paintingContex';
import { Footer } from '../../components/Footer/Footer';

export const Painting = () => {
  const { data } = usePaintingNr();
  const screenSize = useScreenSize();
  const [open, setOpen] = useState(false);

  const showImage = () => {
    if (screenSize >= 768) {
      return data.images.hero.large;
    } else return data.images.hero.small;
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <section>
        <div className={css.paintingPage}>
          <div className={css.galleryBox} onClick={onOpenModal}>
            <ViewImageIcon className={css.galleryBoxIcon} />
            <p className={css.galleryBoxText}>VIEW IMAGE</p>
          </div>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            closeIcon={<p>CLOSE</p>}
          >
            <img
              className={css.modalPainting}
              src={`${data.images.gallery}`}
              alt={`${data.name}`}
            />
          </Modal>
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
