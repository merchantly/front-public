export function h1(source) {
  return source.h1 || source.name || source.title;
}

export function schemaOrgProductArticle({ article }) {
  return article ? `sku:${article}` : '';
}

export function schemaOrgProductCategory(category) {
  if (!category) return;

  return [
    ...[schemaOrgCategoryName(category.parent)],
    ...[schemaOrgCategoryName(category)],
  ].join(' / ');
}

export function schemaOrgCategoryName(category) {
  if (!category || category.isRoot) return;
  return category.name;
}

export function schemaOrgGoodAvailability(good) {
  if (!good.isOrdering && !good.isRunOut) {
    return 'SoldOut';
  } else if (good.isRunOut) {
    return 'OutOfStock';
  } else if (good.isPreorder) {
    return 'PreOrder';
  } else {
    return 'InStock';
  }
}
