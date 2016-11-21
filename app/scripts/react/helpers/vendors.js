import React from 'react';
import AppLink from 'rc/common/AppLink';
import { categoryRoute } from 'scripts/routes/app';

export function productCategoryPath({ categories }) {
  const notRootCategories = categories.filter((el) => el.is_root === false);
  const category = notRootCategories[0];

  if (!category) return;

  let path = [];

  if (category.parent && !category.parent.is_root) {
    path.push(categoryLink(category.parent));
    path.push(<span key="delimeter"> / </span>);
  }

  path.push(categoryLink(category));

  return path;
}

export function categoryLink(category) {
  if (!category || category.is_root) {
    return;
  }

  const {
    id,
    name,
    public_url,
  } = category;

  return (
    <AppLink
      hash={categoryRoute(id)}
      href={public_url}
      key={id}
    >
      {name}
    </AppLink>
  );
}
