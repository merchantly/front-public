import $ from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { RelativeImage } from 'rc/common/Image';

class CartListImage extends Component {
  static initFancybox($node, t) {
    return $node
      .find('[data-lightbox]')
      .fancybox({
        parent: 'body',
        padding: 0,
        margin: 0,
        helpers: {
          thumbs: { width: 8, height: 8 },
        },
        tpl: {
          closeBtn: `<a title="${t('vendor.gallery.close')}" class="fancybox-item fancybox-close" href="javascript:;"><i></i></a>`,
          next: `<a title="${t('vendor.gallery.next')}" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>`,
          prev: `<a title="${t('vendor.gallery.prev')}" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>`,
        },
      });
  }
  static fancyboxImages(defaultImage, images) {
    return Array.isArray(images) && images
      .filter(img => img.url !== defaultImage.url)
      .map(img => (
        <a
          className="b-cart__item__img--hidden"
          data-lightbox
          data-fancybox-group={defaultImage.productId}
          href={img.url}
          key={img.uid}
        >
          <img src={img.url} alt="" />
        </a>
      ));
  }
  componentDidMount() {
    CartListImage.initFancybox($(findDOMNode(this)), this.props.t);
  }
  render() {
    const {
      image,
      images,
      size,
    } = this.props;

    return (
      <div>
        <a
          data-lightbox
          data-fancybox-group={image.productId}
          href={image.url}
        >
          <RelativeImage
            className="b-cart__item__img"
            image={image || {}}
            maxHeight={size}
            maxWidth={size}
          />
        </a>
        {CartListImage.fancyboxImages(image, images)}
      </div>
    );
  }
}

CartListImage.propTypes = {
  image: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

CartListImage.defaultProps = {

};

export default CartListImage;
