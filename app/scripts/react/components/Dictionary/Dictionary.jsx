import React, { Component, PropTypes } from 'react';

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
