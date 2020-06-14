import React, { Component } from 'react';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  render() {
    return <Loader type="ThreeDots" color="blue" height={80} width={80} />;
  }
}
