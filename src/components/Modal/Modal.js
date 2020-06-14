import React, { Component } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  render() {
    const { src, alt, onClick } = this.props;
    return (
      <div className={styles.Overlay} onClick={onClick}>
        <div className={styles.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
