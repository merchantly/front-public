import React from 'react';
import AppLink from 'rc/common/AppLink';
import { categoryRoute } from 'scripts/routes/app';

export function productCategoryPath({ category }) {
  if (!category) return;

  let path = [];

  if (category.parent && !category.parent.isRoot) {
    path.push(categoryLink(category.parent));
    path.push(<span key="delimeter"> / </span>);
  }

  path.push(categoryLink(category));

  return path;
}

export function categoryLink(category) {
  if (!category || category.isRoot) {
    return;
  }

  const {
    id,
    name,
    publicUrl,
  } = category;

  return (
    <AppLink
      hash={categoryRoute(id)}
      href={publicUrl}
      key={id}
    >
      {name}
    </AppLink>
  );
}
