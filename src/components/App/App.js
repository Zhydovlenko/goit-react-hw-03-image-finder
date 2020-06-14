import React, { Component } from 'react';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';

import imagesApi from '../../services/imagesApi';

import styles from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }

    if (prevState.images.length > 12) {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        // top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images =>
        this.setState(state => ({
          images: [...state.images, ...images],
          page: state.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  render() {
    const { images, loading, error } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {error && <Notification message="No results!" />}

        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}

        {images.length > 0 && !loading && (
          <button type="button" onClick={this.fetchImages}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
