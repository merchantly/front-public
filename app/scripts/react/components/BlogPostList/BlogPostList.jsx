import React, { Component, PropTypes } from 'react';
import Pagination from '../Pagination';
import BlogPostListItem from './BlogPostListItem';

class BlogPostList extends Component {
  render() {
    const {
      blogPosts: {
        posts,
        pagination,
      },
    } = this.props;

    return (
      <section className="posts">
        {posts.map((post, idx) => <BlogPostListItem {...post} key={`blog-post-list-item-${idx}`} />)}

        {(pagination.totalPages > 1) && (<Pagination {...pagination} />)}
      </section>
    );
  }
}

BlogPostList.propTypes = {
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
};

export default BlogPostList;
