import React, { Component, PropTypes } from 'react';
import ImageSlider from '../common/ImageSlider';

class ContentPage extends Component {
  render() {
    const {
      title,
      text,
      images,
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
  images: ImageSlider.propTypes.slides
};

export default ContentPage;
