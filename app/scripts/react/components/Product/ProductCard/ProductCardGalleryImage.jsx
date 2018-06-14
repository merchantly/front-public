import $ from 'jquery';
import React, { Component } from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';
import RelativeImage from '../../common/Image/RelativeImage';

class ProductCardGalleryImage extends Component {
  render() {
    const { images, previewWidth } = this.props;
    const image = images[0];

    if (image) {
      return (
        <div className="ProductCardGallery">
          <a
            className="ProductCardGallery-imageLink"
            data-lightbox={true}
            href={image.url}
          >
            <RelativeImage
              className="ProductCardGallery-image u-photo"
              image={{ url: image.url }}
              title={image.title}
            />
          </a>
        </div>
      );
    }

    return null;
  }
}

ProductCardGalleryImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCardGalleryImage;