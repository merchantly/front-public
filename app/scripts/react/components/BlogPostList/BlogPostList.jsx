import React, { Component, PropTypes } from 'react';
import Pagination from '../Pagination'
import BlogPostListItem from './BlogPostListItem'

class BlogPostList extends Component {
  render() {
    const {
      blogPosts: {
        posts,
        pagination: {
          totalPages,
          currentPage,
        },
      }
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <section className="posts">
          {posts.map((post, idx) => <BlogPostListItem {...post} key={`blog-post-list-item-${idx}`} />)}

          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </section>
      </div>
    );
  }
}

BlogPostList.propTypes = {
  blogPosts: PropTypes.shape({
    pagination: PropTypes.shape({
      totalPages: PropTypes.number.isRequired,
      currentPage: PropTypes.number.isRequired,
    }),
    posts: PropTypes.arrayOf(
      PropTypes.shape(...BlogPostListItem.propTypes)
    ).isRequired,
  })
};

export default BlogPostList;
