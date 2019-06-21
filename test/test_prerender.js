import assert from 'assert';
import layoutProps from './fixtures/vendorLayout/sample.json';
import logoProps from './fixtures/logo_props.js';
import ReactDOMServer from 'react-dom/server';

global.gon = {
  public_api_url: 'localhost'
}

require('../dist/store_app_prerender.development.js');

function t(componentName, props) {
  const component = global[componentName];

  it("test component " + componentName, () => {
    // const result = render(component, props);
    const result = ReactDOMServer.renderToStaticMarkup(React.createElement(component, props));
    assert(result.length > 0);
  });
}

t('Logo', logoProps);
t('ProductBlock', require('../test/fixtures/productBlock/sample.json'));
t('ProductCard', require('../test/fixtures/products/22983.json'));
t('CartContainer', require('../test/fixtures/cart/with-package.json'));
t('CartContainer', require('../test/fixtures/cart/select-package.json'));
t('OrderContainer', require('../test/fixtures/order/with-coupon.json'));
t('WishlistContainer', require('../test/fixtures/wishlist/synteticData.json'));
t('MenuTop', require('../test/fixtures/menuTop/sample1.json'));
t('MenuBottom', require('../test/fixtures/menuBottom/sample.json'));
t('NavBar', require('../test/fixtures/navBar/sample.json'));
t('ProductList', require('../test/fixtures/productList/sample.json'));
t('CategoriesShow', require('../test/fixtures/categoriesShow/sample.json'));
t('CategoriesShowChildren', require('../test/fixtures/childrenProducts/sample.json'));
t('PostProducts', { title: 'a', postProductsText: '<p>b</p>' });
t('DictionaryEntitiesShow', require('../test/fixtures/dictionaryEntitiesShow/sample.json'));
t('ProductArchived', require('../test/fixtures/productArchived/sample.json'));
t('ProductSearch', require('../test/fixtures/productSearch/sample.json'));
t('WelcomeChildren', require('../test/fixtures/welcomeChildren/sample.json'));
t('Welcome', require('../test/fixtures/welcome/sample.json'));
t('OrderCancelled', require('../test/fixtures/orderCancelled/sample.json'));
t('OrderCreated', require('../test/fixtures/orderCreated/sample.json'));
t('OrderPaid', require('../test/fixtures/orderPaid/sample.json'));
t('OrderPayment', require('../test/fixtures/orderPayment/sample.json'));
t('OrderShow', require('../test/fixtures/orderShow/sample.json'));
t('ClientSessionNew', require('../test/fixtures/clientSessionNew/sample.json'));

t('CartPage', require('../test/fixtures/cart/page-with-package.json'));
t('CategoriesShowChildrenPage', require('../test/fixtures/categoriesShowChildren/page-sample.json'));
t('CategoriesShowPage', require('../test/fixtures/categoriesShow/page-sample.json'));
t('DictionaryEntitiesShowPage', require('../test/fixtures/dictionaryEntitiesShow/page-sample.json'));
t('ProductArchivedPage', require('../test/fixtures/productArchived/page-sample.json'));
t('ProductSearchPage', require('../test/fixtures/productSearch/page-sample.json'));
t('WelcomeChildrenPage', require('../test/fixtures/welcomeChildren/page-sample.json'));
t('WelcomePage', require('../test/fixtures/welcome/page-sample.json'));
t('ClientSessionNewPage', require('../test/fixtures/clientSessionNew/page-sample.json'));
t('OrderCancelledPage', require('../test/fixtures/orderCancelled/page-sample.json'));
t('OrderCreatedPage', require('../test/fixtures/orderCreated/page-sample.json'));
t('OrderPage', require('../test/fixtures/order/page-with-coupon.json'));
t('OrderPaidPage', require('../test/fixtures/orderPaid/page-sample.json'));
t('OrderShowPage', require('../test/fixtures/orderShow/page-sample.json'));
t('ProductCardPage', require('../test/fixtures/products/page-sample.json'));
t('WishlistPage', require('../test/fixtures/wishlist/page-sample.json'));
t('OrderPaymentPage', require('../test/fixtures/orderPayment/page-sample.json'));
t('BlogPostListPage', require('../test/fixtures/blogPostList/page-sample.json'));
t('BlogPostPage', require('../test/fixtures/blogPost/page-sample.json'));
t('CabinetPage', require('../test/fixtures/cabinet/page-sample.json'));
t('DictionaryPage', { ...layoutProps, title: 'title' });
t('LookbookPage', Object.assign({}, layoutProps, require('../test/fixtures/lookbook/sample.json')));
t('PaymentPage', { ...layoutProps, state: 'success', vendorUrl: '/v' });
t('ErrorPagePage', require('../test/fixtures/errorPage/page-sample.json'));
t('ContentPagePage', require('../test/fixtures/contentPage/page-sample.json'));
