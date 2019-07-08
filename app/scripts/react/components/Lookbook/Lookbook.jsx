import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSlider from 'rc/common/ImageSlider';

class Lookbook extends Component {
  render() {
    const {
      title,
      images,
      rtl,
    } = this.props;

    return (
      <section className="b-item-list">
        <h1 className="b-item-list__title">
          {title}
        </h1>
        <ImageSlider
          className="b-slider_promo"
          hasThumbs={images.length > 1}
          slides={images}
          rtl={rtl}
        />
      </section>
    );
  }
}

Lookbook.propTypes = {
  title: PropTypes.string.isRequired,
  images: ImageSlider.propTypes.slides,
  rtl: PropTypes.bool.isRequired,
};

Lookbook.defaultProps = {
  rtl: false
}

export default Lookbook;
