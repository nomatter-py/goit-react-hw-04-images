import React, { Component, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    // if (event.currentTarget === event.target) {
    onClose();
    //  }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>{children}</ModalContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
