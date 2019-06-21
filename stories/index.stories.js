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
  .add('MenuTop (v0)', () => <MenuTop {...require('test/fixtures/menuTop/sample0')} /> )
  .add('MenuTop (v1)', () => <MenuTop {...require('test/fixtures/menuTop/sample1')} /> )
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


import Cart from 'app/scripts/react/components/Cart'
import CartPage from 'app/scripts/react/components/Cart/CartPage'
import WithlistPage from 'app/scripts/react/components/Wishlist/WishlistPage'
storiesOf('Cart and wishlist', module)
  .add('Cart', () => <Cart {...require('test/fixtures/cart/select-package')} /> )
  .add('CartPage (empty)', () => <CartPage {...require('test/fixtures/cart/page-empty.json')} /> )
  .add('CartPage (full)', () => <CartPage {...require('test/fixtures/cart/page-with-package.json')} /> )
  .add('WithlistPage', () => <WithlistPage {...require('test/fixtures/wishlist/page-sample.json')} /> )


import DictionaryEntitiesShowPage from 'app/scripts/react/components/DictionaryEntitiesShow/DictionaryEntitiesShowPage'
import DictionaryPage from 'app/scripts/react/components/Dictionary/DictionaryPage'
import DictionaryEntitiesShow from 'app/scripts/react/components/DictionaryEntitiesShow'
storiesOf('Dictionary', module)
  .add('DictionaryEntitiesShow (empty)', () => <DictionaryEntitiesShow {...Object.assign(require('test/fixtures/dictionaryEntitiesShow/sample.json'),  { products: { items: [], pagination: {} }})} /> )
  .add('DictionaryEntitiesShowPage', () => <DictionaryEntitiesShowPage {...require('test/fixtures/dictionaryEntitiesShow/page-sample.json')} /> )
  .add('DictionaryPage', () => <DictionaryPage { ...Object.assign({'layoutProps': layoutProps}, { title: 'title' }) } /> )


import CategoriesShowPage from 'app/scripts/react/components/CategoriesShow/CategoriesShowPage'
import CategoriesShow from'app/scripts/react/components/CategoriesShow'
import CategoriesShowChildrenPage from 'app/scripts/react/components/CategoriesShowChildren/CategoriesShowChildrenPage'
import CategoriesShowChildren  from 'app/scripts/react/components/CategoriesShowChildren'
storiesOf('Category', module)
  .add('CategoriesShowPage', () => <CategoriesShowPage {...require('test/fixtures/categoriesShow/page-sample.json')} />)
  .add('CategoriesShow (empty)', () => <CategoriesShow {...require('test/fixtures/categoriesShow/empty-products.json')} />)
  .add('CategoriesShow (filter dirty)', () => <CategoriesShow {...Object.assign(require('test/fixtures/categoriesShow/empty-products.json'), { isFilterDirty: true })} />)
  .add('CategoriesShowChildrenPage', () => <CategoriesShowChildrenPage {...require('test/fixtures/categoriesShowChildren/page-sample.json')} />)
  .add('CategoriesShowChildren (empty)', () => <CategoriesShowChildren {...{ childrenProducts: [], vendorRootPath: '/vendor/root/path' }} />)


import ProductCard from 'app/scripts/react/components/Product/ProductCard/ProductCard'
import ProductList from 'app/scripts/react/components/ProductList'
import ProductGroup from 'app/scripts/react/components/ProductGroup'
import ProductSearch from 'app/scripts/react/components/ProductSearch'
import ProductArchivedPage from 'app/scripts/react/components/ProductArchived/ProductArchivedPage'
import ProductSearchPage from 'app/scripts/react/components/ProductSearch/ProductSearchPage'
import ProductCardPage from 'app/scripts/react/components/Product/ProductCard/ProductCardPage'
import ChildrenProducts from 'app/scripts/react/components/ChildrenProducts'
storiesOf('Product', module)
  .add('ProductCardMultiSelect', () => <ProductCard {...require('test/fixtures/products/multi-select.json')} />)
  .add('ProductCardMultiChoice', () => <ProductCard {...require('test/fixtures/products/multiple-choice.json')} />)
  .add('ProductCardDoesntSell', () => <ProductCard {...require('test/fixtures/products/3917.json')} />)
  .add('ProductCardWeight', () => <ProductCard {...require('test/fixtures/products/weight.json')} />)
  .add('ProductCardNoGoods', () => <ProductCard {...require('test/fixtures/products/no-goods.json')} />)
  .add('ProductList', () => <ProductList {...require('test/fixtures/productList/sample.json')} />)
  .add('ProductGroup', () => <ProductGroup {...require('test/fixtures/productGroup/sample.json')} />)
  .add('ProductSearch', () => <ProductSearch {...require('test/fixtures/productSearch/sample.json')} />)
  .add('ProductSearch (empty)', () => <ProductSearch {...require('test/fixtures/productSearch/empty.json')} />)
  .add('ProductArchivedPage', () => <ProductArchivedPage {...require('test/fixtures/productArchived/page-sample.json')} />)
  .add('ProductSearchPage', () => <ProductSearchPage {...require('test/fixtures/productSearch/page-sample.json')} />)
  .add('ProductCardPage', () => <ProductCardPage {...require('test/fixtures/products/page-sample.json')} />)
  .add('ProductCardWithDeliveryMessages', () => <ProductCardPage {...require('test/fixtures/products/delivery-messages.json')} />)
  .add('ProductCardWithNotAvailableLinks', () => <ProductCardPage {...require('test/fixtures/products/not-available-links.json')} />)
  .add('ChildrenProductsSample', () => <ChildrenProducts {...require('test/fixtures/childrenProducts/sample.json')} />)

import OrderPayment from 'app/scripts/react/components/OrderPayment'
import OrderContainer from 'app/scripts/react/components/Order'
import OrderCancelledPage from 'app/scripts/react/components/OrderCancelled/OrderCancelledPage'
import OrderCreatedPage from 'app/scripts/react/components/OrderCreated/OrderCreatedPage'
import OrderPage from 'app/scripts/react/components/Order/OrderPage'
import OrderPaidPage from 'app/scripts/react/components/OrderPaid/OrderPaidPage'
import OrderShowPage from 'app/scripts/react/components/OrderShow/OrderShowPage'
import OrderPaymentPage from 'app/scripts/react/components/OrderPayment/OrderPaymentPage'
import PaymentPage from 'app/scripts/react/components/Payment/PaymentPage'
storiesOf('Order', module)
  .add('OrderPayment', () => <OrderPayment {...require('test/fixtures/orderPayment/sample.json')} />)
  .add('Order (no coupon)', () => <OrderContainer {...require('test/fixtures/order/no-coupon.json')} />)
  .add('OrderCancelledPage', () => <OrderCancelledPage {...require('test/fixtures/orderCancelled/page-sample.json')} />)
  .add('OrderPage (with coupon)', () => <OrderPage {...require('test/fixtures/order/page-with-coupon.json')} />)
  .add('OrderPage', () => <OrderPage {...require('test/fixtures/order/page.json')} />)
  .add('OrderPaidPage', () => <OrderPaidPage {...require('test/fixtures/orderPaid/page-sample.json')} />)
  .add('OrderShowPage', () => <OrderShowPage {...require('test/fixtures/orderShow/page-sample.json')} />)
  .add('OrderPaymentPage', () => <OrderPaymentPage {...require('test/fixtures/orderPayment/page-sample.json')} />)
  .add('PaymentPageSample', () => <PaymentPage {...Object.assign({'layoutProps': layoutProps}, { state: 'success', vendorUrl: '/v' })} />)