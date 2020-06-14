import React, { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    isModalOpened: false,
    largeImage: '',
  };

  openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    this.setState({ largeImage: largeImageURL, isModalOpened: true });
  };

  closeModal = e => {
    if (!e || e.currentTarget === e.target)
      this.setState({ isModalOpened: false });
  };

  render() {
    const { isModalOpened, largeImage } = this.state;
    const { images, tags } = this.props;
    return (
      <>
        <ul className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li
              key={id}
              onClick={this.openModal}
              data-src={largeImageURL}
              className={styles.ImageGalleryItem}
            >
              <ImageGalleryItem src={webformatURL} alt={tags} />
            </li>
          ))}
        </ul>
        {isModalOpened && (
          <Modal src={largeImage} alt={tags} onClick={this.closeModal} />
        )}
      </>
    );
  }
}
