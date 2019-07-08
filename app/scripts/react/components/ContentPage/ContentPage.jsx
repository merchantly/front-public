import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSlider from '../common/ImageSlider';

class ContentPage extends Component {
  render() {
    const {
      title,
      text,
      images,
      rtl,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <div className="b-article">
          <div className="b-text">
            <h1>
              {title}
            </h1>
          </div>
        </div>

        <section className="b-item-list">
          <ImageSlider
            className="b-slider_promo"
            hasThumbs={images.length > 1}
            slides={images}
            rtl={rtl}
          />
        </section>

        <article className="b-article">
          <div className="b-text" dangerouslySetInnerHTML={{__html: text}} />
        </article>
      </div>
    );
  }
}

ContentPage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  images: ImageSlider.propTypes.slides,
  rtl: PropTypes.bool.isRequired,
};

ContentPage.defaultProps = {
  rtl: false
}

export default ContentPage;
