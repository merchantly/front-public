import React from 'react';
import BlogPost from './BlogPost';
import provideTranslations from 'rc/HoC/provideTranslations';

function BlogPostContainer(props) {
  return <BlogPost {...props} />;
}

export default provideTranslations(BlogPostContainer);
