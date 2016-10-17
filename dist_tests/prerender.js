require('../dist/scripts/public.prerender.development');

const logoProps = {
  'linkUrl': 'http://wannabe.vagrant.dev:3000',
  'logoText': 'Wannabe Jewelry Moscow',
  'imageAlt': 'Wannabe Jewelry Moscow',
  'logoUrl': null,
};

function t(component, props) {
  return global.ReactDOMServer.renderToString(global.React.createElement(component, props));
}

t(global.Logo, logoProps);
t(global.ProductBlock, require('../test/fixtures/productBlock/sample.json'));
t(global.ProductCard, require('../test/fixtures/products/22983.json'));
t(global.CartContainer, require('../test/fixtures/cart/with-package.json'));
t(global.CartContainer, require('../test/fixtures/cart/select-package.json'));
t(global.OrderContainer, require('../test/fixtures/order/with-coupon.json'));
t(global.WishlistContainer, require('../test/fixtures/wishlist/synteticData.json'));
t(global.MenuTop, require('../test/fixtures/menuTop/sample1.json'));
t(global.MenuBottom, require('../test/fixtures/menuBottom/sample.json'));
t(global.NavBar, require('../test/fixtures/navBar/sample.json'));
t(global.ProductList, require('../test/fixtures/productList/sample.json'));
t(global.CategoriesShow, require('../test/fixtures/categoriesShow/sample.json'));
t(global.CategoriesShowChildren, require('../test/fixtures/childrenProducts/sample.json'));
t(global.PostProducts, { title: 'a', postProductsText: '<p>b</p>' });
t(global.DictionaryEntitiesShow, require('../test/fixtures/dictionaryEntitiesShow/sample.json'));
t(global.ProductArchived, require('../test/fixtures/productArchived/sample.json'));
t(global.ProductSearch, require('../test/fixtures/productSearch/sample.json'));
t(global.WelcomeChildren, require('../test/fixtures/welcomeChildren/sample.json'));
t(global.Welcome, require('../test/fixtures/welcome/sample.json'));
t(global.OrderCancelled, require('../test/fixtures/orderCancelled/sample.json'));
t(global.OrderCreated, require('../test/fixtures/orderCreated/sample.json'));
t(global.OrderPaid, require('../test/fixtures/orderPaid/sample.json'));
t(global.OrderPayment, require('../test/fixtures/orderPayment/sample.json'));
t(global.OrderShow, require('../test/fixtures/orderShow/sample.json'));
t(global.ClientSessionNew, require('../test/fixtures/clientSessionNew/sample.json'));

t(global.CartPage, require('../test/fixtures/cart/page-with-package.json'));
t(global.CategoriesShowChildrenPage, require('../test/fixtures/categoriesShowChildren/page-sample.json'));
t(global.CategoriesShowPage, require('../test/fixtures/categoriesShow/page-sample.json'));
t(global.DictionaryEntitiesShowPage, require('../test/fixtures/dictionaryEntitiesShow/page-sample.json'));
t(global.ProductArchivedPage, require('../test/fixtures/productArchived/page-sample.json'));
t(global.ProductSearchPage, require('../test/fixtures/productSearch/page-sample.json'));
t(global.WelcomeChildrenPage, require('../test/fixtures/welcomeChildren/page-sample.json'));
t(global.WelcomePage, require('../test/fixtures/welcome/page-sample.json'));
t(global.ClientSessionNewPage, require('../test/fixtures/clientSessionNew/page-sample.json'));
t(global.OrderCancelledPage, require('../test/fixtures/orderCancelled/page-sample.json'));
t(global.OrderCreatedPage, require('../test/fixtures/orderCreated/page-sample.json'));
t(global.OrderPage, require('../test/fixtures/order/page-with-coupon.json'));
t(global.OrderPaidPage, require('../test/fixtures/orderPaid/page-sample.json'));
t(global.OrderShowPage, require('../test/fixtures/orderShow/page-sample.json'));
t(global.ProductCardPage, require('../test/fixtures/products/page-sample.json'));
t(global.WishlistPage, require('../test/fixtures/wishlist/page-sample.json'));
t(global.OrderPaymentPage, require('../test/fixtures/orderPayment/page-sample.json'));
t(global.BlogPostListPage, require('../test/fixtures/blogPostList/page-sample.json'));
t(global.BlogPostPage, require('../test/fixtures/blogPost/page-sample.json'));

console.log('Prerendering public components test finished successfully');
