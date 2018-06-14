import React, { Component } from 'react'; import PropTypes from 'prop-types';
import * as schemas from '../../../schemas';
import ThumborService from '../../../services/Thumbor';

const curry = (...args) => (
  (fn) => (fn.apply(null, args))
);
const getSize = (image, maxHeight, maxWidth) => {
  const { height, width } = image;

  if (height && width) {
    if (maxHeight || maxWidth) {
      const maximumHeight = maxHeight || maxWidth;
      const maximumWidth = maxWidth || maxHeight;
      let h, r, w;

      if (width > maximumWidth) {
        r = maximumWidth / width;
        h = height * r;
        w = maximumWidth;
      } else if (height > maximumHeight) {
        r = maximumHeight / height;
        h = maximumHeight;
        w = width * r;
      } else {
        h = height;
        w = width;
      }

      return {
        height: parseInt(h, 10),
        width: parseInt(w, 10),
      };
    }

    return { height, width };
  }

  return {
    height: maxHeight,
    width: maxWidth,
  };
};
const getUrl = (image, maxHeight, maxWidth) => (
  ThumborService.imageUrl(image.url, getSize(image, maxHeight, maxWidth))
);
const getRetinaUrl = (image, maxHeight, maxWidth) => (
  ThumborService.retinaImageUrl(image.url, getSize(image, maxHeight, maxWidth))
);

class Image extends Component {
  render() {
    const {
      className,
      hasFixedSize,
      hasRawUrl,
      image,
      maxHeight,
      maxWidth,
      title,
    } = this.props;
    const imageArguments = curry(image, maxHeight, maxWidth);

    return (
      <img
        alt={title}
        className={className}
        src={hasRawUrl ? image.url : imageArguments(getUrl)}
        srcSet={hasRawUrl ? void 0 : imageArguments(getRetinaUrl)}
        style={hasFixedSize ? imageArguments(getSize) : void 0}
        title={title}
      />
    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
  hasFixedSize: PropTypes.bool,
  hasRawUrl: PropTypes.bool,
  image: schemas.image,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  title: PropTypes.string,
};
Image.defaultProps = {
  hasFixedSize: false,
  hasRawUrl: false,
  maxHeight: null,
  maxWidth: null,
  title: '',
};

export default Image;