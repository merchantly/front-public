/*global beforeEach */

// Mocks
// import 'babel-polyfill';

import './mocks/gon';
import './mocks/mrch';
import { initStore } from './mocks/redux';

window.gon = {};

//// Libs
import './libsConfigs';
import 'app/scripts/libs';

beforeEach('init redux', () => {
  global.redux = initStore();
});

//// Components
import './react/components/CatalogFilter/CatalogFilter.test';
import './react/components/Userbar/index.test';
import './react/components/Logo/Logo.test';
import './react/components/Notice/Notice.test';
import './react/components/DesignSettings/DesignSettings.test';
import './react/components/Product/ProductCart/ProductCart.test';
import './react/components/Product/ProductCard/ProductCardContainer.test';

import './react/components/Product/ProductCard/ProductCard.test';
import './react/components/Product/ProductCard/ProductCardPage.test';

import './react/components/Product/ProductCard/ProductCardDetails.test';
import './react/components/Product/ProductCard/ProductCardGallerySlider.test';
import './react/components/Product/ProductProperties/index.test';
import './react/components/Product/ProductProperties/utils.test';

import './react/components/Cart/CartCoupon.test';
import './react/components/Cart/index.test';
import './react/components/Cart/CartPage.test';

import './react/components/Order/index.test';
import './react/components/Order/OrderCoupon.test';
import './react/components/Order/OrderPage.test';

import './react/components/Wishlist/index.test';
import './react/components/Wishlist/WishlistPage.test';

import './react/components/Clientbar/index.test';
import './react/components/Product/ProductBlock/index.test';
import './react/components/TopBanner/index.test';
import './react/components/InstagramContainer/index.test';
import './react/components/ScrollToTop/index.test';
import './react/components/ImageSlider/index.test';
import './react/components/CurrencySwitcher/index.test';
import './react/components/LocaleSwitcher/index.test';
import './react/components/MenuTop/index.test';
import './react/components/MenuBottom/index.test';
import './react/components/NavBar/index.test';
import './react/components/ProductList/index.test';
import './react/components/ProductGroup/index.test';
import './react/components/ChildrenProducts/index.test';
import './react/components/Pagination/index.test';

import './react/components/CategoriesShow/index.test';
import './react/components/CategoriesShow/CategoriesShowPage.test';

import './react/components/CategoriesShowChildren/index.test';
import './react/components/CategoriesShowChildren/CategoriesShowChildrenPage.test';

import './react/components/common/PostProducts.test';

import './react/components/DictionaryEntitiesShow/index.test';
import './react/components/DictionaryEntitiesShow/DictionaryEntitiesShowPage';

import './react/components/ProductArchived/index.test';
import './react/components/ProductArchived/ProductArchivedPage.test';

import './react/components/ProductSearch/index.test';
import './react/components/ProductSearch/ProductSearchPage.test';

import './react/components/WelcomeChildren/index.test';
import './react/components/WelcomeChildren/WelcomeChildrenPage.test';

import './react/components/Welcome/index.test';
import './react/components/Welcome/WelcomePage.test';

import './react/components/OrderCancelled/index.test';
import './react/components/OrderCancelled/OrderCancelledPage.test';

import './react/components/OrderCreated/index.test';
import './react/components/OrderCreated/OrderCreatedPage.test';

import './react/components/OrderPaid/index.test';
import './react/components/OrderPaid/OrderPage.test';

import './react/components/OrderPayment/index.test';
import './react/components/OrderPayment/OrderPaymentPage.test';

import './react/components/OrderShow/index.test';
import './react/components/OrderShow/OrderShowPage.test';

import './react/components/ClientSessionNew/index.test';
import './react/components/ClientSessionNew/ClientSessionNewPage.test';

import './react/components/VendorPaymentLayout/index.test';

import './react/components/BlogPostList/BlogPostList.test';
import './react/components/BlogPostList/BlogPostListPage.test';

import './react/components/BlogPost/index.test';
import './react/components/BlogPost/BlogPostPage.test';

import './react/components/Cabinet/index.test';
import './react/components/Cabinet/CabinetPage.test';

import './react/components/Dictionary/index.test';
import './react/components/Dictionary/DictionaryPage.title';

import './react/components/Lookbook/index.test';
import './react/components/Lookbook/LookbookPage.test';

import './react/components/Payment/index.test';
import './react/components/Payment/PaymentPage.test';
