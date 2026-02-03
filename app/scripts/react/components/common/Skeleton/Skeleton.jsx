/**
 * Skeleton Components for SSR Suspense Fallbacks
 *
 * Простые placeholder компоненты для отображения во время загрузки.
 * Используются как fallback в Suspense boundaries.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Базовый skeleton блок с анимацией shimmer.
 */
export function SkeletonBox({ width, height, className, style }) {
  const baseStyle = {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    animation: 'skeleton-shimmer 1.5s infinite',
    width: width || '100%',
    height: height || '1em',
    ...style,
  };

  return <div className={className} style={baseStyle} />;
}

SkeletonBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * Skeleton для текстовых строк.
 */
export function SkeletonText({ lines, lineHeight, gap }) {
  const actualLines = lines || 3;
  const actualLineHeight = lineHeight || '1em';
  const actualGap = gap || '0.5em';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: actualGap }}>
      {Array.from({ length: actualLines }).map((_, i) => (
        <SkeletonBox
          key={i}
          height={actualLineHeight}
          width={i === actualLines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

SkeletonText.propTypes = {
  lines: PropTypes.number,
  lineHeight: PropTypes.string,
  gap: PropTypes.string,
};

/**
 * Skeleton для изображений.
 */
export function SkeletonImage({ width, height, aspectRatio }) {
  const style = {
    width: width || '100%',
    height: height,
    aspectRatio: aspectRatio || (height ? undefined : '16/9'),
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    animation: 'skeleton-shimmer 1.5s infinite',
  };

  return <div style={style} />;
}

SkeletonImage.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspectRatio: PropTypes.string,
};

/**
 * Skeleton для карточки товара.
 */
export function SkeletonProductCard() {
  return (
    <div style={{ padding: '1em' }}>
      <SkeletonImage aspectRatio="1/1" />
      <div style={{ marginTop: '0.75em' }}>
        <SkeletonBox height="1.2em" width="80%" />
      </div>
      <div style={{ marginTop: '0.5em' }}>
        <SkeletonBox height="1em" width="40%" />
      </div>
    </div>
  );
}

/**
 * Skeleton для списка товаров.
 */
export function SkeletonProductList({ count }) {
  const itemCount = count || 4;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1em' }}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

SkeletonProductList.propTypes = {
  count: PropTypes.number,
};

/**
 * Skeleton для меню/навигации.
 */
export function SkeletonNav({ items }) {
  const itemCount = items || 5;

  return (
    <div style={{ display: 'flex', gap: '1em' }}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <SkeletonBox key={i} width="80px" height="2em" />
      ))}
    </div>
  );
}

SkeletonNav.propTypes = {
  items: PropTypes.number,
};

/**
 * Skeleton для корзины.
 */
export function SkeletonCart() {
  return (
    <div style={{ padding: '1em' }}>
      <SkeletonBox height="2em" width="150px" style={{ marginBottom: '1em' }} />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
          <SkeletonImage width="80px" height="80px" />
          <div style={{ flex: 1 }}>
            <SkeletonBox height="1.2em" width="70%" />
            <SkeletonBox height="1em" width="30%" style={{ marginTop: '0.5em' }} />
          </div>
        </div>
      ))}
      <SkeletonBox height="2.5em" width="100%" style={{ marginTop: '1em' }} />
    </div>
  );
}

/**
 * Skeleton для страницы товара.
 */
export function SkeletonProductPage() {
  return (
    <div style={{ display: 'flex', gap: '2em', padding: '1em' }}>
      <div style={{ flex: 1 }}>
        <SkeletonImage aspectRatio="1/1" />
      </div>
      <div style={{ flex: 1 }}>
        <SkeletonBox height="2em" width="80%" />
        <SkeletonBox height="1.5em" width="40%" style={{ marginTop: '1em' }} />
        <SkeletonText lines={4} style={{ marginTop: '1.5em' }} />
        <SkeletonBox height="3em" width="200px" style={{ marginTop: '2em' }} />
      </div>
    </div>
  );
}

/**
 * Skeleton для формы.
 */
export function SkeletonForm({ fields }) {
  const fieldCount = fields || 4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', padding: '1em' }}>
      {Array.from({ length: fieldCount }).map((_, i) => (
        <div key={i}>
          <SkeletonBox height="1em" width="100px" style={{ marginBottom: '0.25em' }} />
          <SkeletonBox height="2.5em" width="100%" />
        </div>
      ))}
      <SkeletonBox height="2.5em" width="150px" style={{ marginTop: '0.5em' }} />
    </div>
  );
}

SkeletonForm.propTypes = {
  fields: PropTypes.number,
};

/**
 * Generic Skeleton wrapper для использования с Suspense.
 */
export function SuspenseFallback({ type, ...props }) {
  switch (type) {
    case 'product':
      return <SkeletonProductCard />;
    case 'products':
      return <SkeletonProductList {...props} />;
    case 'nav':
      return <SkeletonNav {...props} />;
    case 'cart':
      return <SkeletonCart />;
    case 'product-page':
      return <SkeletonProductPage />;
    case 'form':
      return <SkeletonForm {...props} />;
    case 'text':
      return <SkeletonText {...props} />;
    case 'image':
      return <SkeletonImage {...props} />;
    default:
      return <SkeletonBox {...props} />;
  }
}

SuspenseFallback.propTypes = {
  type: PropTypes.oneOf(['product', 'products', 'nav', 'cart', 'product-page', 'form', 'text', 'image', 'box']),
};

export default SuspenseFallback;
