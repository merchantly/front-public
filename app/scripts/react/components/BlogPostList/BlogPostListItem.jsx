import React, { Component } from 'react'; import PropTypes from 'prop-types';
import provideTranslations from 'rc/HoC/provideTranslations';
import ThumborService from 'r/services/Thumbor';

class BlogPostListItem extends Component {
  render() {
    const {
      hasLink,
      title,
      text,
      publicUrl,
      date,
      headerUrl,
      linkTarget,
      imageUrl,
      t,
    } = this.props

    let imagePart = '';
    let titlePart = '';
    
    if(imageUrl) {
      const image = ThumborService.imageUrl(imageUrl, {width: 450}, ['no_upscale()']);

      if(hasLink) {
        imagePart = ( 
          <a href={headerUrl} title={title} target={linkTarget}>
            <img src={image} alt={title}/>
          </a>
        );
      } else {
        imagePart = (<img src={image} alt={title}/>);
      }
    }

    if(hasLink) {
      titlePart = (
        <a href={headerUrl} title={title} target={linkTarget}>
          <h2 className="post__title">
            {title}
          </h2>
        </a>
      );
    } else {
      titlePart = (
        <h2 className="post__title">
          {title}
        </h2>
      );
    }

    return (
      <article className="post post--short">
        <div className="post__image">
          {imagePart}
        </div>
        <div className="post__content">
          {titlePart}
          <div className="post__text b-text" dangerouslySetInnerHTML={{__html: text}} />
          <div className="post__date">
            {date}
          </div>
          <div className="post__read_more b-text">
            <a href={publicUrl}>{t('vendor.blog.read_more')}</a>
          </div>
        </div>
      </article>
    );
  }
}

BlogPostListItem.propTypes = {
  hasLink: PropTypes.bool.isRequired,
  linkTarget: PropTypes.string,
  imageUrl: PropTypes.string,
  headerUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  publicUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default provideTranslations(BlogPostListItem);

