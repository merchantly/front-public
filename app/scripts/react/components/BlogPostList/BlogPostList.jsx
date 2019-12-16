import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import BlogPostListItem from './BlogPostListItem';
import ProductCardSimilarProducts from '../Product/ProductCard/ProductCardSimilarProducts';

class BlogPostList extends Component {
  render() {
    const {
      blogPosts: {
        posts,
        pagination,
      },
      recommendedProducts,
      t
    } = this.props;

    return (
      <section className="posts">
        {posts.map((post, idx) => <BlogPostListItem {...post} key={`blog-post-list-item-${idx}`} />)}

        {(pagination.totalPages > 1) && (<Pagination {...pagination} />)}
        <ProductCardSimilarProducts products={recommendedProducts.products} t={t} showCartButton={recommendedProducts.showCartButton} />
      </section>
    );
  }
}

BlogPostList.propTypes = {
  t: PropTypes.func.isRequired,
  blogPosts: PropTypes.shape({
    pagination: PropTypes.shape({
      totalPages: PropTypes.number.isRequired,
      currentPage: PropTypes.number.isRequired,
      currentHref: PropTypes.string,
    }),
    posts: PropTypes.arrayOf(
      PropTypes.shape(...BlogPostListItem.propTypes)
    ).isRequired,
  }),
  recommendedProducts: PropTypes.object,
};

BlogPostList.defaultProps = {
  recommendedProducts: { showCartButton: false, products: [] },
}

export default BlogPostList;
