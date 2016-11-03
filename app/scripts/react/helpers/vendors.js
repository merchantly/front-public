import React from 'react';

export function productCategoryPath({ categories }) {
  const notRootCategories = categories.filter((el) => el.isRoot === false);
  const category = notRootCategories[0];

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
  if (!category || category.isRoot) return;

  return (
    <a href={category.publicUrl} key={category.id}>
      {category.name}
    </a>
  );
}
