import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCardSimilarProducts from '../Product/ProductCard/ProductCardSimilarProducts';

class BlogPost extends Component {
  render() {
    const {
      date,
      title,
      text,
      prev,
      next,
      t,
      recommendedProducts,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <article className="post">
          <div className="post__date">{ date }</div>
          <h1 className="post__title">{ title }</h1>
          <div className="post__content">
            <div className="post__text b-text" dangerouslySetInnerHTML={{__html: text}} />
          </div>
        </article>
        <nav className="postnav">
          <div className="postnav__inner">
            {prev &&
              <a className="postnav__prev" href={prev.url}>
                <span>{t('vendor.blog_post.prev_post')}</span>
                {prev.title}
              </a>
            }
            {next &&
              <a className="postnav__next" href={next.url}>
                <span>{t('vendor.blog_post.next_post')}</span>
                {next.title}
              </a>
            }
          </div>
        </nav>
        <ProductCardSimilarProducts products={recommendedProducts.products} t={t} showCartButton={recommendedProducts.showCartButton} />
      </div>
    );
  }
}

BlogPost.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  prev: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isOptional,
  next: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isOptional,
  t: PropTypes.func.isRequired,
  recommendedProducts: PropTypes.object,
};

export default BlogPost;
