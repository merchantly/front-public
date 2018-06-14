import React, { Component } from 'react'; import PropTypes from 'prop-types';
import * as schemas from '../../../schemas';
import Image from '../Image/Image';

class ImageSliderThumbs extends Component {
  constructor(props) {
    super(props);

    this.renderThumb = this.renderThumb.bind(this);
  }
  handleClick(idx) {
    if (this.props.onThumbClick) {
      this.props.onThumbClick(idx);
    }
  }
  renderThumb(thumb, idx) {
    const { thumbHeight, thumbWidth } = this.props;

    return (
      <div
        className="b-slider-thumbs__item"
        key={idx}
        onClick={this.handleClick.bind(this, idx)}
      >
        <Image
          image={{ url: thumb.image.url }}
          maxHeight={thumbHeight}
          maxWidth={thumbWidth}
          title={thumb.title}
        />
      </div>
    );
  }
  render() {
    const { items } = this.props;

    return (
      <div className="b-slider-thumbs">
        {items.map(this.renderThumb)}
      </div>
    );
  }
}

ImageSliderThumbs.propTypes = {
  items: PropTypes.arrayOf(schemas.slide),
  onThumbClick: PropTypes.func.isRequired,
  thumbHeight: PropTypes.number.isRequired,
  thumbWidth: PropTypes.number.isRequired,
};

export default ImageSliderThumbs;