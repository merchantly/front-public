import React, { Component, PropTypes } from 'react';

class BlogPost extends Component {
  render() {
    const {
      date,
      title,
      text,
      prev,
      next,
      t,
    } = this.props;

    return (
      <div className="b-page__content__inner b-page__content__inner_content">
        <article className="post">
          <div className="post__date">{ date }</div>
          <h1 className="post__title">{ title }</h1>
          <div className="post__content">
            <div className="post__text b-text">
              { text }
            </div>
          </div>
        </article>
        <nav className="postnav">
          <div className="postnav__inner">
            <a className="postnav__prev" href={prev.url}>
              <span>{t('operator.blog_post.prev_post')}</span>
              {prev.title}
            </a>
            <a className="postnav__next" href={next.url}>
              <span>{t('operator.blog_post.next_post')}</span>
              {next.title}
            </a>
          </div>
        </nav>
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
};

export default BlogPost;
