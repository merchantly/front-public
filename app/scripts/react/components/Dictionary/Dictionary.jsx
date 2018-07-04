import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dictionary extends Component {
  render() {
    const {
      title,
    } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <p> Need implementation </p>
      </div>
    );
  }
}

Dictionary.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Dictionary;
