/**
 * SSRSuspense - Suspense wrapper for SSR-safe rendering
 *
 * Обёртка над React.Suspense с поддержкой SSR.
 * На сервере рендерит fallback, на клиенте использует Suspense.
 */

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { SuspenseFallback } from '../Skeleton';

/**
 * Проверяет, выполняется ли код на сервере.
 */
function isServer() {
  return typeof window === 'undefined';
}

/**
 * SSR-safe Suspense wrapper.
 *
 * @example
 * <SSRSuspense fallbackType="products" count={4}>
 *   <ProductList products={products} />
 * </SSRSuspense>
 *
 * @example
 * <SSRSuspense fallback={<CustomLoader />}>
 *   <HeavyComponent />
 * </SSRSuspense>
 */
export function SSRSuspense({
  children,
  fallback,
  fallbackType,
  ...fallbackProps
}) {
  // Определяем fallback
  const fallbackElement = fallback || (
    <SuspenseFallback type={fallbackType} {...fallbackProps} />
  );

  // На сервере Suspense работает с renderToReadableStream
  // Но если компонент не использует lazy loading, просто рендерим children
  return (
    <Suspense fallback={fallbackElement}>
      {children}
    </Suspense>
  );
}

SSRSuspense.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  fallbackType: PropTypes.oneOf([
    'product',
    'products',
    'nav',
    'cart',
    'product-page',
    'form',
    'text',
    'image',
    'box',
  ]),
};

SSRSuspense.defaultProps = {
  fallbackType: 'box',
};

/**
 * Higher-Order Component для добавления Suspense boundary.
 *
 * @example
 * const ProductListWithSuspense = withSSRSuspense(ProductList, {
 *   fallbackType: 'products',
 *   count: 4,
 * });
 */
export function withSSRSuspense(WrappedComponent, suspenseOptions = {}) {
  function WithSSRSuspenseWrapper(props) {
    return (
      <SSRSuspense {...suspenseOptions}>
        <WrappedComponent {...props} />
      </SSRSuspense>
    );
  }

  WithSSRSuspenseWrapper.displayName = `withSSRSuspense(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithSSRSuspenseWrapper;
}

export default SSRSuspense;
