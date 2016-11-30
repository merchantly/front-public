import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { PHOTO_CHANGE } from '../../../constants/globalEventKeys';
import RelativeImage from '../../common/Image/RelativeImage';

class ProductCardGallerySlider extends Component {
  constructor(props) {
    super(props);

    this.initSlider = this.initSlider.bind(this);
    this.initFancybox = this.initFancybox.bind(this);
    this.reinitSlider = this.reinitSlider.bind(this);
    this.destroySlider = this.destroySlider.bind(this);
    this.destroyFancybox = this.destroyFancybox.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.onAfterPhotoAction = this.onAfterPhotoAction.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);

    this.state = {
      selectedIndex: 0,
    };
  }
  componentDidMount() {
    //FIXME: Если делать без setTimeout, то autoHeight для первого слайда возвращает высоту 0
    setTimeout(() => {
      this.initSlider();
      this.initFancybox();
    }, 0);

    $(document).on(PHOTO_CHANGE, this.onPhotoChange);
    $(document).on('updateProductImages', this.reinitSlider);
  }
  componentDidUpdate(prevProps, prevState) {
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));
    const $productThumbs = $(findDOMNode(this.refs.productThumbs));

    if (prevState.selectedIndex !== this.state.selectedIndex) {
      $productThumbs.trigger('owl.goTo', this.state.selectedIndex);
      $productPhoto.trigger('owl.goTo', this.state.selectedIndex);
    }
  }
  componentWillUnmount() {
    this.destroySlider();
    this.destroyFancybox();

    $(document).off(PHOTO_CHANGE, this.onPhotoChange);
    $(document).off('updateProductImages', this.reinitSlider);
  }
  initSlider() {
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));
    const $productThumbs = $(findDOMNode(this.refs.productThumbs));

    $productPhoto.owlCarousel({
      afterAction: this.onAfterPhotoAction,
      autoHeight: true,
      singleItem: true,
      navigation: true,
    });

    if ($productThumbs.length) {
      $productThumbs.owlCarousel({
        items: 4,
        pagination: false,
        itemsMobile: 2,
        navigation: true,
      });
    }
  }
  reinitSlider() {
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));
    const $productThumbs = $(findDOMNode(this.refs.productThumbs));

    if ($productPhoto.data('owlCarousel')) {
      $productPhoto.data('owlCarousel').reinit({
        singleItem: true,
        afterAction: this.onAfterPhotoAction,
      });
    }

    if ($productThumbs.length && $productThumbs.data('owlCarousel')) {
      $productThumbs.data('owlCarousel').reinit({
        items: 4,
        pagination: false,
      });
    }
  }
  destroySlider() {
    $(findDOMNode(this.refs.productPhoto)).data('owlCarousel').destroy();
    $(findDOMNode(this.refs.productThumbs)).data('owlCarousel').destroy();
  }
  initFancybox() {
    const { t = () => {} } = this.props;
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));

    $productPhoto
      .find('[lightbox], [data-lightbox]')
      .fancybox({
        parent: 'body',
        padding: 0,
        margin: 0,
        helpers: {
          thumbs: { width: 8, height: 8 }
        },
        tpl: {
          closeBtn: `<a title="${t('vendor.gallery.close')}" class="fancybox-item fancybox-close" href="javascript:;"><i></i></a>`,
          next: `<a title="${t('vendor.gallery.next')}" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>`,
          prev: `<a title="${t('vendor.gallery.prev')}" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>`,
        },
      });
  }
  destroyFancybox() {
    $(document).unbind('click.fb-start');
  }
  getIndexByUID(images, uid) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      if (image.uid === uid) return i;
    };

    return -1;
  }
  onAfterPhotoAction(el) {
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));
    const carouselData = $productPhoto.data('owlCarousel');

    if (carouselData) {
      this.setState({
        selectedIndex: carouselData.currentItem,
      });
    }
  }
  onPhotoChange(ev, image) {
    if (image && image.uid) {
      const selectedIndex = this.getIndexByUID(this.props.images, image.uid);

      if (selectedIndex > -1) {
        this.setState({ selectedIndex });
      }
    }
  }
  onThumbClick(idx, ev) {
    const $productPhoto = $(findDOMNode(this.refs.productPhoto));

    ev.preventDefault();
    $productPhoto.trigger('owl.goTo', idx);
  }
  renderPhoto(elt, idx) {
    return (
      <a
        className="b-slider__item"
        data-lightbox
        href={elt.url}
        key={idx}
        rel="photo-stack"
      >
        <RelativeImage
          className="u-photo"
          image={{ url: elt.url }}
          title={elt.title}
        />
      </a>
    );
  }
  renderThumb(elt, idx) {
    const { thumbHeight, thumbWidth } = this.props;

    return (
      <div
        className="b-slider__item"
        key={idx}
        onClick={this.onThumbClick.bind(this, idx)}
      >
        <RelativeImage
          className="u-photo"
          image={{ url: elt.url }}
          maxHeight={thumbHeight}
          maxWidth={thumbWidth}
          title={elt.title}
        />
      </div>
    );
  }
  render() {
    const { images } = this.props;

    return (
      <div>
        <div
          className="b-slider b-slider_productCard"
          ref="productPhoto"
        >
          {images && images.map(this.renderPhoto)}
        </div>
        {images && images.length > 1 &&
          <div
            className="b-slider b-slider_thumbs"
            ref="productThumbs"
          >
            {images.map(this.renderThumb)}
          </div>
        }
      </div>
    );
  }
}

ProductCardGallerySlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
ProductCardGallerySlider.defaultProps = {
  images: [],
};

export default ProductCardGallerySlider;
