import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { Portal } from '@mui/base/Portal';
import { FocusTrap } from '@mui/base/FocusTrap';
import { unstable_useModal as useModal } from '@mui/base/unstable_useModal';
import Fade from '@mui/material/Fade';
import ViewImageIcon from './../../assets/icons/icon-view-image.svg?react';
import { usePaintingNr } from '../../paintingContex';

export const UseModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = usePaintingNr();

  return (
    <>
      <TriggerButton onClick={handleOpen}>
        <ViewImageIcon className="trigger-icon" />
        <p className="trigger-button-text">VIEW IMAGE</p>
      </TriggerButton>
      <Modal aria-describedby={data.name} open={open} closeAfterTransition>
        <Fade in={open}>
          <ModalContent sx={style}>
            <p className="modal-text" onClick={handleClose}>
              CLOSE
            </p>
            <img
              className="modal-painting"
              src={`${data.images.gallery}`}
              alt={`${data.name}`}
            />
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
};

const Modal = React.forwardRef(function Modal(props, forwardedRef) {
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,

    open,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: forwardedRef,
  });

  const classes = {
    hidden: !open && exited,
  };

  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  }

  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const rootProps = {
    ...other,
    className: clsx(classes),
    ...getRootProps(other),
  };

  const backdropProps = {
    open,
    ...getBackdropProps(),
  };

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      <CustomModalRoot {...rootProps}>
        {!hideBackdrop ? <CustomModalBackdrop {...backdropProps} /> : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </CustomModalRoot>
    </Portal>
  );
});

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAfterTransition: PropTypes.bool,
  container: PropTypes.oneOfType([
    function(props, propName) {
      if (props[propName] == null) {
        return new Error(
          "Prop '" + propName + "' is required but wasn't specified"
        );
      } else if (
        typeof props[propName] !== 'object' ||
        props[propName].nodeType !== 1
      ) {
        return new Error(
          "Expected prop '" + propName + "' to be of type Element"
        );
      }
    },
    PropTypes.func,
  ]),
  disableAutoFocus: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableRestoreFocus: PropTypes.bool,
  disableScrollLock: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  onTransitionEnter: PropTypes.func,
  onTransitionExited: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

// eslint-disable-next-line react/display-name
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const ModalContent = styled('div')(` 
 & .modal-text{
    width: 63px;
    margin: 0 0 33px auto;
    text-align: end;
    color: var(--text-alternative);
    &:hover{ cursor: pointer;
    }
  }
  & .modal-painting{
    max-width: 327px;
    }

  @media screen and (min-width: 768px) {
    & .modal-text{
       margin-bottom: 41px;
       }
    & .modal-painting{
       max-width: 688px;
       }
    }
    @media screen and (min-width: 1440px) { 
       & .modal-painting{
          max-width: 1360px;
          }
      }
    `);

const CustomModalRoot = styled('div')`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomModalBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.8);
  -webkit-tap-highlight-color: transparent;
`;

const TriggerButton = styled('div')(
  `
width: 152px;
  height: 39px;
  display: inline-flex;
  padding-bottom: 1px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  top: 16px;
  left: 16px;
  transition: 250ms;
  &:hover{ cursor: pointer;
  background-color: rgb(0, 0, 0, 0.2);
  }
  & .trigger-icon{
    width: 12px;
    height: 12px;
    }
  & .trigger-button-text{
    color: var(--text-alternative);
    opacity: 1;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.143px;
    }
@media screen and (min-width: 768px) {
  top: 504px; 
}

@media screen and (min-width: 1440px) { 
     
}
`
);
