import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { GalleryList } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    isShowModal: false,
    largeImage: '',
    alt: '',
  };

  showModal = (largeImage, alt) => {
    this.setState({ isShowModal: true, largeImage, alt });
  };

  hideModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { isShowModal, largeImage, alt } = this.state;
    const { hideModal, showModal } = this;

    return (
      <>
        {isShowModal && (
          <Modal src={largeImage} alt={alt} onClick={hideModal} />
        )}

        <GalleryList>
          {this.props.pictures.map(
            ({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  alt={tags}
                  largeImage={largeImageURL}
                  isShowModal={showModal}
                />
              );
            }
          )}
        </GalleryList>
      </>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
};
