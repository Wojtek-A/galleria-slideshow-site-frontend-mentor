import css from './Modal.module.css';
import { useState } from 'react';
import ViewImageIcon from './../../assets/icons/icon-view-image.svg?react';
import { usePaintingNr } from '../../paintingContex';

export const Modal = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  const { data } = usePaintingNr();

  return (
    <>
      <div className={css.TriggerButton} onClick={handleClick}>
        <ViewImageIcon className={css.triggerIicon} />
        <p className={css.triggerButtonText}>VIEW IMAGE</p>
      </div>
      {toggle ? (
        <div>
          <div className={css.CustomModalRoot}>
            <div className={css.CustomModalBackdrop}>
              <div className={css.ModalContent}>
                <p className={css.modalText} onClick={handleClick}>
                  CLOSE
                </p>
                <img
                  className={css.modalPainting}
                  src={`${data.images.gallery}`}
                  alt={`${data.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
