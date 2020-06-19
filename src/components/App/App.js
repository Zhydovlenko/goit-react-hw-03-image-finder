import React, { Component } from 'react';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import Button from '../Button/Button';

import fetchImagesWithQuery from '../../services/imagesApi';
import scroll from '../../services/scroll';

import styles from './App.module.css';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    searchQuery: '',
    page: 1,
  };

  fetchImages = (searchQuery, page) => {
    this.setState({ loading: true });

    fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        if (page > 1) {
          this.setState({
            images: [...this.state.images, ...images],
            searchQuery: searchQuery,
          });
        } else {
          this.setState({
            images: images,
            searchQuery: searchQuery,
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleLoadMore = () => {
    const newPage = this.state.page + 1;

    this.fetchImages(this.state.searchQuery, newPage);

    this.setState({
      page: newPage,
    });
  };

  componentDidUpdate() {
    scroll();
  }

  render() {
    const { images, loading, error } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.fetchImages} />

        {error && <Notification message="No results!" />}

        {!!images.length && !error && (
          <>
            <ImageGallery images={images} />
            {!loading && <Button onClick={this.handleLoadMore} />}
          </>
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
