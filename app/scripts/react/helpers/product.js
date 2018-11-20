import React from 'react';
import AppLink from 'rc/common/AppLink';
import { dictionaryEntitiesRoute } from 'scripts/routes/app';
import { money, humanizedMoneyWithCurrency } from './money';
import { numberToHumanSize } from './number';
import {
  h1,
  schemaOrgGoodAvailability,
  schemaOrgProductArticle,
  schemaOrgProductCategory,
} from './seo';

export function schemaOrgMarkup(product) {
  return (
    <div style={{display: 'none!important'}}>
      <meta itemProp="name" content={h1(product)} />
      {product.article &&
        <span itemProp="productID" content={schemaOrgProductArticle(product)} />
      }
      {product.goods
        && product.goods.length
        && product.goods.map((el) => schemaOrgGoodPrice(el, product.category))
      }
    </div>
  );
}

export function schemaOrgGoodPrice(good, category) {
  return (
    <div
      itemProp="offers"
      itemScope
      itemType="http://schema.org/Offer"
      key={good.globalId}
    >
      <meta itemProp="name" content={good.title} />
      <meta itemProp="sku" content={good.article} />
      <meta itemProp="category" content={schemaOrgProductCategory(category)} />
      <meta itemProp="availability" content={schemaOrgGoodAvailability(good)} />
      {good.actualPrice &&
        <div itemProp="price">
          <meta itemProp="priceCurrency" content={good.actualPrice.price.currencyIsoCode} />
          <div>{money(good.actualPrice.price)}</div>
        </div>
      }
    </div>
  );
}

export function goodOrderTitle(product, good) {
  let title = good.title;

  if (hasDifferentPrices(product)) {
    title += ` (${humanizedMoneyWithCurrency(good.actualPrice.price)})`;
  }

  if (good.isRunOut) {
    title += ' - нет в наличии';
  }

  return title;
}

export function goodActualPrice({ actualPrice }) {
  if (actualPrice) {
    return humanizedMoneyWithCurrency(actualPrice);
  } else {
    return 'Цена неизвестна';
  }
}

export function attributeValue(attribute) {
  const {
    productsUrl,
    propertyId,
    title,
    type,
    value,
  } = attribute

  switch(type) {
    case 'AttributeLink':
      return (
        <a
          className="link link--external"
          href={value}
          target="_blank"
        >
          {title}
        </a>
      );
    case 'AttributeFile':
      if (!value) return;

      return (
        <a
          className="link link--file"
          href={value.url}
          target="_blank"
        >
          {`${title} ${value.extension} (${numberToHumanSize(value.size)})`}
        </a>
      );
    case 'AttributeDictionary':
      return (
        <span>
          <span className="attribute__title">
            {`${title}: `}
          </span>
          <AppLink
            hash={dictionaryEntitiesRoute(propertyId)}
            href={productsUrl}
          >
            {value}
          </AppLink>
        </span>
      );
    default:
      return `${title}: ${value}`;
  }
}

function hasDifferentPrices(product) {
  const diffCents = product.goods.reduce((prev, good) => {
    if (good.actualPrice) {
      const actualCents = good.actualPrice.price.cents;

      if (prev.indexOf(actualCents) === -1) {
        return prev.concat([actualCents]);
      }
    }

    return prev;
  }, []);

  return diffCents.length > 1;
}
