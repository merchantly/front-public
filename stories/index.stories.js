import React from 'react';

import { storiesOf } from '@storybook/react';

import 'app/scripts/libs';
import 'app/scripts/resources/gon';
import 'app/scripts/bundle';
import 'react_ujs';

import 'app/stylesheets/local.scss';
import { layoutProps } from 'test/fixtures/vendorLayout/sample.json';


import WelcomePage from 'app/scripts/react/components/Welcome/WelcomePage';
import WelcomeChildrenPage from 'app/scripts/react/components/WelcomeChildren/WelcomeChildrenPage';
storiesOf('Welcome page', module)
  .add('WelcomePage', () => <WelcomePage {...require('test/fixtures/welcome/page-sample.json')}/>)
  .add('WelcomeChildrenPage', () => <WelcomeChildrenPage {...require('test/fixtures/welcomeChildren/page-sample.json')}/> );

import ErrorPage from 'app/scripts/react/components/ErrorPage/ErrorPagePage';
storiesOf('Other pages', module)
  .add('ErrorPage', () => <ErrorPage {...require('test/fixtures/errorPage/page-sample.json')} /> )

import MenuTop from 'app/scripts/react/components/MenuTop';
import MenuBottom from 'app/scripts/react/components/MenuBottom';
import NavBar from 'app/scripts/react/components/NavBar';
storiesOf('Menu', module)
.add('NavBar', () => <NavBar {...require('test/fixtures/navBar/sample')} /> )
  .add('MenuTop (v1)', () => <MenuTop {...require('test/fixtures/menuTop/sample0')} /> )
  .add('MenuTop (v2)', () => <MenuTop {...require('test/fixtures/menuTop/sample2')} /> )
  .add('MenuTop (sticky)', () => <MenuTop {...require('test/fixtures/menuTop/sticky')} /> )
  .add('MenuBottom', () => <MenuBottom {...require('test/fixtures/menuBottom/sample')} /> )

import ClientRegistrationPage from 'app/scripts/react/components/ClientRegistration/ClientRegistrationPage';
import ClientResetPasswordPage from 'app/scripts/react/components/ClientResetPassword/ClientResetPasswordPage';
import ClientSessionNewPage from 'app/scripts/react/components/ClientSessionNew/ClientSessionNewPage';
import CabinetPage from 'app/scripts/react/components/Cabinet/CabinetPage';

storiesOf('Client pages',module)
  .add('ClientRegistrationPage', () => <ClientRegistrationPage {...require('test/fixtures/clientRegistration/page-sample.json')} /> )
  .add('ClientResetPasswordPage', () => <ClientResetPasswordPage {...require('test/fixtures/clientResetPasswordPage/page-sample.json')} /> )
  .add('ClientSessionNewPage', () => <ClientSessionNewPage {...require('test/fixtures/clientSessionNew/page-sample.json')} /> )
  .add('CabinetPage', () => <CabinetPage {...require('test/fixtures/cabinet/page-sample.json')} /> )


import ContentPage from 'app/scripts/react/components/ContentPage/ContentPage'
import ContentPagePage from 'app/scripts/react/components/ContentPage/ContentPage'
import BlogPostPage from 'app/scripts/react/components/BlogPost/BlogPostPage'
import BlogPostListPage from 'app/scripts/react/components/BlogPostList/BlogPostListPage'
import LookbookPage from 'app/scripts/react/components/Lookbook/LookbookPage'

storiesOf('Content pages', module)
  .add('ContentPage', () => <ContentPage {...require('test/fixtures/contentPage/sample.json')} /> )
  .add('ContentPagePage', () => <ContentPagePage {...require('test/fixtures/contentPage/page-sample.json')} /> )
  .add('BlogPostPage', () => <BlogPostPage {...require('test/fixtures/blogPost/page-sample.json')} /> )
  .add('BlogPostListPage', () => <BlogPostListPage {...require('test/fixtures/blogPostList/page-sample.json')} /> )
  .add('LookbookPage', () => <LookbookPage { ...Object.assign({'layoutProps': layoutProps}, require('test/fixtures/lookbook/sample.json'))} /> )

// Product pages
// Order pages
// Catalog pages
//

  //import cartSelectPackage from '../../test/fixtures/cart/select-package';
  //import orderNoCoupon from '../../test/fixtures/order/no-coupon';
  //import productMultiSelect from '../../test/fixtures/products/multi-select';
  //import productMultiChoice from '../../test/fixtures/products/multiple-choice';
  //import productWeight from '../../test/fixtures/products/weight';
  //import productDoesntSell from '../../test/fixtures/products/3917';
  //import productNoGoods from '../../test/fixtures/products/no-goods';

  //import menuTopSample1 from 'test/fixtures/menuTop/sample1';

  //// Много пунктов в ширину и в глубину.
  //// Есть пункты с подпунктами с краев.
  //import productListSample from 'test/fixtures/productList/sample';
  //import productGroupSample from 'test/fixtures/productGroup/sample.json';
  //import childrenProductsSample from 'test/fixtures/childrenProducts/sample.json';
  //import categoriesShowEmpty from 'test/fixtures/categoriesShow/empty-products.json';
  //import dictionaryEntitiesShowSample from 'test/fixtures/dictionaryEntitiesShow/sample.json';
  //import productSearchSample from 'test/fixtures/productSearch/sample.json';
  //import productSearchEmpty from 'test/fixtures/productSearch/empty.json';
  //import orderPaymentProps from 'test/fixtures/orderPayment/sample.json';
  //import {
    //layoutProps,
  //} from 'test/fixtures/vendorLayout/sample.json';
  //import {
    //PAYMENT_SUCCESS,
  //} from 'rc/Payment';

  //import pageWithCouponProps from 'test/fixtures/order/page-with-coupon.json';
  //import orderPageProps from 'test/fixtures/order/page.json';

  //global.ProductCardMultiSelect = () => React.createElement(global.ProductCard, productMultiSelect);
  //global.ProductCardMultiChoice = () => React.createElement(global.ProductCard, productMultiChoice);
  //global.ProductCardDoesntSell = () => React.createElement(global.ProductCard, productDoesntSell);
  //global.ProductCardWeight = () => React.createElement(global.ProductCard, productWeight);
  //global.ProductCardNoGoods = () => React.createElement(global.ProductCard, productNoGoods);
  //global.ProductListSample = () => React.createElement(global.ProductList, productListSample);
  //global.ProductGroupSample = () => React.createElement(global.ProductGroup, productGroupSample);
  //global.ProductSearchSample = () => React.createElement(global.ProductSearch, productSearchSample);
  //global.ProductSearchEmpty = () => React.createElement(global.ProductSearch, productSearchEmpty);
  //global.ProductArchivedPageSample = () => React.createElement(global.ProductArchivedPage, require('test/fixtures/productArchived/page-sample.json'));
  //global.ProductSearchPageSample = () => React.createElement(global.ProductSearchPage, require('test/fixtures/productSearch/page-sample.json'));
  //global.ProductCardPageSample = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/page-sample.json'));
  //global.ProductCardWithDeliveryMessages = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/delivery-messages.json'));
  //global.ProductCardWithNotAvailableLinks = () => React.createElement(global.ProductCardPage, require('test/fixtures/products/not-available-links.json'));
  //global.ChildrenProductsSample = () => React.createElement(global.ChildrenProducts, childrenProductsSample);

  //global.OrderPaymentSample = () => React.createElement(global.OrderPayment, orderPaymentProps);
  //global.OrderContainerNoCoupon = () => React.createElement(global.OrderContainer, orderNoCoupon);
  //global.OrderCancelledPageSample = () => React.createElement(global.OrderCancelledPage, require('test/fixtures/orderCancelled/page-sample.json'));
  //global.OrderCreatedPageSample = () => React.createElement(global.OrderCreatedPage, require('test/fixtures/orderCreated/page-sample.json'));
  //// localhost:9000/react/checkout.html
  //// global.OrderPageSample = () => React.createElement(global.OrderPage, require('test/fixtures/order/page-with-coupon.json'));
  //global.OrderPageSample = () => React.createElement(global.OrderPage, orderPageProps);
  //global.OrderPageSampleWithCoupon = () => React.createElement(global.OrderPage, pageWithCouponProps);
  //global.OrderPaidPageSample = () => React.createElement(global.OrderPaidPage, require('test/fixtures/orderPaid/page-sample.json'));
  //global.OrderShowPageSample = () => React.createElement(global.OrderShowPage, require('test/fixtures/orderShow/page-sample.json'));
  //global.OrderPaymentPageSample = () => React.createElement(global.OrderPaymentPage, require('test/fixtures/orderPayment/page-sample.json'));

  //global.PaymentPageSample = () => React.createElement(global.PaymentPage, { layoutProps, state: PAYMENT_SUCCESS, vendorUrl: '/v' });

  //global.CartContainerSelectPackage = () => React.createElement(global.CartContainer, cartSelectPackage);
  //global.CartPageEmpty = () => React.createElement(global.CartPage, require('test/fixtures/cart/page-empty.json'));
  //global.CartPageWithPackage = () => React.createElement(global.CartPage, require('test/fixtures/cart/page-with-package.json'));
  //global.WishlistPageSample = () => React.createElement(global.WishlistPage, require('test/fixtures/wishlist/page-sample.json'));

  //global.CategoriesShowChildrenPageSample = () => React.createElement(global.CategoriesShowChildrenPage, require('test/fixtures/categoriesShowChildren/page-sample.json'));
  //global.CategoriesShowPageSample = () => React.createElement(global.CategoriesShowPage, require('test/fixtures/categoriesShow/page-sample.json'));
  //global.CategoriesShowEmpty = () => React.createElement(global.CategoriesShow, categoriesShowEmpty);
  //global.CategoriesShowFilterDirty = () => React.createElement(global.CategoriesShow, { ...categoriesShowEmpty, isFilterDirty: true });
  //global.CategoriesShowChildrenEmpty = () => React.createElement(global.CategoriesShowChildren, { childrenProducts: [], vendorRootPath: '/vendor/root/path' });

  //global.DictionaryEntitiesShowEmpty = () => React.createElement(global.DictionaryEntitiesShow, { ...dictionaryEntitiesShowSample, products: { items: [], pagination: {} }});
  //global.DictionaryEntitiesShowPageSample = () => React.createElement(global.DictionaryEntitiesShowPage, require('test/fixtures/dictionaryEntitiesShow/page-sample.json'));
  //global.DictionaryPageSample = () => React.createElement(global.DictionaryPage, { layoutProps, title: 'title' });

