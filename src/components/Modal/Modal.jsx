import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (code === 'Escape' || target === currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <Overlay onClick={this.closeModal}>
        <ModalWindow>
          <img src={src} alt={alt} width="800" height="600" />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
