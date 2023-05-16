import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItems, GalleryImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  static defaultProps = {
    src: '',
    alt: '',
    largeImage: '',
  };

  createModal = () => {
    const { largeImage, alt } = this.props;
    this.props.isShowModal(largeImage, alt);
  };

  render() {
    const { src, alt } = this.props;

    return (
      <GalleryItems>
        <GalleryImage src={src} alt={alt} onClick={this.createModal} />
      </GalleryItems>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isShowModal: PropTypes.func.isRequired,
};
