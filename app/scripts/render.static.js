/*global React */
/* eslint "react/no-multi-comp": "off", "react/display-name": "off" */
import './resources/gon';
import './render.libs';
import './render.bundle';

import cartSelectPackage from '../../test/fixtures/cart/select-package';
import orderNoCoupon from '../../test/fixtures/order/no-coupon';
import productMultiSelect from '../../test/fixtures/products/multi-select';
import productMultiChoice from '../../test/fixtures/products/multiple-choice';
import productWeight from '../../test/fixtures/products/weight';
import productDoesntSell from '../../test/fixtures/products/3917';
import productNoGoods from '../../test/fixtures/products/no-goods';

import menuTopSample1 from 'test/fixtures/menuTop/sample1';

// Много пунктов в ширину и в глубину.
// Есть пункты с подпунктами с краев.
import menuTopSample0 from 'test/fixtures/menuTop/sample0';

import menuTopStickySample from 'test/fixtures/menuTop/sticky';
import menuTopSample2 from 'test/fixtures/menuTop/sample2';
import menuBottomSample from 'test/fixtures/menuBottom/sample';
import navBarSample from 'test/fixtures/navBar/sample';
import productListSample from 'test/fixtures/productList/sample';
import productGroupSample from 'test/fixtures/productGroup/sample.json';
import childrenProductsSample from 'test/fixtures/childrenProducts/sample.json';
import categoriesShowEmpty from 'test/fixtures/categoriesShow/empty-products.json';
import dictionaryEntitiesShowSample from 'test/fixtures/dictionaryEntitiesShow/sample.json';
import productSearchSample from 'test/fixtures/productSearch/sample.json';
import productSearchEmpty from 'test/fixtures/productSearch/empty.json';
import welcomeSample from 'test/fixtures/welcome/sample.json';
import ContentPageSample from 'test/fixtures/contentPage/sample.json';
import orderPaymentProps from 'test/fixtures/orderPayment/sample.json';
import {
  layoutProps,
} from 'test/fixtures/vendorLayout/sample.json';
import {
  PAYMENT_SUCCESS,
} from 'rc/Payment';

import pageWithCouponProps from 'test/fixtures/order/page-with-coupon.json';
import orderPageProps from 'test/fixtures/order/page.json';

global.CartContainerSelectPackage = () => React.createElement(global.CartContainer, cartSelectPackage);
global.OrderContainerNoCoupon = () => React.createElement(global.OrderContainer, orderNoCoupon);
global.ProductCardMultiSelect = () => React.createElement(global.ProductCard, productMultiSelect);
global.ProductCardMultiChoice = () => React.createElement(global.ProductCard, productMultiChoice);
global.ProductCardDoesntSell = () => React.createElement(global.ProductCard, productDoesntSell);
global.ProductCardWeight = () => React.createElement(global.ProductCard, productWeight);
global.ProductCardNoGoods = () => React.createElement(global.ProductCard, productNoGoods);
global.MenuTopSample1 = () => React.createElement(global.MenuTop, menuTopSample0);
global.MenuTopSample2 = () => React.createElement(global.MenuTop, menuTopSample2);
global.MenuTopStickySample = () => React.createElement(global.MenuTop, menuTopStickySample);
global.MenuBottomSample = () => React.createElement(global.MenuBottom, menuBottomSample);
global.NavBarSample = () => React.createElement(global.NavBar, navBarSample);
global.ProductListSample = () => React.createElement(global.ProductList, productListSample);
global.ProductGroupSample = () => React.createElement(global.ProductGroup, productGroupSample);
global.ChildrenProductsSample = () => React.createElement(global.ChildrenProducts, childrenProductsSample);
global.CategoriesShowEmpty = () => React.createElement(global.CategoriesShow, categoriesShowEmpty);
global.CategoriesShowFilterDirty = () => React.createElement(global.CategoriesShow, { ...categoriesShowEmpty, isFilterDirty: true });
global.CategoriesShowChildrenEmpty = () => React.createElement(global.CategoriesShowChildren, { childrenProducts: [], vendorRootPath: '/vendor/root/path' });
global.DictionaryEntitiesShowEmpty = () => React.createElement(global.DictionaryEntitiesShow, { ...dictionaryEntitiesShowSample, products: { items: [], pagination: {} }});
global.ProductSearchSample = () => React.createElement(global.ProductSearch, productSearchSample);
global.ProductSearchEmpty = () => React.createElement(global.ProductSearch, productSearchEmpty);
global.WelcomeSample = () => React.createElement(global.Welcome, welcomeSample);
global.ContentPageSample = () => React.createElement(global.ContentPage, ContentPageSample);
global.OrderPaymentSample = () => React.createElement(global.OrderPayment, orderPaymentProps);

global.CartPageEmpty = () => React.createElement(global.CartPage, require('test/fixtures/cart/page-empty.json'));
global.CartPageWithPackage = () => React.createElement(global.CartPage, require('test/fixtures/cart/page-with-package.json'));
global.CategoriesShowChildrenPageSample = () => React.createElement(global.CategoriesShowChildrenPage, require('test/fixtures/categoriesShowChildren/page-sample.json'));
global.CategoriesShowPageSample = () => React.createElement(global.CategoriesShowPage, require('test/fixtures/categoriesShow/page-sample.json'));
global.DictionaryEntitiesShowPageSample = () => React.createElement(global.DictionaryEntitiesShowPage, require('test/fixtures/dictionaryEntitiesShow/page-sample.json'));
global.ProductArchivedPageSample = () => React.createElement(global.ProductArchivedPage, require('test/fixtures/productArchived/page-sample.json'));
global.ProductSearchPageSample = () => React.createElement(global.ProductSearchPage, require('test/fixtures/productSearch/page-sample.json'));
global.WelcomeChildrenPageSample = () => React.createElement(global.WelcomeChildrenPage, require('test/fixtures/welcomeChildren/page-sample.json'));
global.WelcomePageSample = () => React.createElement(global.WelcomePage, require('test/fixtures/welcome/page-sample.json'));
global.ClientSessionNewPageSample = () => React.createElement(global.ClientSessionNewPage, require('test/fixtures/clientSessionNew/page-sample.json'));
global.OrderCancelledPageSample = () => React.createElement(global.OrderCancelledPage, require('test/fixtures/orderCancelled/page-sample.json'));
global.OrderCreatedPageSample = () => React.createElement(global.OrderCreatedPage, require('test/fixtures/orderCreated/page-sample.json'));

// localhost:9000/react/checkout.html
// global.OrderPageSample = () => React.createElement(global.OrderPage, require('test/fixtures/order/page-with-coupon.json'));
global.OrderPageSample = () => React.createElement(global.OrderPage, orderPageProps);
global.OrderPageSampleWithCoupon = () => React.createElement(global.OrderPage, pageWithCouponProps);

global.OrderPaidPageSample = () => React.createElement(global.OrderPaidPage, require('test/fixtures/orderPaid/page-sample.json'));
global.OrderShowPageSample = () => React.createElement(global.OrderShowPage, require('test/fixtures/orderShow/page-sample.json'));
global.ProductCardPageSample = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/page-sample.json'));
global.ProductCardWithDeliveryMessages = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/delivery-messages.json'));
global.ProductCardWithNotAvailableLinks = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/not-available-links.json'));
global.WishlistPageSample = () => React.createElement(global.WishlistPage, require('test/fixtures/wishlist/page-sample.json'));
global.OrderPaymentPageSample = () => React.createElement(global.OrderPaymentPage, require('test/fixtures/orderPayment/page-sample.json'));
global.BlogPostListPageSample = () => React.createElement(global.BlogPostListPage, require('test/fixtures/blogPostList/page-sample.json'));
global.BlogPostPageSample = () => React.createElement(global.BlogPostPage, require('test/fixtures/blogPost/page-sample.json'));
global.CabinetPageSample = () => React.createElement(global.CabinetPage, require('test/fixtures/cabinet/page-sample.json'));
global.DictionaryPageSample = () => React.createElement(global.DictionaryPage, { layoutProps, title: 'title' });
global.LookbookPageSample = () => React.createElement(global.LookbookPage, { layoutProps, ...require('test/fixtures/lookbook/sample.json')});
global.PaymentPageSample = () => React.createElement(global.PaymentPage, { layoutProps, state: PAYMENT_SUCCESS, vendorUrl: '/v' });
global.ContentPagePageSample = () => React.createElement(global.ContentPagePage, require('test/fixtures/contentPage/page-sample.json'));
global.ErrorPagePageSample = () => React.createElement(global.ErrorPagePage, require('test/fixtures/errorPage/page-sample.json'));
global.ClientRegistrationPageSample = () => React.createElement(global.ClientRegistrationPage, require('test/fixtures/clientRegistration/page-sample.json'));
global.ClientResetPasswordPageSample = () => React.createElement(global.ClientResetPasswordPage, require('test/fixtures/clientResetPasswordPage/page-sample.json'));

import './lib/ReactRailsUJS';
