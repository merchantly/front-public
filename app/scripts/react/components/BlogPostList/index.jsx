import React from 'react';
import { camelizeKeys } from 'humps';
import BlogPostList from './BlogPostList';
import provideTranslations from 'rc/HoC/provideTranslations';

function BlogPostListContainer(props) {
  return <BlogPostList {...camelizeKeys(props)} t={props.t} />;
}

export default provideTranslations(BlogPostListContainer);
