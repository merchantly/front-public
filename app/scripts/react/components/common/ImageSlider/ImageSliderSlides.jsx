import React, { Component, PropTypes } from 'react';
import * as schemas from '../../../schemas';
import RelativeImage from '../Image/RelativeImage';

class ImageSliderSlides extends Component {
  renderSlide(slide, idx) {
    return (
      <div className="b-slider__item" key={idx}>
        {slide.url
          ? <a href={slide.url} title={slide.title} target={slide.target}>
              <RelativeImage image={slide.image} title={slide.title} />
            </a>
          : <RelativeImage image={slide.image} title={slide.title} />
        }
      </div>
    );
  }
  render() {
    const { items } = this.props;

    return (
      <div className="b-slider-slides">
        {items.map(this.renderSlide)}
      </div>
    );
  }
}

ImageSliderSlides.propTypes = {
  items: PropTypes.arrayOf(schemas.slide),
};

export default ImageSliderSlides;
